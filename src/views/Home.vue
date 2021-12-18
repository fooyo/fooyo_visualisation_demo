<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" class="h-col" sm="6" md="7" lg="8" xl="8">
        <v-card elevation="0" class="left-card">
          <left-board />
        </v-card>
      </v-col>
      <v-col cols="12" class="h-col" sm="6" md="5" lg="4" xl="4">
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
import LeftBoard from "../components/LeftBoard.vue";

export default {
  name: "Home",
  components: {
    CountStats,
    Leaderboard,
    LeftBoard,
  },
};
</script>
<style lang="scss" scoped>
.container {
  padding: 15px;
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
  // height: 100%;
}
.h-col {
  padding: 10px !important;
}
.spacer {
  height: 20px;
}
</style>
