<template>
  <v-app>
    <v-app-bar fixed height="88" light app color="#fff" elevation="0">
      <v-img
        max-width="50"
        max-height="39"
        class="logo"
        :src="require('./assets/logo.svg')"
      />
      <v-toolbar-title class="title"
        >Community Impact Dashboard</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-toolbar-title class="sub-title">A cleaner way to move</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
<style lang="scss" scoped>
.logo {
  margin-right: 30px;
}
.title {
  font-weight: bold;
  font-size: 20px;
}
.sub-title {
  font-size: 16px;
}
</style>
