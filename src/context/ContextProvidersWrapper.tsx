import {ShoppingListProvider} from "./shoppingListContext";
import {ProductsListProvider} from "./productsListContext";
import {ReactNode} from "react";
import React from "react";
import {AuthProvider} from "./authContext";

const ContextProvidersWrapper = ({ children }:{children: ReactNode}) => {

  return (
      <AuthProvider>
      <ShoppingListProvider>
    <ProductsListProvider>
      {children}
    </ProductsListProvider>
      </ShoppingListProvider>
      </AuthProvider>
  );
};

export { ContextProvidersWrapper };
