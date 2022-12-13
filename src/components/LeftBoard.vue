<template>
  <v-row no-gutters class="ms-wrap">
    <v-col class="ms-col" cols="12">
      <filter-bar :summary="summary" />
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
import { mapActions, mapState } from "vuex";

export default {
  components: { Statistics, MapView, FilterBar },
  props: ["summary"],
  data() {
    return {
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
  computed: {
    ...mapState(["startDay", "endDay", "country", "team"]),
    filterConditions() {
      return [this.startDay, this.endDay, this.country, this.team].join();
    },
  },
  watch: {
    filterConditions() {
      this.loadData();
    },
  },
  methods: {
    ...mapActions([
      "updateStartDay",
      "updateEndDay",
      "updateCountry",
      "updateStridesUsers",
      "updateStridesCountries",
    ]),
    async loadData() {
      this.loading = true;
      const params = {
        start_date: this.startDay,
        end_date: this.endDay,
        country: this.country,
        team: this.team,
      };
      try {
        const { data } = await request.get("/dashboards/strides", {
          params: params,
        });
        this.strides = data.strides;
        this.stats = data.stats;
        this.updateStridesUsers(data.stats.strides_users);
        this.updateStridesCountries(data.stats.strides_countries);
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
