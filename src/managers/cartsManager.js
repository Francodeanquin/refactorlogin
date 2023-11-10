import { cartsModel } from "../db/models/carts.models.js";
import BasicManager from "./basicManager.js";

class CartsManager extends BasicManager {
   constructor() {
      super(cartsModel);
   }

 

   async findInfoProducts(idCart) {
      const cart = await cartsModel
         .findById(idCart)
         .populate("productsCart.idProduct")
         .lean();
      return cart;
   }
   async findAllSimple() {
      return this.model.find().populate("productsCart.idProduct").lean();
   }

   async findAllCarts(obj) {
      const { limit, page, ...queryFilter } = obj;
    
  const effectiveLimit = limit || 10;
  const effectivePage = page || 1;

  const response = await cartsModel.paginate(queryFilter, {
    limit: effectiveLimit,
    page: effectivePage,
    lean: true,
  });
      const info = {
         status: "success",
         payload: response.docs,
         count: response.totalDocs,
         totalPages: response.totalPages,
         prevPage: response.prevPage,
         nextPage: response.nextPage,
         page: response.page,
         hasPrevPage: response.hasPrevPage,
         hasNextPage: response.hasNextPage,
         prevLink: response.hasPrevPage
            ? `http://localhost:8080/api/users?page=${response.prevPage}`
            : null,
         nextLink: response.hasNextPage
            ? `http://localhost:8080/api/users?page=${response.nextPage}`
            : null,
      };

      return info;
   }
}

export const cartsManager = new CartsManager();
