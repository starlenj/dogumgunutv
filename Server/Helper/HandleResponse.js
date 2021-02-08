module.exports = {
  HandleResponse: async (req, res, message, data = []) => {
    try {
      if (data.length === 0) {
        res.status(200).send({ status: 200, success: true, message });
      } else {
        res.status(200).send({ status: 200, success: true, data, message });
      }
    } catch (e) {
      res.status(500).send({ status: 500, success: false, message: "HATA" });
    }
  },

  HandleError: async (req, res, message) => {
    try {
      res.status(200).send({ status: 200, success: false, message });
    } catch (e) {
      res.status(500).send({ status: 500, success: false, message });
    }
  },
};
