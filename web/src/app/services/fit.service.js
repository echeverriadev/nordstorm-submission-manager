import axios from "axios";
let baseUrl = process.env.REACT_APP_FIT_BASE_URL;

export default {
  attachItemsToStories: function(pkCycle, pkDivision) {
    return axios.get(
      `${baseUrl}/process/attachItemsToStories?pk_cycle=${pkCycle}&pk_division=${pkDivision}`
    );
  }
};
