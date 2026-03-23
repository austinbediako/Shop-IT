import React, { Fragment, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LayoutContext } from "../index";
import { cartListProduct } from "./FetchApi";
import { isAuthenticate } from "../auth/fetchApi";
import { cartList } from "../productDetails/Mixins";
import { subTotal, quantity, totalCost } from "./Mixins";

const apiURL = process.env.REACT_APP_API_URL;

const CartModal = () => {
  const history = useHistory();

  const { data, dispatch } = useContext(LayoutContext);
  const products = data.cartProduct;

  const cartModalOpen = () =>
    dispatch({ type: "cartModalToggle", payload: !data.cartModal });

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      let responseData = await cartListProduct();
      if (responseData && responseData.Products) {
        dispatch({ type: "cartProduct", payload: responseData.Products });
        dispatch({ type: "cartTotalCost", payload: totalCost() });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartProduct = (id) => {
    let cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    if (cart.length !== 0) {
      cart = cart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(cart));
      fetchData();
      dispatch({ type: "inCart", payload: cartList() });
      dispatch({ type: "cartTotalCost", payload: totalCost() });
    }
    if (cart.length === 0) {
      dispatch({ type: "cartProduct", payload: null });
      fetchData();
      dispatch({ type: "inCart", payload: cartList() });
    }
  };

  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        className={`${
          !data.cartModal ? "hidden" : ""
        } fixed top-0 z-30 w-full h-full bg-black opacity-50`}
      />
      {/* Cart Modal Start */}
      <section
        className={`${
          !data.cartModal ? "hidden" : ""
        } fixed z-40 inset-0 flex items-start justify-end`}
      >
        <div className="w-full md:w-5/12 lg:w-4/12 h-full flex flex-col justify-between bg-white shadow-2xl">
          <div className="overflow-y-auto">
            <div className="border-b border-gray-200 flex justify-between items-center">
              <div className="p-4 text-gray-900 text-xl font-bold tracking-wider uppercase">Cart</div>
              {/* Cart Modal Close Button */}
              <div className="p-4 text-gray-500 hover:text-gray-900 transition-colors">
                <svg
                  onClick={(e) => cartModalOpen()}
                  className="w-6 h-6 cursor-pointer"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="m-4 flex-col">
              {products &&
                products.length !== 0 &&
                products.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      {/* Cart Product Start */}
                      <div className="text-gray-900 flex space-x-4 my-6 items-center border-b border-gray-100 pb-4">
                        <img
                          className="w-20 h-20 object-cover object-center border border-gray-100 rounded"
                          src={`${apiURL}/uploads/products/${item.pImages[0]}`}
                          alt="cartProduct"
                        />
                        <div className="relative w-full flex flex-col">
                          <div className="my-1 font-semibold text-gray-800">{item.pName}</div>
                          <div className="flex flex-col space-y-1 mt-1">
                            <div className="flex items-center space-x-2">
                              <div className="text-sm text-gray-500">
                                Quantity:
                              </div>
                              <div className="flex items-end">
                                <span className="text-sm font-bold text-gray-900">
                                  {quantity(item._id)}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-500">
                                Subtotal:
                              </span>{" "}
                              <span className="text-sm font-bold text-gray-900">
                                GH₵{subTotal(item._id, item.pPrice)}.00
                              </span>
                            </div>
                          </div>
                          {/* Cart Product Remove Button */}
                          <div
                            onClick={(e) => removeCartProduct(item._id)}
                            className="absolute top-0 right-0 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <svg
                              className="w-5 h-5 cursor-pointer"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      {/* Cart Product Start */}
                    </Fragment>
                  );
                })}

              {products === null && (
                <div className="mx-6 my-10 flex flex-col items-center justify-center text-center py-16 bg-white border border-gray-100 relative overflow-hidden group">
                  {/* Subtle background decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full translate-x-1/2 -translate-y-1/2 opacity-50 transition-transform duration-700 group-hover:scale-110"></div>
                  
                  <div className="relative mb-8 mt-4">
                    <div className="absolute inset-0 bg-gray-100 transform rotate-6 rounded-none scale-125 transition-transform duration-500 group-hover:rotate-12"></div>
                    <div className="absolute inset-0 bg-gray-50 transform -rotate-3 rounded-none scale-110 transition-transform duration-500 group-hover:-rotate-6"></div>
                    
                    <div className="relative bg-white p-6 border border-gray-200 shadow-sm z-10 transition-transform duration-300 hover:scale-105">
                      <svg className="w-14 h-14 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M9 13v2m6-2v2" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="w-10 h-0.5 bg-black mb-6 transition-all duration-300 group-hover:w-16"></div>
                  
                  <h3 className="text-xl font-bold tracking-widest uppercase text-gray-900 mb-3 z-10">Cart is Empty</h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-[250px] font-light z-10">
                    Discover our exquisite collections and find something extraordinary to add.
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="m-4 space-y-4">
            <div
              onClick={(e) => cartModalOpen()}
              className="cursor-pointer px-4 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-800 transition-colors text-center rounded-none font-medium tracking-wide"
            >
              Continue shopping
            </div>
            {data.cartTotalCost ? (
              <Fragment>
                {isAuthenticate() ? (
                  <div
                    className="px-4 py-3 bg-black hover:bg-gray-800 transition-colors text-white text-center cursor-pointer rounded-none font-semibold uppercase tracking-wide"
                    onClick={(e) => {
                      history.push("/checkout");
                      cartModalOpen();
                    }}
                  >
                    Checkout GH₵{data.cartTotalCost}.00
                  </div>
                ) : (
                  <div
                    className="px-4 py-3 bg-black hover:bg-gray-800 transition-colors text-white text-center cursor-pointer rounded-none font-semibold uppercase tracking-wide"
                    onClick={(e) => {
                      history.push("/");
                      cartModalOpen();
                      dispatch({
                        type: "loginSignupError",
                        payload: !data.loginSignupError,
                      });
                      dispatch({
                        type: "loginSignupModalToggle",
                        payload: !data.loginSignupModal,
                      });
                    }}
                  >
                    Checkout GH₵{data.cartTotalCost}.00
                  </div>
                )}
              </Fragment>
            ) : (
               <div className="px-4 py-3 bg-gray-200 text-gray-400 text-center cursor-not-allowed rounded-none font-semibold uppercase tracking-wide">
                Checkout
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Cart Modal End */}
    </Fragment>
  );
};

export default CartModal;
