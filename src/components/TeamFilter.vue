<template>
  <v-autocomplete
    v-model="selectTeam"
    :items="dummyTeams"
    item-text="name"
    item-value="id"
    :filter="customFilter"
    background-color="#dff15a"
    @change="onChange"
    :hide-no-data="!dropdownShown"
    class="team-filter"
    @click:clear="onClear"
    @input.native="onInput"
    dense
    filled
    clearable
    clear-icon="highlight_off"
    placeholder="Search a Team..."
    append-icon=""
    prepend-inner-icon="search"
  ></v-autocomplete>
</template>
<script>
import request from "../utils/request";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      dummyTeams: [],
      teams: [],
      selectTeam: null,
      userInput: null,
    };
  },
  mounted() {
    this.loadTeams();
  },
  computed: {
    dropdownShown() {
      return this.userInput;
    },
  },
  methods: {
    ...mapActions(["updateTeam"]),
    customFilter(item, queryText, itemText) {
      const searchText = queryText.toLowerCase();
      const teamName = itemText.toLowerCase();
      return !item.id || teamName.includes(searchText);
    },
    async loadTeams() {
      try {
        const { data } = await request.get("/dashboards/teams");
        this.teams.push(...data.teams);
      } catch (error) {
        console.log(error);
      }
    },
    onChange(teamId) {
      this.updateTeam(teamId);
    },
    onClear() {
      this.dummyTeams = [];
      this.userInput = null;
    },
    onInput(inputEvent) {
      const userInput = inputEvent.target.value;
      this.userInput = userInput;

      if (userInput) {
        this.dummyTeams = [...this.teams];
      } else {
        this.dummyTeams = [];
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.team-filter {
  margin-top: 25px !important;
}
.team-filter ::v-deep .v-input__slot .v-select__slot input {
  font-weight: 500;
}
.team-filter ::v-deep .v-icon {
  color: rgba(0, 0, 0, 0.54) !important;
}
.team-filter ::v-deep .v-input__slot .v-select__slot input {
  caret-color: auto;
}
</style>
