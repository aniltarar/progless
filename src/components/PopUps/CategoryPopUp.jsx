import React, { useEffect, useState } from "react";
import PopUp from "./PopUp";
import useCategory from "../../services/useCategory";

function CategoryPopUp({ categoryInfo, setCategoryInfo, isEdit, getCategory }) {
  const { addCategory, editCategory, deleteCategory } = useCategory();
  const [categoryName, setCategoryName] = useState(categoryInfo?.name ?? "");
  const [categoryColor, setCategoryColor] = useState(
    (categoryInfo && (categoryInfo?.colorHex == "" ? "#000000" : categoryInfo?.colorHex)) ?? "#000000"
  );
  const [categoryImageId, setCategoryImageId] = useState(
    categoryInfo?.imageId ?? -1
  );

  useEffect(() => {
    setCategoryName(categoryInfo?.name ?? "")
    setCategoryColor((categoryInfo && (categoryInfo?.colorHex == "" ? "#000000" : categoryInfo?.colorHex)) ?? "#000000")
    setCategoryImageId(categoryInfo?.imageId ?? -1)
  }, [categoryInfo])

  function clearCategoryStates() {
    setCategoryName("")
    setCategoryColor("#000000")
    setCategoryImageId(-1)
    setCategoryInfo(null)
  }

  return (
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
            />
          </div>

          <label htmlFor="categoryIcon" className="col-md-3 col-form-label">
            Kategori ikonu
          </label>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              id="categoryIcon"
              value={categoryImageId}
              onChange={(e) => {
                setCategoryImageId(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-3 d-flex align-items-center justify-content-between">
        <div>
          <button
            className="btn btn-danger mx-2"
            data-bs-dismiss="modal"
            onClick={() => {
              clearCategoryStates();
            }}
          >
            Vazgeç
          </button>
          <button
            className="btn btn-success mx-2"
            data-bs-dismiss="modal"
            onClick={() => {
              if (isEdit) {
                editCategory(
                  categoryInfo.id,
                  categoryName,
                  categoryColor,
                  categoryImageId
                ).then(() => {
                  getCategory();
                })
              } else {
                addCategory(categoryName, categoryColor, categoryImageId).then(() => {
                  getCategory();
                })
              }
              clearCategoryStates()
            }}
          >
            Onayla
          </button>
        </div>

        {isEdit && (
          <div>
            <button
              className="btn btn-outline-danger mx-2"
              data-bs-dismiss="modal"
              onClick={() => {
                deleteCategory(categoryInfo.id).then(() => {
                  getCategory();
                })
                clearCategoryStates();
              }}
            >
              Sil
            </button>
          </div>
        )}
      </div>
    </PopUp>
  );
}

export default CategoryPopUp;
