export interface RenderMapOptions {
  /** The initial geographical centerpoint of the map. default is `{lat: 0, lng: 0} ` */
  center?: Coords;
  /** The map's Mapbox style. This must be an a JSON object conforming to the schema described in the Mapbox {@link https://docs.mapbox.com/style-spec/guides | Style Specification}, or a URL to such JSON. Can accept a null value to allow adding a style manually. */
  mapStyle?: string;
  /** The initial zoom level of the map. */
  zoom?: number;
}

export type Coords = { lat: number; lng: number };
export type CoordsArray = [number, number];

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

export interface PolygonFeature {
  type: "Feature";
  geometry: { type: "Polygon"; coordinates: [[number, number][]] };
  properties: any;
}

export class PointFeature {
  type: "Feature";
  geometry: { type: "Point"; coordinates: [number, number] };
  properties: any;

  constructor(data: PointFeature) {
    this.type = data.type;
    this.geometry = data.geometry;
    this.properties = data.properties;
  }
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

type MinimumPolygonPath = [Coords, Coords, Coords, ...Coords[]]

export interface MarkerIconProps {
  [name: string]: { path: string; dynamicColor?: boolean };
}

export interface mapMarkersOptions {
  points: MarkerPointProps[];
  iconsProps?: MarkerIconProps;
  onPointClick?: (pointProperties: any) => void;
  sourceId?: string;
}

export interface MarkerPointProps {
  id: string;
  coords: Coords;
  properties: any;
  icon?: string;
  iconSize?: number;
  iconColor?: string;
}
