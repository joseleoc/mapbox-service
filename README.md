<!-- ABOUT THE PROJECT -->

## About The Project

<!-- BUILDT WITH -->

### Built With

![typescript][typescript-badge]
![mapboxgl][mapbox-badge]

<!-- GETTING STARTED -->

Before you get started with Mapbox GL JS, you need to have a Mapbox [access token](https://docs.mapbox.com/help/getting-started/access-tokens/){:target="\_blank" rel="noopener"} and add Mapbox GL JS to your project using either the CDN or the mapbox-gl npm package.

To use Mapbox GL JS, you need to have a Mapbox access token. This access token associates your map with a Mapbox account. For more information on creating and using access tokens, see our token [management documentation](https://docs.mapbox.com/accounts/guides/tokens/){:target="\_blank" rel="noopener"}.

See the mapbox's official getting started guide [documentation](https://docs.mapbox.com/mapbox-gl-js/guides/install/){:target="\_blank" rel="noopener"}

Install the npm package.

```bash
npm install --save mapbox-gl
```

Include the CSS file in the <head> of your HTML file. The CSS file is required to display the map and make elements like Popups and Markers work.

```bash
<link href='https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css' rel='stylesheet' />
```

If you're using a CSS loader like webpack css-loader, you can import the CSS directly in your JavaScript.

```bash
import 'mapbox-gl/dist/mapbox-gl.css';
```

Initialize the service

## Getting Started

```bash
<body>
    <div id="container-id"></div>
</body>

<script>
    import { setToken, renderMap } from 'mapbox-service';

    setToken(##########);

    renderMap('container-id');
</script>
```

<!-- CONTACT -->

# Contact

[![LinkedIn][linkedin-shield]](https://www.linkedin.com/in/leonardo-contreras-v/){:target="\_blank" rel="noopener"}

Leonardo Contreras - joseleoc123@gmail.com

Project link: [github](https://github.com/joseleoc/mapbox-service){:target="\_blank" rel="noopener"}

<!-- MARKDOWN LINKS & IMAGES -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[typescript-badge]: https://img.shields.io/badge/typescript-white?logo=typescript
[mapbox-badge]: https://img.shields.io/badge/mapbox-blue?logo=mapbox
