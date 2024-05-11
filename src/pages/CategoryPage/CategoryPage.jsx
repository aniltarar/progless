import React, { useEffect, useState } from "react";
import useCategory from "../../services/useCategory";
import Card from "../../components/Cards/Card";
import PopUp from "../../components/PopUps/PopUp";

function CategoryPage() {
  const { getCategory, addCategory, editCategory, deleteCategory } =
    useCategory(); // useCategory servisinin fonksiyonlarını çekiliyor
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategory().then((data) => {
      setCategories(data);
    });
  }, []);

  // popup un içeriği yapılacak

  return (
    <>
      <PopUp>deneme</PopUp>
      <div className="container mt-3">
        <button type="button" className="btn btn-sm btn-primary px-3" data-bs-toggle="modal" data-bs-target="#pl-PopUp">+ Ekle</button>

        <div className="row">
          {categories?.map((category) => {
            return (
              <div key={category.id} className="col-sm-6">
                <Card
                  cardTitle={category.name}
                  cardContent={"Card Content"}
                  className={"pl-hided"}
                  topRight={
                    <button className="btn btn-sm btn-warning pl-hided">
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
