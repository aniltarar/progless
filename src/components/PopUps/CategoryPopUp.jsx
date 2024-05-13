import React, { useEffect, useState } from "react";
import PopUp from "./PopUp";
import useCategory from "../../services/useCategory";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import ConfirmPopUp from "./ConfirmPopUp";

function CategoryPopUp({ categoryInfo, setCategoryInfo, isEdit, getCategory }) {
  const { addCategory, editCategory, deleteCategory } = useCategory();
  const [categoryName, setCategoryName] = useState(categoryInfo?.name ?? "");
  const [categoryColor, setCategoryColor] = useState(
    (categoryInfo &&
      (categoryInfo?.colorHex == "" ? "#000000" : categoryInfo?.colorHex)) ??
      "#000000"
  );
  const [categoryImageCode, setCategoryImageCode] = useState(
    categoryInfo?.imageCode ?? null
  );
  const [pickerVisible, setPickerVisible] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState(null);

  useEffect(() => {
    setCategoryName(categoryInfo?.name ?? "");
    setCategoryColor(
      (categoryInfo &&
        (categoryInfo?.colorHex == "" ? "#000000" : categoryInfo?.colorHex)) ??
        "#000000"
    );
    setCategoryImageCode(categoryInfo?.imageCode ?? null);
  }, [categoryInfo]);

  function clearCategoryStates() {
    setCategoryName("");
    setCategoryColor("#000000");
    setCategoryImageCode(null);
    setCategoryInfo(null);
    setCurrentEmoji(null);
    setPickerVisible(false);
  }

  return (
    <>
      <ConfirmPopUp
        onSuccess={() => {
          deleteCategory(categoryInfo.id).then(() => {
            getCategory();
          });
          clearCategoryStates();
        }}
      >
        <b>{categoryInfo?.name}</b> adlı kategoriyi silmek istediğinizden emin misiniz?
      </ConfirmPopUp>

      <PopUp>
        <div>
          <div className="row mb-3">
            <label htmlFor="categoryName" className="col-sm-3 col-form-label">
              Kategori adı
            </label>
            <div className="col-sm-9">
              <input
                type="email"
                className="form-control"
                id="categoryName"
                value={categoryName}
                onChange={(e) => {
                  setCategoryName(e.target.value);
                }}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="categoryColor" className="col-md-3 col-form-label">
              Kategori rengi
            </label>
            <div className="col-md-3">
              <input
                type="color"
                className="form-control-color w-100 border border-none rounded"
                id="categoryColor"
                value={categoryColor}
                onChange={(e) => {
                  setCategoryColor(e.target.value);
                }}
                required
              />
            </div>

            <label htmlFor="categoryIcon" className="col-md-3 col-form-label">
              Kategori ikonu
            </label>
            <div className="col-md-3">
              <button
                className={`pl-block-mode btn ${currentEmoji == null ? "btn-warning" : ""}`}
                onClick={() => {
                  setPickerVisible(!pickerVisible);
                }}
              >
                {(currentEmoji && <Emoji unified={currentEmoji.unified} />) ??
                  "Emoji Seciniz"}
              </button>
            </div>

            <div className="col-12">
              <EmojiPicker
                className="w-100"
                height={"400px"}
                previewPosition="none"
                onEmojiClick={(e) => {
                  setCurrentEmoji(e);
                  setCategoryImageCode(e.unified);
                }}
                open={pickerVisible}
              />
            </div>
          </div>
        </div>
        <div className="mt-3 d-flex align-items-center justify-content-between">
          <div>
            <button
              className="btn btn-danger mx-2 pl-block-mode"
              data-bs-dismiss="modal"
              onClick={() => {
                clearCategoryStates();
              }}
            >
              Vazgeç
            </button>
            <button
              className="btn btn-success mx-2 pl-block-mode"
              data-bs-dismiss="modal"
              onClick={() => {
                if (isEdit) {
                  editCategory(
                    categoryInfo.id,
                    categoryName,
                    categoryColor,
                    categoryImageCode
                  ).then(() => {
                    getCategory();
                  });
                } else {
                  addCategory(
                    categoryName,
                    categoryColor,
                    categoryImageCode
                  ).then(() => {
                    getCategory();
                  });
                }
                clearCategoryStates();
              }}
            >
              Onayla
            </button>
          </div>

          {isEdit && (
            <div>
              <button
                className="btn btn-outline-danger mx-2 pl-block-mode"
                data-bs-dismiss="modal"
                data-bs-toggle="modal"
                data-bs-target="#pl-confirmPopUp"
              >
                Sil
              </button>
            </div>
          )}
        </div>
      </PopUp>
    </>
  );
}

export default CategoryPopUp;
