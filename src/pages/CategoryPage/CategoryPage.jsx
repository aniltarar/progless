import React, { useEffect, useState } from "react";
import useCategory from "../../services/useCategory";
import Card from "../../components/Cards/Card";
import PopUp from "../../components/PopUps/PopUp";
import CategoryPopUp from "../../components/PopUps/CategoryPopUp";

function CategoryPage() {
  const { categories, getCategory } = useCategory(); // useCategory servisinin fonksiyonlarını çekiliyor
  const [isCategoryEdit, setIsCategoryEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState()

  useEffect(() => {
    getCategory();
  }, []);

  // popup un içeriği yapılacak

  return (
    <>
      <CategoryPopUp categoryInfo={selectedCategory} setCategoryInfo={setSelectedCategory} isEdit={isCategoryEdit} getCategory={getCategory} />

      <div className="container mt-3">
        <button
          type="button"
          className="btn btn-sm btn-primary px-3"
          data-bs-toggle="modal"
          data-bs-target="#pl-PopUp"
          onClick={() => {
            setIsCategoryEdit(false)
          }}
        >
          + Ekle
        </button>

        <div className="row">
          {categories?.map((category) => {
            return (
              <div key={category.id} className="col-sm-6">
                <Card
                  cardTitle={category.name}
                  cardContent={"Card Content"}
                  className={"pl-hided"}
                  topRight={
                    <button
                      className="btn btn-sm btn-warning pl-hided"
                      data-bs-toggle="modal"
                      data-bs-target="#pl-PopUp"
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsCategoryEdit(true);
                      }}
                    >
                      düzenle
                    </button>
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CategoryPage;
