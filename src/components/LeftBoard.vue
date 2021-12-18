<template>
  <v-row no-gutters class="ms-wrap">
    <v-col class="ms-col" cols="12">
      <filter-bar />
    </v-col>
    <v-col class="ms-col" cols="12">
      <map-view />
    </v-col>
    <v-col class="ms-col" cols="12">
      <statistics />
    </v-col>
  </v-row>
</template>
<script>
import FilterBar from "./FilterBar.vue";
import MapView from "./MapView.vue";
import Statistics from "./Statistics.vue";

export default {
  components: { Statistics, MapView, FilterBar },
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
