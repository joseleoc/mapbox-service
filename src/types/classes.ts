import { CoordsArray } from "../index.d";

/** Represents a polygon inside a group of layer of polygons in a map */
export class PolygonFeature {
    type: "Feature" = "Feature";
    geometry: { type: "Polygon"; coordinates: [CoordsArray[]] };
    properties: any;
    constructor(data: { coords: CoordsArray[], properties: any }) {
        this.geometry = { type: "Polygon", coordinates: [data.coords] };
        this.properties = data.properties;
    }
}

/** Represents a point / marker inside a layer of points in a map */
export class PointFeature {
    type: "Feature" = "Feature";
    geometry: { type: "Point"; coordinates: CoordsArray };
    properties: any;

    constructor(data: { coords: CoordsArray, properties: any }) {
        this.geometry = { type: "Point", coordinates: data.coords };
        this.properties = data.properties;
    }

}