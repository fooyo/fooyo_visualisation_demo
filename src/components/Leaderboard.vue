<template>
  <div class="lb-wrap">
    <v-row no-gutters class="lb-bar">
      <v-col cols="auto">
        <span class="lb-title">Stridy Leaderboard</span>
      </v-col>
      <v-spacer />
      <v-col cols="auto">
        <v-tabs height="24" v-model="tab">
          <v-tabs-slider color="#DFF15A"></v-tabs-slider>
          <v-tab v-for="item in tabItems" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row align="center" no-gutters class="lb-filter">
      <v-col cols="auto">
        <v-chip-group @change="emitChange" v-model="timeMode" mandatory>
          <v-chip value="today"> Today </v-chip>
          <v-chip value="week"> This week </v-chip>
          <v-chip value="all"> All time </v-chip>
        </v-chip-group>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="4">
        <v-select
          full-width
          v-model="country"
          @change="emitChange"
          :items="countries"
          menu-props="auto"
          label="Select"
          hide-details
          single-line
        >
          <v-img
            slot="prepend"
            max-width="23"
            max-height="23"
            :src="require('@/assets/home/location.svg')"
          />
          <v-img
            slot="append"
            max-width="8"
            max-height="24"
            height="24"
            contain
            :src="require('@/assets/home/arrowdown.svg')"
          />
        </v-select>
      </v-col>
    </v-row>

    <v-row no-gutters class="th">
      <v-col cols="2">No.</v-col>
      <v-col cols="3">Name</v-col>
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
      <v-col cols="2">{{ index + 1 }}</v-col>
      <v-col cols="3">{{ item.name }}</v-col>
      <v-col cols="2">{{ item.items_count | fcount }}</v-col>
      <v-col cols="3">{{ item.distance | fdistance }}</v-col>
      <v-col cols="2">{{ item.time_in_minutes | ftime }}</v-col>
    </v-row>

    <v-overlay absolute :value="loading" :opacity="0.3">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);
import request from "../utils/request";

export default {
  props: ["summary"],
  data() {
    return {
      tab: 0,
      tabItems: ["Individuals", "Groups"],
      timeMode: "today",
      country: "Worldwide",
      users: [],
      teams: [],
      loading: false,
    };
  },
  computed: {
    displayList() {
      if (this.tab === 0) {
        return this.users;
      }
      return this.teams;
    },
    countries() {
      return ["Worldwide"].concat(this.summary.countries);
    },
    dates() {
      if (this.timeMode === "today") {
        let date = dayjs().format("YYYY-MM-DD");
        return [date, date];
      }
      if (this.timeMode === "week") {
        return [
          dayjs().isoWeekday(1).format("YYYY-MM-DD"),
          dayjs().isoWeekday(7).format("YYYY-MM-DD"),
        ];
      }
      return [];
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
        let params = {};
        if (this.dates.length) {
          params.start_date = this.dates[0];
          params.end_date = this.dates[1];
        }

        if (this.country !== "Worldwide") {
          params.country = this.country;
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
  padding: 10px 20px;
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
</style>
