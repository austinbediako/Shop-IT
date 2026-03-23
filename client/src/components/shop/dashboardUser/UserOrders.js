import React, { Fragment, useEffect, useContext } from "react";
import moment from "moment";
import { fetchOrderByUser } from "./Action";
import Layout, { DashboardUserContext } from "./Layout";

const apiURL = process.env.REACT_APP_API_URL;

const TableHeader = () => {
  return (
    <thead>
      <tr className="bg-blue-50 text-blue-800 text-left text-sm uppercase tracking-wider font-bold border-b-2 border-blue-200">
        <th className="px-6 py-4 whitespace-nowrap hidden md:table-cell">Products</th>
        <th className="px-6 py-4 whitespace-nowrap">Status</th>
        <th className="px-6 py-4 whitespace-nowrap">Total</th>
        <th className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">Phone</th>
        <th className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">Address</th>
        <th className="px-6 py-4 whitespace-nowrap hidden xl:table-cell">Transaction Id</th>
        <th className="px-6 py-4 whitespace-nowrap hidden md:table-cell">Checkout</th>
        <th className="px-6 py-4 whitespace-nowrap hidden md:table-cell">Processing</th>
      </tr>
    </thead>
  );
};

const TableBody = ({ order }) => {
  return (
    <tr className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors duration-200">
      <td className="px-6 py-4 hidden md:table-cell">
        <div className="flex flex-col space-y-2">
          {order.allProduct.map((product, i) => (
            <div className="flex items-center space-x-3" key={i}>
              <img
                className="w-10 h-10 object-cover rounded-none-none border border-gray-200 shadow-sm"
                src={`${apiURL}/uploads/products/${product.id.pImages[0]}`}
                alt="product"
              />
              <span className="text-sm font-medium text-gray-800">{product.id.pName}</span>
              <span className="text-sm font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-none-none">{product.quantitiy}x</span>
            </div>
          ))}
        </div>
      </td>
      <td className="px-6 py-4 text-center">
        {order.status === "Not processed" && (
          <span className="inline-flex items-center px-3 py-1 rounded-none-none text-xs font-bold leading-5 bg-gray-100 text-gray-800 border border-gray-200">
            {order.status}
          </span>
        )}
        {order.status === "Processing" && (
          <span className="inline-flex items-center px-3 py-1 rounded-none-none text-xs font-bold leading-5 bg-yellow-100 text-yellow-800 border border-yellow-200">
            {order.status}
          </span>
        )}
        {order.status === "Shipped" && (
          <span className="inline-flex items-center px-3 py-1 rounded-none-none text-xs font-bold leading-5 bg-blue-100 text-blue-800 border border-blue-200">
            {order.status}
          </span>
        )}
        {order.status === "Delivered" && (
          <span className="inline-flex items-center px-3 py-1 rounded-none-none text-xs font-bold leading-5 bg-green-100 text-green-800 border border-green-200">
            {order.status}
          </span>
        )}
        {order.status === "Cancelled" && (
          <span className="inline-flex items-center px-3 py-1 rounded-none-none text-xs font-bold leading-5 bg-red-100 text-red-800 border border-red-200">
            {order.status}
          </span>
        )}
      </td>
      <td className="px-6 py-4 text-center font-bold text-gray-900">
        GH₵{order.amount}.00
      </td>
      <td className="px-6 py-4 text-center text-sm text-gray-600 hidden lg:table-cell">{order.phone}</td>
      <td className="px-6 py-4 text-center text-sm text-gray-600 hidden lg:table-cell truncate max-w-[150px]">{order.address}</td>
      <td className="px-6 py-4 text-center text-sm font-mono text-gray-500 hidden xl:table-cell">
        {order.transactionId}
      </td>
      <td className="px-6 py-4 text-center text-sm text-gray-600 hidden md:table-cell">
        {moment(order.createdAt).format("lll")}
      </td>
      <td className="px-6 py-4 text-center text-sm text-gray-600 hidden md:table-cell">
        {moment(order.updatedAt).format("lll")}
      </td>
    </tr>
  );
};

const OrdersComponent = () => {
  const { data, dispatch } = useContext(DashboardUserContext);
  const { OrderByUser: orders } = data;

  useEffect(() => {
    fetchOrderByUser(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data.loading) {
    return (
      <div className="w-full md:w-9/12 flex items-center justify-center py-24">
        <span className="loader"></span>
      </div>
    );
  }
  return (
    <Fragment>
      <div className="flex flex-col w-full my-4 md:my-0 md:w-9/12 md:px-8">
        <div className="shadow-sm border border-gray-200 bg-white rounded-none-none w-full mx-auto overflow-hidden">
          <div className="px-6 sm:px-10 pt-8 pb-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Order History</h2>
              <p className="text-gray-500 mt-2 font-medium">Review and track your previous purchases.</p>
            </div>
            
            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-none-none font-bold border border-blue-100 shadow-sm hidden sm:block">
              {orders && orders.length} Orders
            </div>
          </div>
          
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <TableHeader />
              <tbody className="divide-y divide-gray-100 bg-white">
                {orders && orders.length > 0 ? (
                  orders.map((item, i) => {
                    return <TableBody key={i} order={item} />;
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center font-medium py-16 text-gray-500"
                    >
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <span className="text-xl text-gray-600">No orders found</span>
                        <p className="text-sm">You haven't made any purchases yet.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const UserOrders = (props) => {
  return (
    <Fragment>
      <Layout children={<OrdersComponent />} />
    </Fragment>
  );
};

export default UserOrders;
