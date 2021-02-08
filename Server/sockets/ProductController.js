const ProductModel = require("../Models/Product");
module.exports = {

    async GetProductWithCategory(Params) {
        try {
            const ProductData = await ProductModel.find({ Status: 1, CategoryId: Params.CategoryId }).limit(3);
            return ProductData;
        } catch (error) {
            console.error(error);
        }
    },
}