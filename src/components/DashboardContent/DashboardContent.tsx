import "./DashboardContent.css";
import ProductsList from "../zaliczenie/ProductsList/ProductsList";
import ShoppingList from "../zaliczenie/ShopingList/ShoppingList";
import ProductsFilters from "../zaliczenie/ProductsFilters/ProductsFilters";
import React from "react";
function DashboardContent() {
  return (
    <>
      <div className="appWrapper">
        <ProductsFilters/>
        <div className="columnsWrapper">
          <ProductsList />
          <ShoppingList />
        </div>
      </div>
    </>
  );
}

export default DashboardContent;
