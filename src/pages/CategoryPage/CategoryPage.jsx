import React, { useEffect, useState } from "react";
import useCategory from "../../services/useCategory";
import Card from "../../components/Cards/Card";
import CategoryPopUp from "../../components/PopUps/CategoryPopUp";
import useAllData from "../../services/useAllData";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import { FaPen } from "react-icons/fa";

function CategoryPage() {
  const { categories, getCategory } = useCategory(); // useCategory servisinin fonksiyonlarını çekiliyor
  const [isCategoryEdit, setIsCategoryEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const { allData } = useAllData();

  useEffect(() => {
    getCategory();
  }, []);

  // popup un içeriği yapılacak

  return (
    <>
      <CategoryPopUp
        categoryInfo={selectedCategory}
        setCategoryInfo={setSelectedCategory}
        isEdit={isCategoryEdit}
        getCategory={getCategory}
      />

      <div className="container mt-3">
        <div className="d-flex align-items-center gap-3">
          <div>
            <h1 className="display-6">Kategorilerim</h1>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-sm btn-primary px-3"
              data-bs-toggle="modal"
              data-bs-target="#pl-PopUp"
              onClick={() => {
                setIsCategoryEdit(false);
              }}
            >
              + Ekle
            </button>
          </div>
        </div>
        <hr />

        <div className="row">
          {categories?.map((category) => {
            return (
              <div key={category.id} className="col-sm-6">
                <Card
                  _onClick={() => {
                    window.location.href = `/tasks?categoryId=${category.id}`;
                  }}
                  cardTitle={
                    <div className="d-flex align-items-center gap-2">
                      {category.name}{" "}
                      {category.imageCode && (
                        <Emoji size={25} unified={`${category.imageCode}`} />
                      )}
                    </div>
                  }
                  cardContent={`Görev sayısı: ${
                    allData?.tasks.filter(
                      (item) => item.categoryId == category.id
                    ).length
                  }`}
                  className={"pl-hided"}
                  topRight={
                    <button
                      className="btn btn-sm btn-warning pl-hided d-flex gap-2 align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#pl-PopUp"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCategory(category);
                        setIsCategoryEdit(true);
                      }}
                    >
                      Düzenle <FaPen />
                    </button>
                  }
                  cardStyle={{ borderColor: category.colorHex, boxShadow: `0px 1px 5px ${category.colorHex}` }}
                >
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CategoryPage;
