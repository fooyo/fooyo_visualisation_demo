<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" class="h-col" sm="6" md="7" lg="8" xl="8">
        <v-card class="m-show" elevation="0">
          <count-stats />
        </v-card>
        <div class="m-show">
          <team-filter />
        </div>
        <v-card elevation="0" class="left-card">
          <left-board :summary="summary" />
        </v-card>
      </v-col>
      <v-col cols="12" class="h-col" sm="6" md="5" lg="4" xl="4">
        <v-card class="m-hide" elevation="0">
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
import TeamFilter from "../components/TeamFilter.vue";
import request from "../utils/request";
import { mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    CountStats,
    Leaderboard,
    LeftBoard,
    TeamFilter,
  },
  data() {
    return {
      summary: {
        total_users: 0,
        total_countries: 0,
        countries: [],
      },
    };
  },
  mounted() {
    this.loadSummary();
  },
  methods: {
    ...mapActions(["updateTotalUsers", "updateTotalCountries"]),
    async loadSummary() {
      const { data } = await request.get("/dashboards/summary");
      this.summary = data;
      this.updateTotalUsers(data.total_users);
      this.updateTotalCountries(data.total_countries);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/mixins.scss";
.m-hide {
  @include mobile {
    display: none;
  }
}
.container {
  padding: 15px;

  @include mobile {
    padding: 0;
  }
}
.m-show {
  display: none;
  @include mobile {
    display: flex;
  }
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
}
.h-col {
  padding: 10px !important;
}
.spacer {
  height: 20px;
}
</style>
