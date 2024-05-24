import "../commonStyles.css";
import {useContext, useState} from "react";
import {ProductsListContext} from "../../../context/productsListContext";
import React from "react";
import {FiltersTypeEnum} from "../../../../enums/filter-type";

export default function ProductsFilters() {
  const {filterProductsList,productCategories,resetProductFilters} = useContext(ProductsListContext);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedName, setSelectedName] = useState<string>('');
    const [selectedIsFood, setSelectedIsFood] = useState<boolean>(false);
  function categoryChange(event:any) {
        setSelectedCategory(event.target.value);
      filterProductsList(event, FiltersTypeEnum.CATEGORY)
  }
    function nameChange(event:any) {
        setSelectedName(event.target.value);
        filterProductsList(event, FiltersTypeEnum.NAME)
    }
    function isFoodChange(event:any) {
        setSelectedIsFood(event.target.value);
        filterProductsList(event, FiltersTypeEnum.IS_FOOD)
    }
  function handleResetFiltersBtnClick(): void {
    resetProductFilters();
    setSelectedCategory('')
      setSelectedName('')
      setSelectedIsFood(false);
  }
  return (
      <>
        <div className="Wrapper">Products Filters</div>
        <div>
          <h1>Filters</h1>

          <div>
            <label>Search by name: </label>
            <input
                type="text"
                onChange={(event) =>
                    nameChange(event)
                }
            />
          </div>

          <div>
            <label>Search by category: </label>
            <select
                value={selectedCategory}
                onChange={(event) =>
                    categoryChange(event)
                }>
              <option disabled={true} value="">
                Choose category
              </option>
              {productCategories.map((category: string, index: number) => {
                return (
                    <option key={index} value={category}>
                      {category}
                    </option>
                );
              })}
            </select>
          </div>

          <div>
            <label>Food only</label>
            <input
                type="checkbox"
                onChange={(event) =>
                    isFoodChange(event)
                }
            />
          </div>

          <button onClick={() => handleResetFiltersBtnClick()}>
            Reset Filters
          </button>
        </div>
      </>
  )
}


