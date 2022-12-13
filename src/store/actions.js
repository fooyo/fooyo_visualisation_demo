export const updateStartDay = ({ commit }, startDay) => {
  commit("changeStartDay", startDay);
};

export const updateEndDay = ({ commit }, endDay) => {
  commit("changeEndDay", endDay);
};

export const updateCountry = ({ commit }, country) => {
  commit("changeCountry", country);
};

export const updateTeam = ({ commit }, team) => {
  commit("changeTeam", team);
};

export const updateTotalUsers = ({ commit }, users) => {
  commit("changeTotalUsers", users);
};

export const updateTotalCountries = ({ commit }, countries) => {
  commit("changeTotalCountries", countries);
};

export const updateStridesUsers = ({ commit }, users) => {
  commit("changeStridesUsers", users);
};

export const updateStridesCountries = ({ commit }, countries) => {
  commit("changeStridesCountries", countries);
};
