import { createOrder, verifyPaystackPayment } from "./FetchApi";

export const fetchData = async (cartListProduct, dispatch) => {
  dispatch({ type: "loading", payload: true });
  try {
    let responseData = await cartListProduct();
    if (responseData && responseData.Products) {
      setTimeout(function () {
        dispatch({ type: "cartProduct", payload: responseData.Products });
        dispatch({ type: "loading", payload: false });
      }, 1000);
    } else {
      dispatch({ type: "loading", payload: false });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: "loading", payload: false });
  }
};

export const pay = async (
  data,
  dispatch,
  state,
  setState,
  totalCost,
  history,
  reference
) => {
  console.log(state);
  if (!state.address) {
    setState({ ...state, error: "Please provide your address" });
  } else if (!state.phone) {
    setState({ ...state, error: "Please provide your phone number" });
  } else {
    dispatch({ type: "loading", payload: true });
    verifyPaystackPayment(reference.reference)
      .then(async (res) => {
        if (res && res.success) {
          let orderData = {
            allProduct: JSON.parse(localStorage.getItem("cart")),
            user: JSON.parse(localStorage.getItem("jwt")).user._id,
            amount: res.transaction.amount,
            transactionId: res.transaction.id,
            address: state.address,
            phone: state.phone,
          };
          try {
            let resposeData = await createOrder(orderData);
            if (resposeData.success) {
              localStorage.setItem("cart", JSON.stringify([]));
              dispatch({ type: "cartProduct", payload: null });
              dispatch({ type: "cartTotalCost", payload: null });
              dispatch({ type: "orderSuccess", payload: true });
              setState({ error: false });
              dispatch({ type: "loading", payload: false });
              return history.push("/");
            } else if (resposeData.error) {
              console.log(resposeData.error);
              setState({ ...state, error: resposeData.error });
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          setState({ ...state, error: res?.error || "Payment verification failed" });
        }
        dispatch({ type: "loading", payload: false });
      })
      .catch((err) => {
        console.log(err);
        setState({ ...state, error: err.message });
        dispatch({ type: "loading", payload: false });
      });
  }
};
