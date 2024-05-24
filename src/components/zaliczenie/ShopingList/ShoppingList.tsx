import "../commonStyles.css";
import CircularIndeterminate from "../../Loader/Loader";
import {IProduct} from "../../../interfaces/i-product";
import React, {useContext, useEffect} from "react";
import {ShoppingListContext} from "../../../context/shoppingListContext";

const ShoppingList = () => {
    const {shoppingList, isShoppingListLoading, loadShoppingList, deleteProductFromShoppingList} = useContext(ShoppingListContext);

    useEffect((): void => {
        loadShoppingList();
    },[])
  return (
    <div className="App">
      <header className="AppHeader">
        <p>Shoping List</p>
          {isShoppingListLoading ?
              <CircularIndeterminate />:
              <ul>
                  {(shoppingList || []).map((product:IProduct) => (
                      <li key={product.id} onClick={() => deleteProductFromShoppingList(product.id)}>{product.name}</li>
                  ))}
              </ul>
          }
          {
              !isShoppingListLoading && !shoppingList && <div>List is empty</div>
          }
      </header>
    </div>
  );
};
export default ShoppingList;
