export type Coords = { lat: number; lng: number };
/** Represents an array with the coords. where the first element is the longitude and the second is the latitude. */
export type CoordsArray = [number, number];

export type MinimumPolygonPath = [Coords, Coords, Coords, ...Coords[]]

export interface RenderMapOptions {
  /** The initial geographical centerpoint of the map. default is `{lat: 0, lng: 0} ` */
  center?: Coords;
  /** The map's Mapbox style. This must be an a JSON object conforming to the schema described in the Mapbox {@link https://docs.mapbox.com/style-spec/guides | Style Specification}, or a URL to such JSON. Can accept a null value to allow adding a style manually. */
  mapStyle?: string;
  /** The initial zoom level of the map. */
  zoom?: number;
}


export type RenderPolygonsOptions = {
  /** The polygons to render */
  polygons: PolygonProp[];
  /** Source id to refer to this group of polygons. */
  sourceId?: string;
  /**
   * A callback function that is invoked when the polygon is clicked.
   * This function is executed outside of the component's scope, so you'll need
   * to explicitly reference the component's state or properties using `this`.
   * @example 
   * const that = this;
   * const onPolygonClick = (polygonProperties:any) => {
   *  that.CustomFunction(polygonProperties);
   * }
   */
  onPolygonClick?: (polygonProperties: any) => void;
}


export interface PolygonProp {
  /** Polygon id */
  id: string;
  /** The polygon path, should be at least an array of three Coords. */
  path: MinimumPolygonPath;
  /** The polygons fill color. Default is `#000` */
  fillColor?: string;
  /** The polygons fill opacity. Default is `0.3` */
  fillOpacity?: number;
  /** The polygons properties. used when the onPolygonClick is defined and to return such data. */
  properties: any;
  /** The polygon's outline width in pixels. Default is `2` */
  lineWidth: number;
}

export interface mapMarkersOptions {
  /** Markers to render to the map.
   * @see {@link MarkerPointProps}
  */
  markers: MarkerPointProps[];
  /** A callback function that is invoked when the marker is clicked. */
  onPointClick?: (pointProperties: any) => void;
  /** Source id to refer to this group of markers. */
  sourceId?: string;
}

export type MarkerPointProps = {
  /** The marker id */
  id: string;
  /** The marker's geographical coordinates. Should be an object with `lat` and `lng` properties. */
  coords: Coords;
  /** The marker's properties. used when the onPointClick is defined and to return such data.  */
  properties: any;
  /** The marker's icon. Is an object with `name`, `path` and `dynamicColor` properties. 
   * @see {@link MarkerIcon} 
   * */
  icon?: MarkerIcon;
  /** The marker's icon size, represented in percentages where 100% is `1`. 100% of the size is the img width and height. you can change the size from 0 to 1. */
  iconSize?: number;
  /** The marker's icon color. Default is `#000`. if the icon is defined, you can set the icon's dynamic color to get this color and mask the img with this color, the image must be a PNG or JPG file and must contain plain colors  */
  iconColor?: string;
}

export type MarkerIcon = {
  /** Icon's name */
  name: string;
  /** The path to get the img */
  path: string;
  /** If the icon is dynamic, you can set the icon's dynamic a color and mask the img with the {@link MarkerPointProps} color, the image must be a PNG or JPG file and must contain plain colors */
  dynamicColor?: boolean;
}

/** Marker icon dictionary, where the key is the icon's name and the value is an object with the icon's path and dynamicColor properties. */
export type MarkerIconDictionary = { [key: string]: Pick<MarkerIcon, 'path' | 'dynamicColor'> }


/** Use to create a feature collection of markers in a map */
export type MarkerFeatureCollection = {
  type: 'FeatureCollection';
  features: PointFeature[];
}