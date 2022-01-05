<template>
  <v-row no-gutters>
    <v-col class="col" md="6" xl="6" sm="12" cols="12">
      <v-row no-gutters align="center" justify="center">
        <v-img
          contain
          max-width="52"
          height="92"
          max-height="92"
          :src="require('@/assets/home/leaf.svg')"
        />
        <span class="cs-title">{{ summary.total_users }}</span>
        <span class="cs-caption">No. of Striders Worldwide</span>
      </v-row>
    </v-col>
    <v-col class="col" md="6" xl="6" sm="12" cols="12">
      <v-row no-gutters align="center" justify="center">
        <v-img
          contain
          max-width="71"
          max-height="92"
          height="92"
          :src="require('@/assets/home/world.svg')"
        />
        <span class="cs-title">{{ summary.total_countries }}</span>
        <span class="cs-caption">No. of Countries</span>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: ["summary"],
};
</script>
<style lang="scss" scoped>
.col {
  position: relative;
  height: 286px;

  &:nth-child(1) {
    &::after {
      width: 1px;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      background: rgba(22, 50, 35, 0.1);
      transform: scaleX(0.5);
      content: "";
    }
  }

  ::v-deep {
    .row {
      height: 100%;
      flex-direction: column;
      text-align: center;

      .cs-title {
        font-size: 30px;
        margin-top: 20px;
        margin-bottom: 20px;
        line-height: 40px;
        font-weight: 500;
      }

      .cs-caption {
        font-size: 16px;
        height: 22px;
        line-height: 22px;
      }
    }
  }
}
</style>
