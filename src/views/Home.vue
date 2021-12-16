<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="8" sm="6" md="7" lg="8">
        <v-card elevation="0" class="left-card">1212</v-card>
      </v-col>
      <v-col cols="4" sm="6" md="5" lg="4">
        <v-card elevation="0">
          <count-stats />
        </v-card>
        <div class="spacer"></div>
        <v-card elevation="0">
          <leaderboard />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CountStats from "../components/CountStats.vue";
import Leaderboard from "../components/Leaderboard.vue";
export default {
  name: "Home",
  components: {
    CountStats,
    Leaderboard,
  },
};
</script>
<style lang="scss" scoped>
.container {
  padding: 25px;
}
::v-deep {
  .v-toolbar__content {
    padding: 0 25px;
  }
  .v-card {
    border-radius: 16px !important;
  }
}
.left-card {
  height: 100%;
  margin-right: 20px;
}
.spacer {
  height: 20px;
}
</style>
