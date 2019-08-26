import axios from "axios";
let baseUrl = process.env.REACT_APP_FIT_BASE_URL;

export default {
  attachItemsToStories: function(pkCycle, pkDivision) {
    return axios.get(
      `${baseUrl}/index.php/scheduled_jobs/attachItemsToStories/YmFja2Rvb3Jmb3JoZWFkbGVzc2NsaWVudA%3D%3D/editorial?pk_cycle=${pkCycle}&pk_division=${pkDivision}`
    );
  }
};
