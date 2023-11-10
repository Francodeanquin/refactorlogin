import fs from "fs";
import { productsManager } from "./productManager.js";

class CartsManager {
  constructor(path) {
    this.path = path;
  }

  async getProductsCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const info = await fs.promises.readFile(this.path, "utf-8");
        const infoParsed = JSON.parse(info);
        return infoParsed;
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async createCart(idSuggestedByUser) {
    try {
      const carts = await this.getProductsCarts();
      const cart = carts.find((c) => c.id === idSuggestedByUser);
      let id;
      let productsCart = [];
      if (!cart) {
        id = +idSuggestedByUser;
        const newCart = { id, productsCart };
        carts.push(newCart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts));
        return newCart + ` El id del carrito que has creado es ${id}. ¡No lo olvides!`;;
      }

      if (!carts.length) {
        id = 1;
      } else {
        id = carts[carts.length - 1].id + 1;
      }
      const newCart = { id, productsCart };
      carts.push(newCart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return newCart +` Ingresaste un  id preexitente motivo por el cual te reasignamos un ID automaticamnte.  El id del carrito que has creado es ${id}. ¡No lo olvides!`;
    } catch (error) {
      return error;
    }
  }

  async getProductsCartsById(idCart) {
    try {
      const carts = await this.getProductsCarts();
      const cart = carts.find((c) => c.id === idCart);
      return cart;
    } catch (error) {
      return error;
    }
  }

  async addProductsInThisCart(idCart, idProduct) {
    try {
      if (!idCart || !idProduct) {
        return "this cart/product no found or ID is incorrect";
      }
      let carts = await this.getProductsCarts();
      const cart = carts.find((c) => c.id === idCart);
      if (!cart) {
        return "No found Cart";
      }
      const product = await productsManager.getProductById(idProduct);
      if (!product) {
        return "No found Product";
      }

      if (!cart.productsCart.find((item) => item.idProduct === idProduct)) {
        cart.productsCart.push({ idProduct: product.id, qty: 1 });
        await fs.promises.writeFile(this.path, JSON.stringify(carts));
        return cart;
      } else {
        const index = cart.productsCart.findIndex(
          (u) => u.idProduct === idProduct
        );
        const onlyCart = carts[index];

        const result = cart.productsCart.map((item) => {
          return { ...item, qty: item.qty + 1 };
        });
        carts[index].productsCart = [...result];
        console.log(carts[index].productsCart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts));
        return carts;
      }
    } catch (error) {
      return error;
    }
  }
}


export const cartsManager = new CartsManager("productsCart.json");