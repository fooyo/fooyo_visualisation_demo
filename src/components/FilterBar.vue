<template>
  <v-row no-gutters class="filter">
    <v-col cols="12">
      <v-row no-gutters>
        <v-col v-if="!team" cols="12" sm="12" md="6" lg="3" xl="2">
          <v-select
            full-width
            v-model="country"
            :items="countries"
            :menu-props="{
              bottom: true,
              'nudge-left': 45,
              'nudge-top': -5,
              'offset-y': true,
              'z-index': 1,
            }"
            label="Select"
            hide-details
            single-line
            @change="onCountryChange"
            class="country-select dropdown-select"
          >
            <v-img
              slot="prepend"
              max-width="36"
              max-height="36"
              :src="require('@/assets/home/circleloc.svg')"
            />
            <v-img
              slot="append"
              max-width="24"
              max-height="36"
              height="36"
              contain
              :src="require('@/assets/home/circledown.svg')"
            />
          </v-select>
        </v-col>

        <v-col cols="12" sm="12" md="6" lg="3" xl="2">
          <v-select
            full-width
            v-model="selectedTime"
            :items="timeSelections"
            :menu-props="{
              bottom: true,
              'nudge-left': 45,
              'nudge-top': -5,
              'offset-y': true,
              'z-index': 1,
            }"
            label="Select"
            hide-details
            single-line
            @change="onTimeSelectionChange"
            class="dropdown-select"
          >
            <v-img
              slot="prepend"
              max-width="36"
              max-height="36"
              :src="require('@/assets/home/calendar.svg')"
            />
            <v-img
              slot="append"
              max-width="24"
              max-height="36"
              height="36"
              contain
              :src="require('@/assets/home/circledown.svg')"
            />
          </v-select>
        </v-col>

        <v-col
          v-if="customDateRangeSelected"
          class="custom-date-selection"
          cols="12"
          sm="12"
          md="8"
          lg="6"
          xl="3"
        >
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="dates"
            transition="scale-transition"
            offset-y
            nudge-left="-42"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                hide-details
                v-model="dateRangeText"
                readonly
                v-bind="attrs"
                v-on="on"
                class="date-field"
              >
                <span slot="prepend">Date</span>
                <v-img
                  max-width="16"
                  max-height="36"
                  height="36"
                  contain
                  slot="append"
                  :src="require('@/assets/home/date.svg')"
                />
              </v-text-field>
            </template>
            <v-date-picker
              color="#dff15a"
              v-model="dates"
              range
              no-title
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn class="btn-cancel" text @click="onHideCustomDateSelection">
                Cancel
              </v-btn>
              <v-btn class="btn-ok" text @click="onConfirmDate"> Apply </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);
import request from "../utils/request";
import { mapState, mapActions } from "vuex";

const TIME_SELECTIONS = [
  "All Time",
  "This Week",
  "This Month",
  "This Year",
  "Custom",
];

const WORLDWIDE = "Worldwide";

export default {
  props: ["summary"],
  data() {
    return {
      dates: [null, null],
      menu: false,
      customDateRangeSelected: false,
      country: WORLDWIDE,
      timeSelections: TIME_SELECTIONS,
      selectedTime: TIME_SELECTIONS[0],
      cachedTimeSelected: null,
    };
  },
  computed: {
    dateRangeText() {
      if (this.dates[0] && this.dates[1]) {
        return this.dates.join("    ~    ");
      } else {
        return "Please select a date range";
      }
    },
    countries() {
      return [WORLDWIDE].concat(this.summary.countries);
    },
    ...mapState(["team"]),
  },
  watch: {
    team(newTeamId) {
      if (newTeamId) {
        this.country = WORLDWIDE;
      }

      this.updateCountry(null);
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
    onHideCustomDateSelection() {
      this.customDateRangeSelected = false;
      this.selectedTime = this.cachedTimeSelected;
      this.onTimeSelectionChange(this.selectedTime);
    },
    onConfirmDate() {
      if (this.dates.length === 1) {
        this.dates.push(this.dates[0]);
      }
      console.log("abc: ", this.dates);
      this.updateStartDay(this.dates[0]);
      this.updateEndDay(this.dates[1]);
      this.$refs.menu.save(this.dates);
    },

    onTimeSelectionChange(selectedTime) {
      let startDay = null;
      let endDay = null;
      this.customDateRangeSelected = false;
      switch (selectedTime) {
        case "All Time":
          break;
        case "This Week":
          startDay = dayjs().isoWeekday(1).format("YYYY-MM-DD");
          endDay = dayjs().isoWeekday(7).format("YYYY-MM-DD");
          break;
        case "This Month":
          startDay = dayjs().startOf("month").format("YYYY-MM-DD");
          endDay = dayjs().endOf("month").format("YYYY-MM-DD");
          break;
        case "This Year":
          startDay = dayjs().startOf("year").format("YYYY-MM-DD");
          endDay = dayjs().endOf("year").format("YYYY-MM-DD");
          break;
        case "Custom":
          this.customDateRangeSelected = true;
          return;
      }
      this.cachedTimeSelected = selectedTime;
      console.log("startDay: ", startDay);
      console.log("endDay: ", endDay);
      this.updateStartDay(startDay);
      this.updateEndDay(endDay);
    },

    onCountryChange() {
      const country = this.country === "Worldwide" ? null : this.country;
      this.updateCountry(country);
    },
    async onDownload() {
      const { data: blob } = await request.get("/dashboards/strides", {
        params: {
          start_date: this.dates[0],
          end_date: this.dates[1],
          country: this.country !== "Worldwide" ? this.country : "",
        },
        responseType: "blob",
        headers: {
          "Content-Type": "text/csv",
          Accept: "text/csv",
        },
      });
      const url = window.URL || window.webkitURL;
      const link = url.createObjectURL(blob);
      const aEl = document.createElement("a");
      aEl.setAttribute(
        "download",
        `${this.dates[0]}_${this.dates[1]}_${this.country}.csv`
      );
      aEl.setAttribute("href", link);
      document.body.appendChild(aEl);
      aEl.click();
      document.body.removeChild(aEl);
    },
  },
};
</script>
<style lang="scss">
.v-menu__content {
  border-radius: 10px;
}
.v-date-picker-table .v-btn.v-btn--active {
  background: linear-gradient(
    to right,
    #dff15a,
    rgba(198, 238, 142, 1)
  ) !important;
  color: #163223 !important;
  font-weight: bold;
  border-color: transparent !important;
  &::before {
    background-color: transparent;
  }
}

.v-select-list {
  padding: 0;
}
.v-select-list .v-list-item--highlighted {
  background: linear-gradient(
    to right,
    #dff15a,
    rgba(198, 238, 142, 1)
  ) !important;
  .v-list-item__title {
    color: #163223 !important;
    font-weight: bold;
  }
}
</style>
<style lang="scss" scoped>
@import "@/styles/mixins.scss";
.btn-cancel {
  text-transform: none;
  color: #8c8c8c;
}
.btn-ok {
  text-transform: none;
}
.download-btn {
  text-transform: none;
  margin-left: 40px;
  background: linear-gradient(to right, #dff15a, rgba(198, 238, 142, 1));
}
.download-icon {
  margin-right: 5px;
}
.date-field {
  padding-top: 0;
  margin-top: 0;
  ::v-deep {
    .v-input__slot {
      margin-bottom: 0;
      &::before,
      &::after {
        display: none;
      }
    }
    .v-input__append-inner {
      margin-top: 0;
      margin-right: 12px;
      pointer-events: none;
    }
    .v-input__prepend-outer {
      margin-top: 0;
      line-height: 36px;
      font-size: 16px;
      margin-right: 10px;
    }
    .v-input__control {
      height: 36px;
      background-color: #f7f7f7;
      border-radius: 4px;
      input {
        text-align: center;
        height: 36px;
        max-height: 36px;
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
}

.country-select {
  margin-right: 40px;
  @include mobile {
    margin-right: 0;
  }
}
@media screen and (min-width: 1265px) {
  .custom-date-selection .date-field {
    padding-left: 40px;
  }
}
.dropdown-select {
  padding-top: 0;
  margin-top: 0;

  ::v-deep {
    .v-input__slot {
      min-height: 36px;
      &::before,
      &::after {
        display: none;
      }
    }
    label {
      top: 0;
      height: 36px;
      line-height: 36px;
    }
    .v-input__prepend-outer {
      margin-top: 0;
    }
    .v-input__append-inner {
      margin-top: 0;
    }
  }
}

.filter {
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
      padding: 0 8px;
      min-width: auto;
      letter-spacing: 0;
    }

    .v-tabs .v-tabs-bar .v-tab:not(.v-tab--active) {
      color: #838584;
    }

    .v-tab--active {
      color: #163223;
    }
  }
}
</style>
