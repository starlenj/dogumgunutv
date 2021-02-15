import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const URL = "http://localhost:4000/Api/V1/";
export const Post = async (RequestUrl, Data) => {
  try {
    let Response = await axios.post(URL + RequestUrl, Data);
    if (Response.data.success) {
      //İŞLEM BAŞARILI
      toast.success(Response.data.message);
      return Response.data;
    } else {
      //İŞLEM BAŞARISIZ
      toast.error(Response.data.message);
      return Response.data;
    }
  } catch (e) {
    //İŞLEM HATALI
    console.error(e);
    toast.error(Response.data.message);
    return e;
  }
};

export const List = async (RequestUrl) => {
  try {
    let Response = await axios.get(URL + RequestUrl);
    if (Response.data) {
      return Response.data;
    } else {
      return [];
    }
  } catch (e) {
    toast.error("Veri Çekme İşlemi Başarısız..");
  }
};

export const Put = async (RequestUrl, data, id) => {
  try {
    let Response = await axios.put(URL + RequestUrl + "/" + id, data);
    if (Response.data) {
      return Response.data;
    } else {
      return [];
    }
  } catch (e) {
    toast.error("Veri Çekme İşlemi Başarısız..");
  }
};
export const Delete = async (RequestUrl, id) => {
  try {
    let Response = await axios.delete(URL + RequestUrl + "/" + id);
    if (Response.data) {
      return Response.data;
    } else {
      return [];
    }
  } catch (e) {
    toast.error("Veri Çekme İşlemi Başarısız..");
  }
};

export const Get = async (RequestUrl, id) => {
  try {
    let Response = await axios.get(URL + RequestUrl + "/" + id);
    if (Response.data) {
      return Response.data;
    } else {
      return [];
    }
  } catch (e) {
    toast.error("Veri Çekme İşlemi Başarısız..");
  }
};
