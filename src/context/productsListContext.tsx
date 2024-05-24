import React, {createContext, ReactNode, useState} from "react";
import axios from "axios";
import {API_URLS} from "../consts/api-url";
import {FiltersTypeEnum} from "../../enums/filter-type";
import {IProduct} from "../interfaces/i-product";

const ProductsListContext: React.Context<any> = createContext(null);

const ProductsListProvider = ({ children }: {children:ReactNode}) => {
  const [productsList, setProductsList] = useState<IProduct[] | null>(null);
  const [isProductsListLoading, setIsProductsListLoading] = useState<boolean>(false)
const [initialProductsList, setInitialProductsList] = useState<IProduct[]>([])
    const [activeFilters,setActiveFilters] = useState<any>({[FiltersTypeEnum.NAME]:[],[FiltersTypeEnum.CATEGORY]:[],[FiltersTypeEnum.IS_FOOD]:[]})
    const [productCategories, setProductCategories] = useState<string[]>([]);
  async function loadProductsList(): Promise<void>  {

    try {
        setIsProductsListLoading(true)
        const response = await axios.get(API_URLS.GET_PRODUCTS_LIST__GET);
        setIsProductsListLoading(false)
        const list: IProduct[] = response.data
        const isListNotEmpty: boolean = (list || []).length > 0
        if(isListNotEmpty) {
            setInitialProductsList(list)
          setProductsList(list)
            setProductCategories([...new Set(list.map((item: IProduct) => item.category))])
        }
      }
      catch (e) {
        console.log(e)
        setIsProductsListLoading(false)
      }
  }
    function filterProductsList(
        event: { target: { value: string; checked?: boolean } },
        type: FiltersTypeEnum,
    ): void {
      switch(type) {
          case FiltersTypeEnum.CATEGORY:
            const filteredProductsByCategory: IProduct[] = [...initialProductsList].filter((product:IProduct) => {
                return product.category === event.target.value;
            })
              setActiveFilters((prev: any) => {
                  concatAllFilters({...prev,[FiltersTypeEnum.CATEGORY]:filteredProductsByCategory})
                  return {...prev,[FiltersTypeEnum.CATEGORY]:filteredProductsByCategory}
              })
            break;
          case FiltersTypeEnum.NAME:
              const filteredProductsByName: IProduct[] = [...initialProductsList].filter((product:IProduct) => {
                  return product.name.toLowerCase().includes(event.target.value.toLowerCase());
              })
              console.log(filteredProductsByName)
              setActiveFilters((prev: any) => {
                  concatAllFilters({...prev,[FiltersTypeEnum.NAME]:filteredProductsByName})
                  return {...prev,[FiltersTypeEnum.NAME]:filteredProductsByName}
              })

              break;
          case FiltersTypeEnum.IS_FOOD:
              const filteredProductsByIsFood: IProduct[] = [...initialProductsList].filter((product:IProduct) => {
                  return product.isFood === event.target.checked
              })
              setActiveFilters((prev: any) => {
                  concatAllFilters({...prev,[FiltersTypeEnum.IS_FOOD]:filteredProductsByIsFood})
                  return {...prev,[FiltersTypeEnum.IS_FOOD]:filteredProductsByIsFood}
              })
              break;
          default:
              break;
      }
    }
    function concatAllFilters(filters: any): void {
      const notEmptyFilters: IProduct[][] = [];

        filters[FiltersTypeEnum.NAME].length > 0 && notEmptyFilters.push(filters[FiltersTypeEnum.NAME]);
        filters[FiltersTypeEnum.CATEGORY].length > 0 && notEmptyFilters.push(filters[FiltersTypeEnum.CATEGORY]);
        filters[FiltersTypeEnum.IS_FOOD].length > 0 && notEmptyFilters.push(filters[FiltersTypeEnum.IS_FOOD]);
        const common: IProduct[] = commonElementsOfArray(notEmptyFilters)
        setProductsList([...common]);
    }
    function commonElementsOfArray([...arrays]:IProduct[][]): IProduct[] {
        const size = arrays.length;
        const map = new Map();

        arrays.forEach(arr => {
            arr.forEach(entry => {
                if (!map.has(entry)) {
                    map.set(entry, 1);
                } else {
                    let timesSeen = map.get(entry);
                    map.set(entry, ++timesSeen);
                }
            });
        });

        const commonElements:IProduct[] = [];
        map.forEach((count, key) => {
            if (count === size) {
                commonElements.push(key);
            }
        });

        return commonElements;
    }

      function resetProductFilters(): void {
          setProductsList(initialProductsList ? [...initialProductsList] : [])
      }

  return (
    <ProductsListContext.Provider value={{
        productsList,
        isProductsListLoading,
        loadProductsList,
        filterProductsList,
        productCategories,
        resetProductFilters
    }}>
      {children}
    </ProductsListContext.Provider>
  );
};

export { ProductsListContext, ProductsListProvider };
