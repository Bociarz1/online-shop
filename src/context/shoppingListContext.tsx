import React, {createContext, ReactNode, useState} from "react";
import axios from "axios";
import {API_URLS} from "../consts/api-url";
import {IProduct} from "../interfaces/i-product";

const ShoppingListContext: React.Context<any> = createContext(null);

const ShoppingListProvider = ({ children }: {children:ReactNode}) => {
  const [shoppingList, setShoppingList] = useState<IProduct[] | null>(null);
  const [isShoppingListLoading, setIsShoppingListLoading] = useState<boolean>(false)

  async function loadShoppingList(): Promise<void> {
      try {
        setIsShoppingListLoading(true)
        const response = await axios.get(API_URLS.GET_SHOPPING_LIST__GET);
        setIsShoppingListLoading(false)
        const list = response.data
        const isListNotEmpty: boolean = (list || []).length > 0
        if(isListNotEmpty) {
          setShoppingList(list)
        }
      }
      catch (e) {
        console.log(e)
        setIsShoppingListLoading(false)
        setShoppingList(null);
      }
  }
  async function addProductToShoppingList(product:IProduct): Promise<void> {
    try {
      setIsShoppingListLoading(true)
      const response = await axios.post(API_URLS.ADD_PRODUCT_TO_SHOPPING_LIST__POST,product);
      setIsShoppingListLoading(false)
      if(response) {
        loadShoppingList()
      }
    }
    catch (e) {
      console.log(e)
    }
  }
  async function deleteProductFromShoppingList(productId:string): Promise<void> {
    try {
      setIsShoppingListLoading(true)
      const response = await axios.delete(API_URLS.DELETE_PRODUCT_FROM_SHOPPING_LIST__DELETE(productId));
      setIsShoppingListLoading(false)
      if(response) {
        loadShoppingList()
      }
    }
    catch (e) {
      console.log(e)
    }
  }

  return (
    <ShoppingListContext.Provider value={{
      shoppingList,
      isShoppingListLoading,
      loadShoppingList,
      addProductToShoppingList,
      deleteProductFromShoppingList
    }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export { ShoppingListContext, ShoppingListProvider };
