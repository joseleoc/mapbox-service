import {
  setToken,
  renderMap,
  renderPolygonsToMap,
  renderMarkersToMap,
} from "../build";

setToken(
  "pk.eyJ1IjoiZGllZ295byIsImEiOiJjbG95eGNtc3UwNzg5MnFwZ2kyMGpwZzM1In0.b5MMv3Vn5v-PuO2lR-X7hw"
);

const renderMarkers = (mapInstance) => {
  const markers = [
    {
      id: "1",
      coords: { lat: 37.37, lng: -122.04 },
      properties: undefined,
      icon: { name: "marker", path: "./assets/marker.webp" },
      iconSize: 0.1,
    },
    {
      id: "2",
      coords: { lat: 37.429814, lng: -122.23846 },
      properties: undefined,
      icon: { name: "marker", path: "./assets/marker.webp" },
      iconSize: 0.1,
    },
    {
      id: "3",
      coords: { lat: 37.442762, lng: -122.247195 },
      properties: undefined,
      icon: { name: "marker", path: "./assets/marker.webp" },
      iconSize: 0.1,
    },
  ];
  renderMarkersToMap(mapInstance, {
    markers,
    onPointClick: (e) => console.info(e),
  });
};

const map = renderMap("map", {
  center: { lat: 37.37, lng: -122.04 },
  zoom: 10,
});

map.once("load", () => {
  renderMarkers(map);
  const polygons = [
    {
      id: "1",
      path: [
        { lat: 37.4163221, lng: -122.3422178 },
        { lat: 37.4656899, lng: -122.2873244 },
        { lat: 37.31828, lng: -122.2339267 },
      ],
    },
  ];

  renderPolygonsToMap(map, {
    polygons,
    onPolygonClick: (e) => console.info(e),
  });
});
