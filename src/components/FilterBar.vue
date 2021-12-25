<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-row no-gutters>
        <v-col cols="12" sm="12" md="6" lg="5" xl="3">
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
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="onConfirmDate"> OK </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" sm="12" md="4" xl="2" lg="3">
          <v-select
            full-width
            v-model="country"
            :items="countries"
            menu-props="auto"
            label="Select"
            hide-details
            single-line
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

        <v-spacer />
        <v-btn elevation="0" class="download-btn" :translate="false">
          <v-img
            max-width="12"
            max-height="11"
            class="download-icon"
            :src="require('@/assets/home/download.svg')"
          />
          Download Data
        </v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import dayjs from "dayjs";
export default {
  data() {
    return {
      dates: [dayjs().format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD")],
      menu: false,
      country: "Worldwide",
      countries: ["Worldwide", "Singapore"],
    };
  },
  computed: {
    dateRangeText() {
      return this.dates.join("    ~    ");
    },
  },
  methods: {
    onConfirmDate() {
      if (this.dates.length === 1) {
        this.dates.push(this.dates[0]);
      }
      this.$refs.menu.save(this.dates);
    },
  },
};
</script>
<style lang="scss" scoped>
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
</style>
