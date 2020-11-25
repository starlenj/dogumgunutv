import axios from "axios";

const URL = "http://localhost:3000/";
export const Post = async (requestUrl, data) => {
  try {
    let req = await axios.post(requestUrl, data);

    if (req.data.success) {
      //error handler toast message
      return req;
    } else {
      return req;
    }
  } catch (e) {
    //error handler toast message
  }
};
