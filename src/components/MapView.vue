<template>
  <v-row no-gutters>
    <v-col class="wrap" cols="12">
      <div class="map" ref="map"></div>
    </v-col>
  </v-row>
</template>
<script>
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { getCenter } from "geolib";
import { formatThousand } from "../utils/common";
import { mapState } from "vuex";

const { google } = window;

export const DEFAULT_COORDS = {
  lat: 1.3521,
  lng: 103.8198,
};

const getIcon = (count) => {
  return window.btoa(`
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
        <text x="21" y="25" font-family="Avenir" font-size="12" text-anchor="middle" fill="#00c727">${count}</text>
    </svg>
  `);
};

const ORIGINAL_ZOOM_SCALE = 2;
const SINGAPORE_ZOOM_SCALE = 11;

export default {
  props: ["locations"],
  data() {
    return {};
  },
  mounted() {
    this.handleMap();
  },
  computed: {
    ...mapState(["country"]),
    filterConditions() {
      return [this.country, this.locations].join();
    },
  },
  watch: {
    filterConditions() {
      this.handleMap();
    },
  },
  methods: {
    handleMap() {
      if (!this.map) {
        this.map = new google.maps.Map(this.$refs.map, {
          zoom: ORIGINAL_ZOOM_SCALE,
        });
      }

      if (this.country) {
        const centerBound = getCenter(this.locations);
        this.map.setCenter({
          lat: centerBound.latitude,
          lng: centerBound.longitude,
        });
        this.map.setZoom(SINGAPORE_ZOOM_SCALE);
      } else {
        this.map.setCenter(DEFAULT_COORDS);
        this.map.setZoom(ORIGINAL_ZOOM_SCALE);
      }
      // const infoWindow = new google.maps.InfoWindow({
      //   content: "",
      //   disableAutoPan: true,
      // });

      // Create an array of alphabetical characters used to label the markers.
      // const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      // Add some markers to the map.
      const markers = this.locations.map((position) => {
        // const label = labels[i % labels.length];
        const marker = new google.maps.Marker({
          position: {
            lat: position.latitude,
            lng: position.longitude,
          },
          // label,
          icon: {
            url: `data:image/svg+xml;base64,${getIcon(1)}`,
            scaledSize: new google.maps.Size(58, 53),
            anchor: new google.maps.Point(21, 50),
          },
        });

        // markers can only be keyboard focusable when they have click listeners
        // open info window when marker is clicked
        // marker.addListener("click", () => {
        //   infoWindow.setContent(label);
        //   // infoWindow.open(map, marker);
        // });
        return marker;
      });

      if (this.cluster) {
        this.cluster.setMap(null);
      }

      // Add a marker clusterer to manage the markers.
      this.cluster = new MarkerClusterer({
        markers,
        map: this.map,
        renderer: {
          // https://github.com/googlemaps/js-markerclusterer/blob/9bc185e802ef9f6ae8ca0faf79e539b1273d521e/src/renderer.ts#L68
          render: ({ count, position }) => {
            return new google.maps.Marker({
              position,
              icon: {
                url: `data:image/svg+xml;base64,${getIcon(
                  count < 1000 ? count : formatThousand(count)
                )}`,
                scaledSize: new google.maps.Size(58, 53),
                anchor: new google.maps.Point(21, 50),
              },
              title: `Cluster of ${count} markers`,
              // adjust zIndex to be above other markers
              zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
            });
          },
        },
      });
      // this.marker.setMap(this.map);
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
.map {
  height: 376px;
}
</style>
