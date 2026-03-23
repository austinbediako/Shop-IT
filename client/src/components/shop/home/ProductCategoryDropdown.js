import React, { Fragment, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { HomeContext } from "./index";
import { getAllCategory } from "../../admin/categories/FetchApi";
import { getAllProduct, productByPrice } from "../../admin/products/FetchApi";
import "./style.css";

const CategoryList = () => {
  const history = useHistory();
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let responseData = await getAllCategory();
      if (responseData && responseData.Categories) {
        setCategories(responseData.Categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!categories || categories.length === 0) return null;

  return (
    <div className="my-4">
      {/* Desktop: single-row horizontal scroll */}
      <div
        className="hidden md:flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((item, index) => (
          <div
            key={index}
            onClick={() => history.push(`/products/category/${item._id}`)}
            className="flex-shrink-0 px-6 py-2.5 border border-gray-300 hover:bg-black hover:text-white transition-all duration-200 cursor-pointer font-medium tracking-wider text-sm bg-white text-gray-800 uppercase whitespace-nowrap"
          >
            {item.cName}
          </div>
        ))}
      </div>

      {/* Mobile: 2-row grid with horizontal scroll */}
      <div
        className="md:hidden overflow-x-auto pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div
          className="grid gap-2.5"
          style={{
            gridTemplateRows: "repeat(2, auto)",
            gridAutoFlow: "column",
            gridAutoColumns: "max-content",
          }}
        >
          {categories.map((item, index) => (
            <div
              key={index}
              onClick={() => history.push(`/products/category/${item._id}`)}
              className="px-5 py-2 border border-gray-300 hover:bg-black hover:text-white transition-all duration-200 cursor-pointer font-medium tracking-wider text-xs bg-white text-gray-800 uppercase whitespace-nowrap"
            >
              {item.cName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FilterList = () => {
  const { data, dispatch } = useContext(HomeContext);
  const [range, setRange] = useState(0);

  const rangeHandle = (e) => {
    setRange(e.target.value);
    fetchData(e.target.value);
  };

  const fetchData = async (price) => {
    if (price === "all") {
      try {
        let responseData = await getAllProduct();
        if (responseData && responseData.Products) {
          dispatch({ type: "setProducts", payload: responseData.Products });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch({ type: "loading", payload: true });
      try {
        setTimeout(async () => {
          let responseData = await productByPrice(price);
          if (responseData && responseData.Products) {
            console.log(responseData.Products);
            dispatch({ type: "setProducts", payload: responseData.Products });
            dispatch({ type: "loading", payload: false });
          }
        }, 700);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const closeFilterBar = () => {
    fetchData("all");
    dispatch({ type: "filterListDropdown", payload: !data.filterListDropdown });
    setRange(0);
  };

  return (
    <div className={`${data.filterListDropdown ? "" : "hidden"} my-4`}>
      <hr />
      <div className="w-full flex flex-col">
        <div className="font-medium py-2">Filter by price</div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col space-y-2  w-2/3 lg:w-2/4">
            <label htmlFor="points" className="text-sm">
              Price (between 0 and 1000$):{" "}
              <span className="font-semibold text-black">{range}.00$</span>{" "}
            </label>
            <input
              value={range}
              className="slider"
              type="range"
              id="points"
              min="0"
              max="1000"
              step="10"
              onChange={(e) => rangeHandle(e)}
            />
          </div>
          <div onClick={(e) => closeFilterBar()} className="cursor-pointer">
            <svg
              className="w-8 h-8 text-gray-700 hover:bg-gray-200 rounded-full p-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const Search = () => {
  const { data, dispatch } = useContext(HomeContext);
  const [search, setSearch] = useState("");
  const [productArray, setPa] = useState(null);

  const searchHandle = (e) => {
    setSearch(e.target.value);
    fetchData();
    dispatch({
      type: "searchHandleInReducer",
      payload: e.target.value,
      productArray: productArray,
    });
  };

  const fetchData = async () => {
    dispatch({ type: "loading", payload: true });
    try {
      setTimeout(async () => {
        let responseData = await getAllProduct();
        if (responseData && responseData.Products) {
          setPa(responseData.Products);
          dispatch({ type: "loading", payload: false });
        }
      }, 700);
    } catch (error) {
      console.log(error);
    }
  };

  const closeSearchBar = () => {
    dispatch({ type: "searchDropdown", payload: !data.searchDropdown });
    fetchData();
    dispatch({ type: "setProducts", payload: productArray });
    setSearch("");
  };
  return (
    <div
      className={`${
        data.searchDropdown ? "block" : "hidden"
      } my-8 w-full transition-all duration-500 ease-in-out`}
    >
      <div className="flex items-center justify-between border-b border-gray-300 focus-within:border-black transition-colors duration-500 pb-3">
        <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-400 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          value={search}
          onChange={(e) => searchHandle(e)}
          className="w-full text-2xl md:text-3xl font-light text-[#1a1a1a] bg-transparent focus:outline-none placeholder-gray-300 tracking-wider uppercase"
          type="text"
          placeholder="Search products..."
        />
        <button onClick={(e) => closeSearchBar()} className="ml-4 text-gray-400 hover:text-black transition-colors focus:outline-none">
          <svg className="w-6 h-6 md:w-8 md:h-8 hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const ProductCategoryDropdown = (props) => {
  return (
    <Fragment>
      <CategoryList />
      <FilterList />
      <Search />
    </Fragment>
  );
};

export default ProductCategoryDropdown;
