import "../commonStyles.css";
import {useContext} from "react";
import {IProduct} from "../../../interfaces/i-product";
import {ProductsListContext} from "../../../context/productsListContext"
import CircularIndeterminate from "../../Loader/Loader";
import {ShoppingListContext} from "../../../context/shoppingListContext";
import React from "react";
const ProductsList = () => {
    const {productsList, isProductsListLoading, loadProductsList} = useContext(ProductsListContext);
    const { addProductToShoppingList } = useContext(ShoppingListContext);
  return (
    <div className="App">
      <header className="AppHeader">
        <p>Products list</p>
          <button onClick={()=> loadProductsList()}>Load Products List</button>
          {isProductsListLoading ?
              <CircularIndeterminate />:
          <ul>
          {(productsList || []).map((product:IProduct) => (
              <li key={product.id} onClick={() => addProductToShoppingList(product)}>{product.name}</li>
          ))}
          </ul>
          }
          {
              !isProductsListLoading && !productsList && <div>List is empty</div>
          }
      </header>
    </div>
  );
};

export default ProductsList;
