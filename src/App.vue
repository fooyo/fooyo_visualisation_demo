<template>
  <v-app>
    <v-app-bar fixed height="88" light app color="#fff" elevation="0">
      <v-row class="d-flex app-bar-content" justify="center" align="center">
        <v-col class="m-hide" xl="3" md="4" xs="12" cols="1">
          <a href="https://www.stridy.com">
            <v-img
              max-width="50"
              max-height="39"
              class="logo"
              :src="require('./assets/logo.svg')"
            />
          </a>
        </v-col>
        <v-col xl="6" md="4" xs="12" cols="10">
          <v-toolbar-title class="title text-center"
            >Community Impact Dashboard</v-toolbar-title
          >
        </v-col>
        <v-col class="m-hide" xl="3" md="4" xs="12" cols="1">
          <team-filter></team-filter>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import TeamFilter from "./components/TeamFilter.vue";

export default {
  components: { TeamFilter },
  name: "App",

  data: () => ({
    //
  }),
};
</script>
<style lang="scss" scoped>
@import "@/styles/mixins.scss";

.m-hide {
  @include mobile {
    display: none;
  }
}

.app-bar-content {
  width: 100%;
}
.title {
  font-weight: bold;
  font-size: 20px;
  @include mobile {
    font-size: 20px !important;
  }
}
.sub-title {
  font-size: 16px;
  line-height: 2;
}
</style>
