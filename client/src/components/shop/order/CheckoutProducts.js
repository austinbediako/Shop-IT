import React, { Fragment, useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { LayoutContext } from "../layout";
import { subTotal, quantity, totalCost } from "../partials/Mixins";

import { cartListProduct } from "../partials/FetchApi";
import { fetchData, pay } from "./Action";

import { usePaystackPayment } from "react-paystack";

const apiURL = process.env.REACT_APP_API_URL;

export const CheckoutComponent = (props) => {
  const history = useHistory();
  const { data, dispatch } = useContext(LayoutContext);

  const [state, setState] = useState({
    address: "",
    phone: "",
    error: false,
    success: false,
  });

  useEffect(() => {
    fetchData(cartListProduct, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const jwtStr = localStorage.getItem("jwt");
  const parsedJwt = jwtStr ? JSON.parse(jwtStr) : null;
  const email = parsedJwt?.user?.email || "customer@example.com";

  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    // Paystack requires an integer amount > 0. Float precision or 0 will crash it!
    amount: Math.round(totalCost() * 100) || 10000, 
    currency: "GHS",
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || "pk_test_placeholder_key",
  };

  const onSuccess = (reference) => {
    pay(data, dispatch, state, setState, totalCost, history, reference);
  };

  const onClose = () => {
    console.log("closed paystack popup");
    setState({ ...state, error: "Payment cancelled by user" });
  };

  const initializePayment = usePaystackPayment(config);

  const handlePayClick = () => {
    if (!state.address) {
      setState({ ...state, error: "Please provide your address" });
    } else if (!state.phone) {
      setState({ ...state, error: "Please provide your phone number" });
    } else {
      setState({ ...state, error: false });
      try {
        console.log("Paystack config:", config);
        // Explicitly ensuring onSuccess and onClose are functions.
        initializePayment({ onSuccess: onSuccess, onClose: onClose });
      } catch (err) {
        console.log("Paystack Error:", err);
        alert("Paystack Init Error: " + JSON.stringify(err));
      }
    }
  };

  if (data.loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loader"></span>
        Please wait untill finish
      </div>
    );
  }
  return (
    <Fragment>
      <section className="mx-4 mt-20 md:mx-12 md:mt-32 lg:mt-24">
        <div className="text-2xl mx-2">Order</div>
        <div className="flex flex-col md:flex md:space-x-2 md:flex-row">
          <div className="md:w-1/2">
            <CheckoutProducts products={data.cartProduct} />
          </div>
          <div className="w-full order-first md:order-last md:w-1/2">
            <Fragment>
              <div
                onBlur={(e) => setState({ ...state, error: false })}
                className="p-4 md:p-8"
              >
                {state.error ? (
                  <div className="bg-red-200 py-2 px-4 rounded">
                    {state.error}
                  </div>
                ) : (
                  ""
                )}
                <div className="flex flex-col py-2">
                  <label htmlFor="address" className="pb-2">
                    Delivery Address
                  </label>
                  <input
                    value={state.address}
                    onChange={(e) =>
                      setState({
                        ...state,
                        address: e.target.value,
                        error: false,
                      })
                    }
                    type="text"
                    id="address"
                    className="border px-4 py-2"
                    placeholder="Address..."
                  />
                </div>
                <div className="flex flex-col py-2 mb-2">
                  <label htmlFor="phone" className="pb-2">
                    Phone
                  </label>
                  <input
                    value={state.phone}
                    onChange={(e) =>
                      setState({
                        ...state,
                        phone: e.target.value,
                        error: false,
                      })
                    }
                    type="number"
                    id="phone"
                    className="border px-4 py-2"
                    placeholder="+880"
                  />
                </div>
                
                <div
                  onClick={(e) => handlePayClick()}
                  className="w-full px-4 py-3 bg-black hover:bg-gray-800 transition-colors text-center text-white font-semibold cursor-pointer uppercase tracking-wide"
                >
                  Pay now
                </div>
              </div>
            </Fragment>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const CheckoutProducts = ({ products }) => {
  const history = useHistory();

  return (
    <Fragment>
      <div className="grid grid-cols-2 md:grid-cols-1">
        {products !== null && products.length > 0 ? (
          products.map((product, index) => {
            return (
              <div
                key={index}
                className="col-span-1 m-2 md:py-6 md:border-t md:border-b md:my-2 md:mx-0 md:flex md:items-center md:justify-between"
              >
                <div className="md:flex md:items-center md:space-x-4">
                  <img
                    onClick={(e) => history.push(`/products/${product._id}`)}
                    className="cursor-pointer md:h-20 md:w-20 object-cover object-center"
                    src={`${apiURL}/uploads/products/${product.pImages[0]}`}
                    alt="wishListproduct"
                  />
                  <div className="text-lg md:ml-6 truncate">
                    {product.pName}
                  </div>
                  <div className="md:ml-6 font-semibold text-gray-600 text-sm">
                    Price : GH₵{product.pPrice}.00{" "}
                  </div>
                  <div className="md:ml-6 font-semibold text-gray-600 text-sm">
                    Quantity : {quantity(product._id)}
                  </div>
                  <div className="font-semibold text-gray-600 text-sm">
                    Subtotal : GH₵{subTotal(product._id, product.pPrice)}.00
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>No product found for checkout</div>
        )}
      </div>
    </Fragment>
  );
};

export default CheckoutProducts;
