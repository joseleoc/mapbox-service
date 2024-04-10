import * as mapboxService from "../build";

mapboxService.setToken(
  "pk.eyJ1IjoiZGllZ295byIsImEiOiJjbG95eGNtc3UwNzg5MnFwZ2kyMGpwZzM1In0.b5MMv3Vn5v-PuO2lR-X7hw"
);

mapboxService.renderMap("map", { center: { lat: 0, lng: 0 } });
