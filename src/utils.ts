import { CoordsArray, PolygonFeature, PolygonProp } from "./types/types";

export function polygonPropToFeature(polygons: PolygonProp[]): PolygonFeature[] {
    const polygonsData: PolygonFeature[] = polygons.map((p) => {
        const coordinates: CoordsArray[] = p.path.map((c) => [c.lng, c.lat]);

        if (!firstLastCoordAreEqual(coordinates)) {
            coordinates.push(coordinates[0])
        }

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

function firstLastCoordAreEqual(coords: CoordsArray[]) {
    return coords[coords.length - 1][0] === coords[0][0] && coords[coords.length - 1][1] === coords[0][1]
}