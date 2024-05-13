import React from "react";
import PopUp from "./PopUp";

function ConfirmPopUp({ onSuccess, children }) {
  return (
    <PopUp popUpId={"pl-confirmPopUp"}>
      {children}
      <div className="d-flex gap-2 mt-3">
      <button
          className="btn btn-danger pl-block-mode"
          data-bs-dismiss="modal"
        >
          İptal
        </button>
        <button
          className="btn btn-primary pl-block-mode"
          data-bs-dismiss="modal"
          onClick={onSuccess}
        >
          Onayla
        </button>
      </div>
    </PopUp>
  );
}

export default ConfirmPopUp;
