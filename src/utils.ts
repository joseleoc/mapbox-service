import { PointFeature, PolygonFeature } from "./types/classes";
import { CoordsArray, MarkerIconDictionary, MarkerPointProps, PolygonProp } from "./types/types";

export function polygonPropToFeature(polygons: PolygonProp[]): PolygonFeature[] {
    const polygonsData: PolygonFeature[] = polygons.map((p) => {
        const coordinates: CoordsArray[] = p.path.map((c) => [c.lng, c.lat]);


        if (!firstLastCoordAreEqual(coordinates)) {
            coordinates.push(coordinates[0])
        }

        return new PolygonFeature({ coords: coordinates, properties: { ...p.properties, fillColor: p.fillColor } })
    });

    return polygonsData
}

function firstLastCoordAreEqual(coords: CoordsArray[]) {
    return coords[coords.length - 1][0] === coords[0][0] && coords[coords.length - 1][1] === coords[0][1]
}

export function markerPropsToFeatures(markers: MarkerPointProps[]): PointFeature[] {
    return markers.map((marker) => {
        const coords: CoordsArray = [marker.coords.lng, marker.coords.lat];

        return new PointFeature({
            coords, properties: {
                id: marker.id,
                ...marker.properties,
                icon: marker.icon?.name,
                iconSize: marker.iconSize,
                iconColor: marker.iconColor,
            },
        })
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