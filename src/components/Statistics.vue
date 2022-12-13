<template>
  <div class="stat-wrap">
    <div class="stat-title">Stridy Statistics</div>
    <v-row class="stat-head" align="center" justify="space-around" no-gutters>
      <v-row justify="center" align="center" no-gutters>
        <v-img
          max-height="30"
          max-width="30"
          :src="require('@/assets/home/face.svg')"
        />
        <span class="stat-label">Strides</span>
        <span class="stat-num">{{ stats.total_strides | fcount }}</span>
      </v-row>
      <v-row justify="center" align="center" no-gutters>
        <v-img
          max-height="30"
          max-width="30"
          :src="require('@/assets/home/number.svg')"
        />
        <span class="stat-label">Items</span>
        <span class="stat-num">
          {{ stats.total_items_picked_up | fcount }}
        </span>
      </v-row>
      <v-row justify="center" align="center" no-gutters>
        <v-img
          max-height="30"
          max-width="30"
          :src="require('@/assets/home/weight.svg')"
        />
        <span class="stat-label">Weight</span>
        <span class="stat-num">
          {{ stats.total_weight | fweight }}
        </span>
      </v-row>
      <v-row justify="center" align="center" no-gutters>
        <v-img
          max-height="30"
          max-width="30"
          :src="require('@/assets/home/loc.svg')"
        />
        <span class="stat-label">Distance</span>
        <span class="stat-num">{{ stats.total_distance | fdistance }}</span>
      </v-row>
      <v-row justify="center" align="center" no-gutters>
        <v-img
          max-height="30"
          max-width="30"
          :src="require('@/assets/home/timer.svg')"
        />
        <span class="stat-label">Time</span>
        <span class="stat-num">{{ stats.total_time_in_minutes | ftime }}</span>
      </v-row>
    </v-row>
    <v-row no-gutters class="bottom-wrap">
      <v-col cols="12" sm="12" md="4" lg="3" xl="5">
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
        lg="9"
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
            lg="6"
          >
            <v-row
              v-for="(item, index) in stats.total_items.slice(0, 6)"
              :key="index"
              no-gutters
              align="center"
              class="stat-item"
            >
              <span
                class="material-icon"
                :style="{ color: materialColor(item.name) }"
              >
                •
              </span>
              <v-img
                max-height="30"
                max-width="30"
                width="30"
                height="30"
                contain
                :src="item.image_url"
              />
              <span class="stat-label">{{ renameItem(item.name) }}</span>
              <v-spacer />
              <span class="stat-num">{{ item.value | fcommasNumber }}</span>
            </v-row>
          </v-col>
          <v-col cols="12" lg="6">
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
              <span
                class="material-icon"
                :style="{ color: materialColor(item.name) }"
              >
                •
              </span>
              <v-img
                max-height="30"
                max-width="30"
                width="30"
                height="30"
                contain
                :src="item.image_url"
              />
              <span class="stat-label">{{ renameItem(item.name) }}</span>
              <v-spacer />
              <span class="stat-num">{{ item.value | fcommasNumber }}</span>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import PieChart from "./PieChart.vue";
import { MATERIAL_COLORS } from "../utils/constants";

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
  methods: {
    renameItem(itemName) {
      const items = itemName.split(" - ");
      if (items.length === 1) {
        return items[0];
      }
      return `${items[1]} [${items[0]}]`;
    },
    materialColor(itemName) {
      return MATERIAL_COLORS[itemName];
    },
  },
};
</script>
<style lang="scss" scoped>
.material-icon {
  margin-right: 5px;
  color: red;
}
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
  .stat-label {
    font-size: 12px;
  }
  .stat-num {
    font-size: 14px;
  }
}
.stat-label {
  font-size: 16px;
  margin-left: 5px;
  margin-right: 5px;
}
.stat-num {
  font-size: 20px;
  font-weight: 500;
}
.stat-item {
  padding: 0 10px 0 35px;
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
