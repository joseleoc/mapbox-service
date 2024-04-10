import mapboxgl from "mapbox-gl";
import { PolygonFeature, RenderMapOptions, RenderPolygonsOptions } from "./types/types";
import { DefaultSources } from "./types/enums";
import { polygonPropToFeature } from "./utils";

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