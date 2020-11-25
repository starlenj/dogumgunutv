module.exports = {
  ResponseHandler: async (req, res, msg, data = null) => {
    if (data == null) res.send({ msg: "", success: true, status: 200 });
    else res.send({ msg, data, status: 200, success: true });
  },
  ErrorHandler: async (req, res, msg) => {
    res.send({ msg, status: 500, success: false });
  },
};
