<template>
  <v-row no-gutters class="filter">
    <v-col cols="12">
      <v-row no-gutters>
        <v-col cols="12" sm="12" md="6" lg="4" xl="3">
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
              <v-btn class="btn-cancel" text @click="menu = false">
                Cancel
              </v-btn>
              <v-btn class="btn-ok" text @click="onConfirmDate"> Apply </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" sm="12" md="4" lg="3" xl="2">
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
            @change="emitChange"
            class="country-select"
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

        <v-col cols="12" sm="12" md="12" lg="5" xl="7">
          <v-row
            class="tab-row"
            align-content="center"
            no-gutters
            justify-lg="end"
            style="height: 40px"
            justify-xl="end"
          >
            <div style="height: 30px">
              <v-tabs optional @change="onTabChange" v-model="tab" height="30">
                <v-tabs-slider color="#DFF15A"></v-tabs-slider>
                <v-tab v-for="(item, index) in tabItems" :key="index">
                  {{ item }}
                </v-tab>
              </v-tabs>
            </div>
          </v-row>
        </v-col>
        <!-- <v-btn
          @click="onDownload"
          elevation="0"
          class="download-btn"
          :translate="false"
        >
          <v-img
            max-width="12"
            max-height="11"
            class="download-icon"
            :src="require('@/assets/home/download.svg')"
          />
          Download Data
        </v-btn> -->
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import dayjs from "dayjs";
import request from "../utils/request";

export default {
  props: ["summary"],
  data() {
    return {
      dates: [
        dayjs().subtract(30, "day").format("YYYY-MM-DD"),
        dayjs().format("YYYY-MM-DD"),
      ],
      menu: false,
      country: "Worldwide",
      tab: undefined,
      tabItems: ["This week", "This month", "This year", "All time"],
    };
  },
  computed: {
    dateRangeText() {
      return this.dates.join("    ~    ");
    },
    countries() {
      return ["Worldwide"].concat(this.summary.countries);
    },
  },
  methods: {
    onConfirmDate() {
      if (this.dates.length === 1) {
        this.dates.push(this.dates[0]);
      }
      this.tab = undefined;
      this.emitChange();
      this.$refs.menu.save(this.dates);
    },

    onTabChange(tabValue) {
      if (tabValue === undefined) {
        return;
      }

      let params = {};
      if (tabValue === 0) {
        params.start_date = dayjs().isoWeekday(1).format("YYYY-MM-DD");
        params.end_date = dayjs().isoWeekday(7).format("YYYY-MM-DD");
      } else if (tabValue === 1) {
        params.start_date = dayjs().startOf("month").format("YYYY-MM-DD");
        params.end_date = dayjs().endOf("month").format("YYYY-MM-DD");
      } else if (tabValue === 2) {
        params.start_date = dayjs().startOf("year").format("YYYY-MM-DD");
        params.end_date = dayjs().endOf("year").format("YYYY-MM-DD");
      }
      this.$emit("change", {
        ...params,
        country: this.country !== "Worldwide" ? this.country : "",
      });
    },

    emitChange() {
      this.$emit("change", {
        start_date: this.dates[0],
        end_date: this.dates[1],
        country: this.country !== "Worldwide" ? this.country : "",
      });
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
  padding-top: 0;
  margin-top: 0;
  margin-left: 40px;
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
