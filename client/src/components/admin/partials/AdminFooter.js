import React, { Fragment } from "react";
import moment from "moment";

const AdminFooter = (props) => {
  return (
    <Fragment>
      <footer className="z-10 py-4 px-4 md:px-12 text-center text-xs text-gray-400 font-light tracking-wider uppercase bg-gray-50">
        © {moment().format("YYYY")} Shop-IT Administration
      </footer>
    </Fragment>
  );
};

export default AdminFooter;
