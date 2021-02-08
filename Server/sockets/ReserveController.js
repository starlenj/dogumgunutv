const ReserveModel = require("../Models/Reserve");
module.exports = {

    async GetReserveProduct(ProductId) {
        try {
            const ReserverData = await ReserveModel.find({ Status: 1, ProductId }).limit(5);
            return ReserveData;
        } catch (error) {
            console.error(error);
        }
    },
}