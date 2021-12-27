<template>
  <v-row no-gutters class="ms-wrap">
    <v-col class="ms-col" cols="12">
      <filter-bar @change="onChange" :summary="summary" />
    </v-col>
    <v-col class="ms-col" cols="12">
      <map-view :locations="strides" />
    </v-col>
    <v-col class="ms-col" cols="12">
      <statistics :stats="stats" />
    </v-col>
    <v-overlay absolute :value="loading" :opacity="0.3">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-overlay>
  </v-row>
</template>
<script>
import FilterBar from "./FilterBar.vue";
import MapView from "./MapView.vue";
import Statistics from "./Statistics.vue";
import request from "../utils/request";
import dayjs from "dayjs";

export default {
  components: { Statistics, MapView, FilterBar },
  props: ["summary"],
  data() {
    const initDate = dayjs().format("YYYY-MM-DD");
    return {
      config: {
        start_date: initDate,
        end_date: initDate,
        country: "",
      },
      stats: {
        total_distance: 0,
        total_items: [],
        total_time_in_minutes: 0,
        total_strides: 0,
      },
      strides: [],
      loading: false,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    onChange(config) {
      this.config = config;
      this.loadData();
    },
    async loadData() {
      this.loading = true;
      try {
        const { data } = await request.get("/dashboards/strides", {
          params: this.config,
        });
        this.strides = data.strides;
        this.stats = data.stats;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.ms-wrap {
  padding: 25px;
}
.ms-col + .ms-col {
  margin-top: 20px;
}
</style>
