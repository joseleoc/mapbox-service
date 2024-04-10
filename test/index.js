import { setToken, renderMap, renderPolygonsToMap } from "../build";

setToken(
  "pk.eyJ1IjoiZGllZ295byIsImEiOiJjbG95eGNtc3UwNzg5MnFwZ2kyMGpwZzM1In0.b5MMv3Vn5v-PuO2lR-X7hw"
);

const map = renderMap("map", {
  center: { lat: 37.37, lng: -122.04 },
  zoom: 10,
});

map.once("load", () => {
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

  renderPolygonsToMap(map, { polygons });
});
