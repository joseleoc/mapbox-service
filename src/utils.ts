import { CoordsArray, MarkerIconDictionary, MarkerPointProps, PointFeature, PolygonFeature, PolygonProp } from "./types/types";

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

export function markerPropsToFeatures(markers: MarkerPointProps[]): PointFeature[] {
    return markers.map((marker) => {
        const coordinates: CoordsArray = [marker.coords.lng, marker.coords.lat];

        const feature: PointFeature = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates,
            },
            properties: {
                id: marker.id,
                ...marker.properties,
                icon: marker.icon?.name,
                iconSize: marker.iconSize,
                iconColor: marker.iconColor,
            },
        };

        return feature
    })
}

export function extractMarkerIcons(markers: MarkerPointProps[]): MarkerIconDictionary {
    const icons: MarkerIconDictionary = {};

    markers.forEach((marker) => {
        if (marker.icon && marker.icon.name && marker.icon.path) {
            icons[marker.icon.name] = { path: marker.icon.path, dynamicColor: marker.icon.dynamicColor }
        } else {
            console.error(`Marker ${marker.icon?.name} has not defined a name or path`)
        }
    })

    return icons
}