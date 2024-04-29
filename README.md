# Mapbox utils service

Simplifies working with Mapbox GL JS by eliminating boilerplate code. It provides intuitive functions to render and manage maps, markers, lines, and polygons, allowing you to focus on building interactive map features for your project.

### Built With

[![mapboxgl][mapbox-badge]](https://docs.mapbox.com/mapbox-gl-js/guides/install/)

<!-- GETTING STARTED -->

# Get started

### Get token

Before you get started with Mapbox GL JS, you need to have a Mapbox [access token](https://docs.mapbox.com/help/getting-started/access-tokens/). This access token associates your map with a Mapbox account. For more information on creating and using access tokens, see mapbox's token [management documentation](https://docs.mapbox.com/accounts/guides/tokens/).

See the mapbox's official getting started [guide](https://docs.mapbox.com/mapbox-gl-js/guides/install/).

### Installation

- Install the npm package.

```bash
npm install --save mapbox-gl
```

- Include the CSS file in the <head> of your HTML file. The CSS file is required to display the map and make elements like Popups and Markers work.

```bash
<link href='https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css' rel='stylesheet' />
```

- If you're using a CSS loader like webpack css-loader, you can import the CSS directly in your JavaScript.

```bash
import 'mapbox-gl/dist/mapbox-gl.css';
```

## Usage

```bash
<body>
    <div id="container-id"></div>
</body>

<script>
    import { setToken, renderMap } from 'mapbox-service';

    // Set the user mapbox token here.
    setToken(##########);

    renderMap('container-id', {...options here});
</script>
```

<!-- CONTACT -->

# Contact

[![LinkedIn][linkedin-shield]](https://www.linkedin.com/in/leonardo-contreras-v/)

Leonardo Contreras - joseleoc123@gmail.com

[Project link](https://github.com/joseleoc/mapbox-service)

<!-- MARKDOWN LINKS & IMAGES -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[typescript-badge]: https://img.shields.io/badge/typescript-white?logo=typescript
[mapbox-badge]: https://img.shields.io/badge/mapbox-blue?logo=mapbox
