import { Injectable } from "@nestjs/common";
import { CreateApiDto } from "./dto/create-api.dto";
import { products } from "./products.consts";

@Injectable()
export class ApiService {
  instanceProducts = products;
  instanceShopping = [];

  findAllProductsWith3SecDelay() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          this.instanceProducts.map((product) => ({
            id: product.id,
            name: product.name,
            category: product.category,
            isFood: product.isFood,
          }))
        );
      }, 3000);
    });
  }

  findAllShoppingWith3SecDelay() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          this.instanceShopping.map((product) => ({
            id: product.id,
            name: product.name,
            category: product.category,
            isFood: product.isFood,
          }))
        );
      }, 3000);
    });
  }

  addToShoppingList(shoppingListElement: CreateApiDto) {
    const newShoppingPosition = {
      id: (this.instanceShopping.length + 1).toString(),
      ...shoppingListElement,
    };
    this.instanceShopping.push(newShoppingPosition);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(newShoppingPosition);
      }, 3000);
    });
  }

  removeFromShoppingList(id: string) {
    const removedShoppingElement = this.instanceShopping.find(
      (shoppingEl) => shoppingEl.id === id
    );

    this.instanceShopping = this.instanceShopping.filter(
      (shoppingEl) => shoppingEl.id !== id
    );

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(removedShoppingElement);
      }, 3000);
    });
  }
}
