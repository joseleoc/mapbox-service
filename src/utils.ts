import { CoordsArray, PolygonFeature, PolygonProp } from "./types/types";

export function polygonPropToFeature(polygons: PolygonProp[]): PolygonFeature[] {
    const polygonsData: PolygonFeature[] = polygons.map((p) => {
        const coordinates: CoordsArray[] = p.path.map((c) => [c.lng, c.lat]);

        return {
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [coordinates],
            },
            properties: { ...p.properties, fillColor: p.fillColor },
        };
    });

    return polygonsData
}