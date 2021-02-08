const ProductController = require("../sockets/ProductController");
module.exports = (socket) => {

    ///ProductRoute
    socket.on("ProductListCategory1", () => "TEST")
    socket.on("GetProductListCategory1", async (CategoryId) => {
        let response = await ProductController.GetProductWithCategory(CategoryId);
        socket.emit("ProductListCategory1", response);
    }
    );

    socket.on("ProductListCategory2", () => "TEST")
    socket.on("GetProductListCategory2", async (CategoryId) => {
        let response = await ProductController.GetProductWithCategory(CategoryId);
        socket.emit("ProductListCategory2", response);
    }
    );

    socket.on("ProductListCategory3", () => "TEST")
    socket.on("GetProductListCategory3", async (CategoryId) => {
        let response = await ProductController.GetProductWithCategory(CategoryId);
        socket.emit("ProductListCategory3", response);
    }
    );


}