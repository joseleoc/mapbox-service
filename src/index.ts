import mapboxgl from "mapbox-gl";
import { MarkerFeatureCollection, MarkerIconDictionary, PolygonFeature, RenderMapOptions, RenderPolygonsOptions, mapMarkersOptions } from "./types/types";
import { DefaultSources } from "./types/enums";
import { extractMarkerIcons, markerPropsToFeatures, polygonPropToFeature } from "./utils";

const defaultMapStyle = "mapbox://styles/mapbox/streets-v11";
const defaultZoom = 15;

export function setToken(token: string) {
  mapboxgl.accessToken = token;
}

/**
 * Renders a map using Mapbox GL.
 * 
 * @param  containerId - The ID of the HTML container element where the map will be rendered.
 * @param  options - Optional configuration options for rendering the map.
 * @returns The rendered map instance.
 */
export function renderMap(containerId: string, options?: RenderMapOptions): mapboxgl.Map {
  try {
    const map = new mapboxgl.Map({
      container: containerId,
      style: options?.mapStyle || defaultMapStyle,
      zoom: options?.zoom || defaultZoom,
      center: [options?.center?.lng || 0, options?.center?.lat || 0],
    });
    map.once('load', () => map.resize())
    return map;
  } catch (error: any) {
    throw new Error(error.message)
  }
}

/**
 * Loads and adds images to a Mapbox map.
 * @param map - The map object to which the images will be added.
 * @param images - An object containing image names as keys and their paths as values. The `dynamicColor` property is optional and indicates whether the image has dynamic colors.
 * To use the dynamicColor the image must be an `jpg` or `png` file, otherwise this function could fail.
 * @returns A promise that resolves to `true` when all the images have been loaded and added to the map.
 */
export function loadImagesToMap(map: mapboxgl.Map, images: MarkerIconDictionary): Promise<boolean> {
  return new Promise((resolve: (value: boolean) => void) => {
    let imagesLoaded = 0;
    function resolvePromise() {
      imagesLoaded++;
      if (imagesLoaded === Object.keys(images).length) {
        resolve(true);
      }
    }

    for (const [key, value] of Object.entries(images)) {
      if (!map.hasImage(key)) {
        map.loadImage(value.path, (error, image) => {
          if (error) console.error(error);
          map.addImage(key, image!, { sdf: !!value.dynamicColor });
          resolvePromise();
        });
      } else {
        resolvePromise();
      }
    }
  });
}

/**
   * Renders polygons to a given map.
   * @param map The map ref to render the polygon
   * @param polygonsProps {@link RenderPolygonsOptions}
   * @example
   * renderPolygonsToMap(map, {
   * sourceId: 'custom-polygon-source',
   * polygons:[{
   *   id: 'polygon-1',
   *   path: [
   *     { lat: 32.08, lng: 34.78 },
   *     { lat: 32.08, lng: 34.78 },
   *     { lat: 32.08, lng: 34.78 },
   *   ],
   *   fillColor: '#ff0000',
   * },
   * //... more polygons]
   * onPolygonClick: (polygon) => { console.info(polygon) }
   * }
   */
export function renderPolygonsToMap(map: mapboxgl.Map, polygonsOptions: RenderPolygonsOptions) {
  if (!map) throw new Error('Map is not defined');
  if (!polygonsOptions.polygons) throw new Error('Polygons are not defined');

  const { polygons, onPolygonClick } = polygonsOptions;
  let sourceId = polygonsOptions?.sourceId || DefaultSources.Polygons;

  const polygonsData: PolygonFeature[] = polygonPropToFeature(polygons)

  map.addSource(sourceId, {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: polygonsData,
    },
    buffer: 5,
  });

  map.addLayer({
    id: sourceId + '_fill',
    type: 'fill',
    source: sourceId,
    paint: {
      'fill-color': ['coalesce', ['get', 'fillColor'], '#000'],
      'fill-opacity': ['coalesce', ['get', 'fillOpacity'], 0.3],
    },
  });

  map.addLayer({
    id: sourceId + '_outline',
    type: 'line',
    source: sourceId,
    paint: {
      'line-color': ['coalesce', ['get', 'fillColor'], '#000'],
      'line-width': ['coalesce', ['get', 'lineWidth'], 2],
    },
  });

  if (onPolygonClick) {
    map.on('click', sourceId + '_fill', (e) => {
      if (!onPolygonClick || e?.features === undefined) return;
      const clickedPolygon = e.features[0];
      const pointProperties = clickedPolygon.properties;
      onPolygonClick(pointProperties);
    });

    map.on('mouseenter', sourceId + '_fill', () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', sourceId + '_fill', () => {
      map.getCanvas().style.cursor = '';
    });
  }
}



/**
 * Removes a polygon from a map if the polygon's fill and outline layers exist and the polygon's source is present in the map.
 *
 * @param map - An instance of the `mapboxgl.Map` class representing the map.
 * @param polygonId - A string representing the source id of the polygon to be removed from the map.
 */
export function removePolygonsFromMap(map: mapboxgl.Map, sourceId: string = DefaultSources.Polygons) {
  if (!!map.getSource(sourceId)) {
    map.removeLayer(sourceId + '_fill');
    map.removeLayer(sourceId + '_outline');
    map.removeSource(sourceId);
  }
}


/**
 * Renders a layer of markers to a map.
 * 
 * @param map - The Mapbox GL map instance.
 * @param markersOptions - {@link mapMarkersOptions} The options for rendering the markers.
 *  Can only render a layer at once, if a marker contains the icon property, the layer will only render the icons.
 * @throws {Error} - If the map is not defined or if the source is already defined.
 */
export function renderMarkersToMap(map: mapboxgl.Map, markersOptions: mapMarkersOptions) {
  if (!map) throw new Error('Map is not defined');
  let sourceId = markersOptions?.sourceId || DefaultSources.Markers;
  const { markers, onPointClick } = markersOptions;
  const icons = extractMarkerIcons(markers);

  if (!map.getSource(sourceId)) {
    const features = markerPropsToFeatures(markers)

    const featureCollection: MarkerFeatureCollection = {
      type: 'FeatureCollection',
      features: features,
    };

    map.addSource(sourceId, {
      type: 'geojson',
      data: featureCollection,
    });

    if (!icons || Object.keys(icons).length === 0) {
      map.addLayer({
        id: sourceId + '_marker-point',
        type: 'circle',
        source: sourceId,
        paint: {
          'circle-color': ['coalesce', ['get', 'iconColor'], '#000'],
          'circle-radius': ['coalesce', ['get', 'iconSize'], 6],
        },
      });
    } else {
      loadImagesToMap(map, icons).then(() => {
        map.addLayer({
          id: sourceId + '_marker-point',
          type: 'symbol',
          source: sourceId,
          layout: {
            'icon-image': ['coalesce', ['get', 'icon'], ''], // Use the icon's property 'icon' to obtain the icon name
            'icon-size': ['coalesce', ['get', 'iconSize'], 1],
            'icon-allow-overlap': true,
          },
          paint: {
            'icon-color': ['coalesce', ['get', 'iconColor'], '#000'],
          },
        });
      });
    }
  } else {
    throw new Error('Source is already defined')
  }

  if (onPointClick) {
    map.on('click', sourceId + '_marker-point', (e) => {
      if (!onPointClick || e?.features === undefined) return;
      const clickedPoint = e.features[0];
      const pointProperties = clickedPoint.properties;
      onPointClick(pointProperties);
    });

    map.on('mouseenter', sourceId + '_marker-point', () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', sourceId + '_marker-point', () => {
      map.getCanvas().style.cursor = '';
    });
  }
}

/**
 * Removes a marker layer from a given map
 * @param map The map to remove the marker.
 * @param sourceId The source id of the marker. Default is `DefaultSources.Markers`.
 */
export function removeMarkersFromMap(map: mapboxgl.Map, sourceId: string = DefaultSources.Markers) {
  if (!!map.getSource(sourceId) && map.getLayer(sourceId + '_marker-point')) {
    map.removeLayer(sourceId + '_marker-point');
    map.removeSource(sourceId);
  }
}