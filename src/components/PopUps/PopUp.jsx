import React, { Children, useState } from "react";
import { Outlet } from "react-router-dom";

function PopUp({ popUpId, children }) {
  return (
    <>
      <div
        className="modal fade"
        id={popUpId ?? 'pl-PopUp'}
        data-bs-keyboard="false"
        data-bs-backdrop="static"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "50%" }}>
          <div className="modal-content">
            <div className="modal-body p-5">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PopUp;
