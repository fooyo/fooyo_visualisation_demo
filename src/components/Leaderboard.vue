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
          <v-tab v-for="item in items" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row align="center" no-gutters class="lb-filter">
      <v-col cols="auto">
        <v-chip-group v-model="timeMode" mandatory>
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
    <v-row no-gutters class="tr">
      <v-col cols="2">1</v-col>
      <v-col cols="3">2</v-col>
      <v-col cols="2">2</v-col>
      <v-col cols="3">2</v-col>
      <v-col cols="2">2</v-col>
    </v-row>

    <!-- <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <v-card flat>
          <v-card-text v-text="text"></v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab: "web",
      items: ["Individuals", "Groups"],
      timeMode: "today",
      country: "Worldwide",
      countries: ["Worldwide", "China"],
    };
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
  &:first-child {
    margin-top: 15px;
  }
  .col:first-child {
    font-weight: bold;
  }
}
</style>
