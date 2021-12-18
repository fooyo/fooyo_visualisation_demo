<template>
  <v-row no-gutters>
    <v-col class="wrap" cols="12">
      <div class="geo" ref="geo"></div>
      <div class="map" ref="map"></div>
    </v-col>
  </v-row>
</template>
<script>
import { MarkerClusterer } from "@googlemaps/markerclusterer";

const { google } = window;

const locations = [
  { lat: -31.56391, lng: 147.154312 },
  { lat: -33.718234, lng: 150.363181 },
  { lat: -33.727111, lng: 150.371124 },
  { lat: -33.848588, lng: 151.209834 },
  { lat: -33.851702, lng: 151.216968 },
  { lat: -34.671264, lng: 150.863657 },
  { lat: -35.304724, lng: 148.662905 },
  { lat: -36.817685, lng: 175.699196 },
  { lat: -36.828611, lng: 175.790222 },
  { lat: -37.75, lng: 145.116667 },
  { lat: -37.759859, lng: 145.128708 },
  { lat: -37.765015, lng: 145.133858 },
  { lat: -37.770104, lng: 145.143299 },
  { lat: -37.7737, lng: 145.145187 },
  { lat: -37.774785, lng: 145.137978 },
  { lat: -37.819616, lng: 144.968119 },
  { lat: -38.330766, lng: 144.695692 },
  { lat: -39.927193, lng: 175.053218 },
  { lat: -41.330162, lng: 174.865694 },
  { lat: -42.734358, lng: 147.439506 },
  { lat: -42.734358, lng: 147.501315 },
  { lat: -42.735258, lng: 147.438 },
  { lat: -43.999792, lng: 170.463352 },
];

export default {
  data() {
    return {};
  },
  mounted() {
    this.handleGeo();
    this.handleMap();
  },
  methods: {
    handleMap() {
      const map = new google.maps.Map(this.$refs.map, {
        zoom: 3,
        center: { lat: -28.024, lng: 140.887 },
      });
      const infoWindow = new google.maps.InfoWindow({
        content: "",
        disableAutoPan: true,
      });

      // Create an array of alphabetical characters used to label the markers.
      const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      // Add some markers to the map.
      const markers = locations.map((position, i) => {
        const label = labels[i % labels.length];
        const marker = new google.maps.Marker({
          position,
          // label,
        });

        // markers can only be keyboard focusable when they have click listeners
        // open info window when marker is clicked
        marker.addListener("click", () => {
          infoWindow.setContent(label);
          infoWindow.open(map, marker);
        });
        return marker;
      });

      // Add a marker clusterer to manage the markers.
      new MarkerClusterer({
        markers,
        map,
        renderer: {
          // https://github.com/googlemaps/js-markerclusterer/blob/9bc185e802ef9f6ae8ca0faf79e539b1273d521e/src/renderer.ts#L68
          render: ({ count, position }) => {
            // change color if this cluster has more markers than the mean cluster
            // const color =
            //   count > Math.max(4, stats.clusters.markers.mean)
            //     ? "#ff0000"
            //     : "#0000ff";

            // create svg url with fill color
            const svg = window.btoa(`
              <svg width="58" height="53" viewBox="0 0 58 53" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                      <linearGradient x1="65.11%" y1="21.76%" x2="3.317%" y2="86.232%" id="a">
                          <stop stop-opacity="0" offset="0%"/>
                          <stop stop-opacity=".194" offset="100%"/>
                      </linearGradient>
                      <filter x="-8.3%" y="-9.7%" width="116.5%" height="119.4%" filterUnits="objectBoundingBox" id="b">
                          <feGaussianBlur stdDeviation="1" in="SourceGraphic"/>
                      </filter>
                  </defs>
                  <g fill="none" fill-rule="evenodd">
                      <path d="m46.574 19.562-.36-.112c-8.089-2.298-19.244.98-25.14 7.386-4.647 5.051-3.67 6.828-2.092 22.214l.057.55c22.667-7.809 26.48-8.443 31.325-13.709 2.881-3.131 4.101-6.612 3.392-9.676-.709-3.063-3.289-5.46-7.173-6.66l-.01.007z" fill="url(#a)" filter="url(#b)" transform="translate(.93)"/>
                      <path d="M20.462.013h-.48C9.385.273.931 8.925.93 19.51c0 8.345 2.713 10.242 19.051 29.405l.585.685C36.646 30.542 40 28.208 40 19.51a19.497 19.497 0 0 0-5.722-13.796A19.548 19.548 0 0 0 20.465 0l-.003.013z" fill="#00C727"/>
                      <path d="M20.838 36.498c-.266 0-.51-.026-.776-.042-9.025 0-16.341-7.523-16.341-16.803 0-9.28 7.316-16.803 16.34-16.803.261 0 .511-.042.777-.042 9.042 0 16.371 7.537 16.371 16.834 0 9.298-7.33 16.835-16.371 16.835v.021z" fill="#FFF" fill-rule="nonzero"/>
                  </g>
                  <text x="21" y="25" font-size="12" text-anchor="middle" fill="#00c727">${count}</text>
              </svg>
            `);

            // create marker using svg icon
            return new google.maps.Marker({
              position,
              icon: {
                url: `data:image/svg+xml;base64,${svg}`,
                scaledSize: new google.maps.Size(58, 53),
                anchor: new google.maps.Point(0, 0),
              },
              title: `Cluster of ${count} markers`,
              // adjust zIndex to be above other markers
              zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
            });
          },
        },
      });
    },
    handleGeo() {
      google.charts.load("current", {
        packages: ["geochart"],
      });

      const drawRegionsMap = () => {
        var data = google.visualization.arrayToDataTable([
          ["Country", "Count"],
          ["France", 65700000],
          ["China", 81890000],
          ["Poland", 38540000],
        ]);
        var options = {
          backgroundColor: "rgb(95,167,161)",
          colorAxis: { colors: ["#DFF15A"] },
        };
        var chart = new google.visualization.GeoChart(this.$refs.geo);
        chart.draw(data, options);
        // https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#FJ
        google.visualization.events.addListener(chart, "regionClick", (ev) => {
          this.handleMap(ev);
        });
      };

      google.charts.setOnLoadCallback(drawRegionsMap);
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  border-radius: 16px;
  overflow: hidden;
  position: relative;
}
.geo {
  height: 376px;
}
.map {
  height: 376px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
}
</style>
