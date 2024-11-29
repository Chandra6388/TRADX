import axios from "axios";
import * as Config from "../../Utils/Config";

export const subAdminDashboard = async (data) => {

  try {
    const res = await axios.get(`${Config.base_url}Subadmindashboard/${data.userName}`);
    return res?.data; // Handle the response here
  } catch (err) {
    console.error("API Error: ", err);
    throw err; // Rethrow the error for error handling
  }
};
