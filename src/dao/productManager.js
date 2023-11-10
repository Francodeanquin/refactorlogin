import fs from "fs";

class ProductsManager {
  constructor(path) {
    this.path = path;
  }
  async getProducts(queryObj) {
    const { limit } = queryObj;

    try {
      if (fs.existsSync(this.path)) {
        const info = await fs.promises.readFile(this.path, "utf-8");
        const infoParsed = JSON.parse(info);
        if (!limit) return infoParsed;
        return [...infoParsed].slice(0, +limit);
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async getProductById(idUser) {
    try {
      const users = await this.getProducts({});
      const user = users.find((u) => u.id === idUser);
      return user;
    } catch (error) {
      return error;
    }
  }

  async createProduct(obj) {
    try {
      const products = await this.getProducts({});
      let id;
      let status;
      if (obj.status) {
        status = true;
      } else {
        status = obj.status;
      }
      if (!products.length) {
        id = 1;
      } else {
        id = products[products.length - 1].id + 1;
      }
      const newProduct = { id, ...obj, status };
      products.push(newProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return newProduct;
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(idProduct) {
    try {
      const products = await this.getProducts({});
      const product = products.find((p) => p.id === idProduct);
      if (!product) {
        return -1;
      }
      const newArrayProducts = products.filter((p) => p.id !== idProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(newArrayProducts));
      return 1;
    } catch (error) {
      return error;
    }
  }

  async updateProduct(idProduct, obj) {
    try {
      if (!obj.id) {
        const products = await this.getProducts({});
        const index = products.findIndex((u) => u.id === idProduct);
        if (index === -1) {
          return -1;
        }
        const product = products[index];
        products[index] = { ...product, ...obj };
        await fs.promises.writeFile(this.path, JSON.stringify(products));
        return 1;
      }
    } catch (error) {
      return error;
    }
  }
}

export const productsManager = new ProductsManager("Products.json");