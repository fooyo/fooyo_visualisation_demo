<template>
  <div class="lb-wrap">
    <v-row no-gutters class="lb-bar">
      <v-col cols="auto">
        <span class="lb-title">{{ title }}</span>
      </v-col>
      <v-spacer />
      <v-col cols="auto" v-if="!team">
        <v-tabs @change="emitChange" height="24" v-model="tab">
          <v-tabs-slider color="#DFF15A"></v-tabs-slider>
          <v-tab v-for="item in tabItems" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <div v-if="displayList.length" v-scroll class="overflow-y-scroll">
      <v-row no-gutters class="th">
        <v-col cols="1">No.</v-col>
        <v-col cols="4">Name</v-col>
        <v-col cols="2">Items</v-col>
        <v-col cols="3">Distance</v-col>
        <v-col cols="2">Time</v-col>
      </v-row>
      <v-row
        v-for="(item, index) in displayList"
        :key="index"
        no-gutters
        class="tr"
      >
        <v-col cols="1">{{ index + 1 }}</v-col>
        <v-col cols="4">{{ item.name }}</v-col>
        <v-col cols="2">{{ item.items_count | fcount }}</v-col>
        <v-col cols="3">{{ item.distance | fdistance }}</v-col>
        <v-col cols="2">{{ item.time_in_minutes | ftime }}</v-col>
      </v-row>
    </div>
    <div v-else class="empty">
      <v-img
        max-height="150"
        max-width="150"
        :src="require('@/assets/home/empty.svg')"
      />
      <span>Sorry, there is no data yet</span>
    </div>

    <v-overlay absolute :value="loading" :opacity="0.3">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
import request from "../utils/request";
import { mapState } from "vuex";

export default {
  data() {
    return {
      tab: 0,
      tabItems: ["Individuals", "Teams"],
      timeMode: "all",
      users: [],
      teams: [],
      loading: false,
    };
  },
  computed: {
    title() {
      if (this.team) {
        return "Team Leaderboard";
      } else {
        return "Stridy Leaderboard";
      }
    },
    displayList() {
      if (this.tab === 0) {
        return this.users;
      }
      return this.teams;
    },
    ...mapState(["startDay", "endDay", "country", "team"]),
    filterConditions() {
      return [this.startDay, this.endDay, this.country, this.team].join();
    },
  },
  watch: {
    team(newTeamId) {
      if (newTeamId) {
        this.tab = 0;
      }
    },
    filterConditions() {
      this.loadData();
    },
  },
  mounted() {
    this.loadData();
  },
  methods: {
    emitChange() {
      this.loadData();
    },
    async loadData() {
      try {
        this.loading = true;
        let params = {
          country: this.country,
          team: this.team,
        };
        if (this.startDay && this.endDay) {
          params.start_date = this.startDay;
          params.end_date = this.endDay;
        }

        const { data } = await request.get("/dashboards/leaderboard", {
          params,
        });
        this.users = data.users;
        this.teams = data.teams;
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
.lb-bar {
  padding: 20px 20px 15px 20px;
}
.lb-title {
  font-size: 16px;
  font-weight: 500;
}
.lb-wrap {
  padding-bottom: 20px;
  position: relative;
  height: 100%;

  ::v-deep {
    .v-tabs-slider-wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    .v-tabs-slider {
      width: 20px;
      background: linear-gradient(
        to right,
        #dff15a,
        rgba(198, 238, 142, 1)
      ) !important;
    }

    .v-tab {
      text-transform: none;
      font-size: 14px;
      padding: 0 10px;
      min-width: auto;
    }

    .v-tabs .v-tabs-bar .v-tab:not(.v-tab--active) {
      color: #838584;
    }

    .v-tab--active {
      color: #163223;
    }
  }
}

.lb-filter {
  padding: 10px 17px 10px 20px;
  background-color: #f4f5ef;

  ::v-deep {
    .v-text-field {
      padding-top: 0;
      margin-top: 0;
    }
    .v-input__slot::before,
    .v-input__slot::after {
      display: none;
    }
    .v-slide-group__content {
      padding-top: 0;
      padding-bottom: 0;
    }
    .v-chip-group .v-chip {
      margin-top: 0;
      margin-bottom: 0;
    }
    .v-chip {
      height: 28px;
      border-radius: 4px;
      &::before {
        background-color: transparent;
      }
    }
    .v-chip:not(.v-chip--active) {
      background-color: #fff;
      color: #838584;
    }
    .v-chip.v-chip--active {
      background: linear-gradient(to right, #dff15a, rgba(198, 238, 142, 1));
      color: #163223;
    }
  }
}

.th {
  color: #1d211f;
  font-weight: 500;
  margin-top: 20px;
  padding: 0 20px;
}
.tr {
  padding: 0 20px;
  margin-top: 24px;
  .col {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:first-child {
    margin-top: 15px;
  }
  .col:first-child {
    font-weight: bold;
  }
}

.country-select {
  ::v-deep {
    .v-input__slot {
      min-height: 28px !important;
      &::before,
      &::after {
        display: none;
      }
    }
    .v-select__selection--comma {
      margin-top: 0;
      margin-bottom: 0;
    }
    label {
      top: 0;
      height: 28px;
      line-height: 28px;
    }
    .v-input__prepend-outer {
      margin-top: 0;
      margin-bottom: 0;
    }
    .v-input__append-inner {
      margin-top: 0;
      margin-bottom: 0;
    }
  }
}
.overflow-y-scroll {
  overflow-y: scroll;
  max-height: 530px;
  min-height: 530px;
}
.empty {
  min-height: 530px;
  max-height: 530px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  span {
    font-size: 16px;
    margin-top: 10px;
    color: #838584;
  }
}
</style>
