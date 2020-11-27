import axios from "axios";
const URL = "http://localhost:3333/";
export const Post = async (requestUrl, data) => {
  try {
    let req = await axios.post(URL + requestUrl, data);
    if (req.data.success) {
      return req;
    } else {
      return req;
    }
  } catch (e) {
  }
};
