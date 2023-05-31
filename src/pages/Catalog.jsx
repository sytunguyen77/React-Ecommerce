import React, { useCallback, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import Helmet from "../components/Helmet";
import CheckBox from "../components/CheckBox";

import productData from "../assets/fake-data/products";
import category from "../assets/fake-data/category";
import colors from "../assets/fake-data/product-color";
import size from "../assets/fake-data/product-size";
import Button from "../components/Button";
import InfinityList from "../components/InfinityList";

const Catalog = () => {
   // Get history to manipulate URL
   const location = useLocation();
   const searchParams = queryString.parse(location.search);
   const searchQuery = searchParams.search || "";

   // ================================
   // INITIAL STATES
   // ================================
   const initFilter = {
      category: [],
      color: [],
      size: [],
   };

   const [filter, setFilter] = useState(initFilter);

   const [productList, setProductList] = useState(productData.getAllProducts());

   const [products, setProducts] = useState(productList);

   useEffect(() => {
      let allProducts = productData.getAllProducts();

      if (searchQuery.length > 0) {
         allProducts = allProducts.filter((e) => e.title.toLowerCase().includes(searchQuery.toLowerCase()));
      }

      setProductList(allProducts);
      setProducts(allProducts);
   }, [searchQuery]);

   // ================================
   // FILTER SELECT FUNCTION
   // ================================
   const filterSelect = (type, checked, item) => {
      if (checked) {
         switch (type) {
            case "CATEGORY":
               setFilter({ ...filter, category: [...filter.category, item.categorySlug] });
               break;
            case "COLOR":
               setFilter({ ...filter, color: [...filter.color, item.color] });
               break;
            case "SIZE":
               setFilter({ ...filter, size: [...filter.size, item.size] });
               break;
            default:
         }
      } else {
         switch (type) {
            case "CATEGORY":
               const newCategory = filter.category.filter((e) => e !== item.categorySlug);
               setFilter({ ...filter, category: newCategory });
               break;
            case "COLOR":
               const newColor = filter.color.filter((e) => e !== item.color);
               setFilter({ ...filter, color: newColor });
               break;
            case "SIZE":
               const newSize = filter.size.filter((e) => e !== item.size);
               setFilter({ ...filter, size: newSize });
               break;
            default:
         }
      }
   };

   // ================================
   // CLEAR FILTER FUNCTION
   // ================================
   const clearFilter = () => {
      setFilter(initFilter);
   };

   // ================================
   // UPDATING PRODUCTS FUNCTION
   // ================================
   const updateProducts = useCallback(() => {
      let temp = productList;

      if (filter.category.length > 0) {
         temp = temp.filter((e) => filter.category.includes(e.categorySlug));
      }

      if (filter.color.length > 0) {
         temp = temp.filter((e) => {
            const check = e.colors.find((color) => filter.color.includes(color));
            return check !== undefined;
         });
      }

      if (filter.size.length > 0) {
         temp = temp.filter((e) => {
            const check = e.size.find((size) => filter.size.includes(size));
            return check !== undefined;
         });
      }

      setProducts(temp);
   }, [filter, productList]);

   useEffect(() => {
      updateProducts();
   }, [updateProducts, productList]);

   const filterRef = useRef(null);

   // ================================
   // TOGGLE FILTER VISIBILITY FUNCTION
   // ================================
   const showHideFilter = () => filterRef.current.classList.toggle("active");

   // ================================
   // RENDER
   // ================================
   return (
      <Helmet title="Product">
         <div className="catalog">
            {/* Filter section */}
            <div className="catalog__filter" ref={filterRef}>
               {/* Close filter button */}
               <div className="catalog__filter__close" onClick={() => showHideFilter()}>
                  <div className="bx bx-left-arrow-alt"></div>
               </div>

               {/* Category filter section */}
               <div className="catalog__filter__widget">
                  <div className="catalog__filter__widget__title">Category</div>
                  <div className="catalog__filter__widget__content">
                     {/* Mapping over category data to generate checkboxes */}
                     {category.map((item, index) => (
                        <div className="catalog__filter__widget__content__item" key={index}>
                           <CheckBox
                              label={item.display}
                              onChange={(input) => filterSelect("CATEGORY", input.checked, item)}
                              checked={filter.category.includes(item.categorySlug)}
                           />
                        </div>
                     ))}
                  </div>
               </div>

               {/* Color filter section */}
               <div className="catalog__filter__widget">
                  <div className="catalog__filter__widget__title">Colors</div>
                  <div className="catalog__filter__widget__content">
                     {/* Mapping over color data to generate checkboxes */}
                     {colors.map((item, index) => (
                        <div className="catalog__filter__widget__content__item" key={index}>
                           <CheckBox
                              label={item.display}
                              onChange={(input) => filterSelect("COLOR", input.checked, item)}
                              checked={filter.color.includes(item.color)}
                           />
                        </div>
                     ))}
                  </div>
               </div>

               {/* Size filter section */}
               <div className="catalog__filter__widget">
                  <div className="catalog__filter__widget__title">Size</div>
                  <div className="catalog__filter__widget__content">
                     {/* Mapping over size data to generate checkboxes */}
                     {size.map((item, index) => (
                        <div className="catalog__filter__widget__content__item" key={index}>
                           <CheckBox
                              label={item.display}
                              onChange={(input) => filterSelect("SIZE", input.checked, item)}
                              checked={filter.size.includes(item.size)}
                           />
                        </div>
                     ))}
                  </div>
               </div>

               {/* Button to clear all filters */}
               <div className="catalog__filter__widget">
                  <div className="catalog__filter__widget__content">
                     <Button size="sm" onClick={clearFilter}>
                        Clear Filters
                     </Button>
                  </div>
               </div>
            </div>

            {/* Button to toggle filter visibility */}
            <div className="catalog__filter__toggle">
               <Button size="sm" onClick={() => showHideFilter()}>
                  Show Filters
               </Button>
            </div>

            {/* Content area to display the products */}
            <div className="catalog__content">
               <InfinityList data={products} />
            </div>
         </div>
      </Helmet>
   );
};

export default Catalog;
