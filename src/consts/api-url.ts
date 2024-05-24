import {BASE_URL} from "../environment/environments";

export const API_URLS = {
    GET_PRODUCTS_LIST__GET: BASE_URL+'productsList',
    GET_SHOPPING_LIST__GET: BASE_URL+'shoppingList',
    ADD_PRODUCT_TO_SHOPPING_LIST__POST: BASE_URL+'shoppingList',
    DELETE_PRODUCT_FROM_SHOPPING_LIST__DELETE: (productId) => BASE_URL+`shoppingList/${productId}`,
}