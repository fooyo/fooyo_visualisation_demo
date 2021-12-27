<template>
  <div class="stat-wrap">
    <div class="stat-title">Stridy Statistics</div>
    <v-row class="stat-head" align="center" no-gutters>
      <v-col md="6" lg="4" sm="12" cols="12">
        <v-row justify="center" align="center" no-gutters>
          <v-img
            max-height="30"
            max-width="30"
            :src="require('@/assets/home/number.svg')"
          />
          <span class="stat-label">Number of Strides</span>
          <span class="stat-num">{{ stats.total_strides }}</span>
        </v-row>
      </v-col>
      <v-col md="6" lg="4" sm="12" cols="12">
        <v-row justify="center" align="center" no-gutters>
          <v-img
            max-height="30"
            max-width="30"
            :src="require('@/assets/home/loc.svg')"
          />
          <span class="stat-label">Total Distance</span>
          <span class="stat-num">{{ stats.total_distance }}</span>
        </v-row>
      </v-col>
      <v-col md="6" lg="4" sm="12" cols="12">
        <v-row justify="center" align="center" no-gutters>
          <v-img
            max-height="30"
            max-width="30"
            :src="require('@/assets/home/timer.svg')"
          />
          <span class="stat-label">Total Time</span>
          <span class="stat-num">{{ stats.total_time_in_minutes }}</span>
        </v-row>
      </v-col>
    </v-row>
    <v-row no-gutters class="bottom-wrap">
      <v-col cols="12" sm="12" md="4" lg="5" xl="5">
        <v-row align="center" justify="center">
          <pie-chart :items="stats.total_items" />
        </v-row>
      </v-col>
      <v-col
        :class="[
          $vuetify.breakpoint.sm || $vuetify.breakpoint.xs ? 'chart-mt' : '',
        ]"
        cols="12"
        sm="12"
        md="8"
        lg="7"
        xl="7"
      >
        <v-row no-gutters>
          <v-col
            :class="[
              $vuetify.breakpoint.lg || $vuetify.breakpoint.xl
                ? 'stat-line'
                : '',
            ]"
            cols="12"
            md="12"
            lg="6"
          >
            <v-row
              v-for="(item, index) in stats.total_items.slice(0, 6)"
              :key="index"
              no-gutters
              align="center"
              class="stat-item"
            >
              <v-img
                max-height="30"
                max-width="30"
                width="30"
                height="30"
                contain
                :src="item.image_url"
              />
              <span class="stat-label">{{ item.name }}</span>
              <v-spacer />
              <span class="stat-num">{{ item.value }}</span>
            </v-row>
          </v-col>
          <v-col cols="12" md="12" lg="6">
            <v-row
              v-for="(item, index) in stats.total_items.slice(6)"
              :key="index"
              no-gutters
              align="center"
              :class="[
                'stat-item',
                $vuetify.breakpoint.sm ||
                $vuetify.breakpoint.md ||
                $vuetify.breakpoint.xs
                  ? 'stat-item-sm'
                  : '',
              ]"
            >
              <v-img
                max-height="30"
                max-width="30"
                width="30"
                height="30"
                contain
                :src="item.image_url"
              />
              <span class="stat-label">{{ item.name }}</span>
              <v-spacer />
              <span class="stat-num">{{ item.value }}</span>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import PieChart from "./PieChart.vue";
export default {
  props: ["stats"],
  components: {
    PieChart,
  },
  data() {
    return {
      items: [{}, {}, {}, {}, {}, {}, {}, {}],
    };
  },
};
</script>
<style lang="scss" scoped>
.stat-title {
  font-size: 16px;
  font-weight: 500;
}
.stat-head {
  background-color: #f4f5ef;
  border-radius: 8px;
  margin-top: 15px;
  ::v-deep {
    .row {
      height: 60px;
    }
    .col-12 {
      position: relative;

      + .col-12::before {
        position: absolute;
        left: 0;
        height: 20px;
        background-color: rgba(22, 50, 35, 0.1);
        width: 1px;
        content: "";
        top: 50%;
        transform: translateY(-50%) scaleX(0.5);
      }
    }
  }
}
.stat-label {
  font-size: 16px;
  margin-left: 5px;
  margin-right: 22px;
}
.stat-num {
  font-size: 20px;
  font-weight: 500;
}
.stat-item {
  padding: 0 45px;
  margin-top: 28px;

  &:first-child {
    margin-top: 0;
  }
  .stat-label {
    margin-left: 10px;
    margin-right: 0;
  }
  .stat-num {
    font-size: 16px;
  }
}
.bottom-wrap {
  margin-top: 30px;
}
.stat-item-sm {
  &:first-child {
    margin-top: 28px;
  }
}
.stat-line {
  position: relative;
  &:after {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(22, 50, 35, 0.1);
    width: 1px;
    content: "";
    transform: scaleX(0.5);
  }
}
.chart-mt {
  margin-top: 50px;
}
</style>
