const SonFiyat = require("../Models/SonFiyat");
module.exports = {
  async NewSonFiyat(Params) {
    try {
      let LastOrder = await SonFiyat.find({
        ProductId: Params.ProductId,
      })
        .sort({ Order: "desc" })
        .limit(1);
      let NewSonFiyatData = new SonFiyat({
        UserId: Params.UserId,
        ProductId: Params.ProductId,
        Order: LastOrder[0].Order + 1,
        Price: Params.Price,
      });
      let response = await NewSonFiyatData.save();
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  async GetSonFiyat(Params) {
    console.log(Params);
    try {
      let SonFiyatList = await SonFiyat.find({
        ProductId: Params.ProductId,
        Status: false,
      })
        .sort({ Order: "desc" })
        .limit(5);
      return SonFiyatList;
    } catch (error) {
      console.error(error);
    }
  },
  async SendSonFiyat(Params) {
    try {
      let SonFiyat = await SonFiyat.find({
        UserId: Params.UserId,
        ProductId: Params.ProductId,
        Status: false,
      })
        .sort({ Order: "desc" })
        .limit(1);
      return SonFiyat;
    } catch (error) {
      console.error(error);
    }
  },
  async SonFiyatPasifEt(Params) {
    try {
      let SonFiyat = await SonFiyat.find({
        UserId: Params.UserId,
        ProductId: Params.ProductId,
        Status: false,
      })
        .sort({ Order: "desc" })
        .limit(1);
      let UpdateData = await SonFiyat.findById(SonFiyat._id);
      UpdateData.Status = false;
      let Response = await UpdateData.save();
      return Response;
    } catch (error) {
      console.error(error);
    }
  },
};
