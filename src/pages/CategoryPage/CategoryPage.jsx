import React, { useEffect, useState } from "react";
import useCategory from "../../services/useCategory";
import Card from "../../components/Cards/Card";
import CategoryPopUp from "../../components/PopUps/CategoryPopUp";
import useAllData from "../../services/useAllData";
import { Emoji } from "emoji-picker-react";
import {  FaPen } from "react-icons/fa";
import { Modal } from "react-bootstrap";

function CategoryPage() {
  const { categories, getCategory } = useCategory(); // useCategory servisinin fonksiyonlarını çekiliyor
  const { allData } = useAllData(); // Tüm dataları çeker
  const [isCategoryEdit, setIsCategoryEdit] = useState(false); // Kategori Edit PopUp ' ını kontrol eden state.
  const [selectedCategory, setSelectedCategory] = useState(); // Seçilen Kategorinin Bilgilerini tutan state.
  const [showCategoryHelper, setShowCategoryHelper] = useState(false); // Wizard'ı çalıştırdığımız kısım.
  const [showTaskHelper, setShowTaskHelper] = useState(false); // Wizard'ı çalıştırdığımız ikinci kısım

  //Wizard PopUp Fonksiyonları
  const handleCloseCategoryHelper = () => setShowCategoryHelper(false);
  const handleShowCategoryHelper = () => setShowCategoryHelper(true);
  const handleCloseTaskHelper = () => setShowTaskHelper(false);
  const handleShowTaskHelper = () => setShowTaskHelper(true);

  //Sayfada renderlanacak kısımlar ve hangi koşulda renderlanacağı
  useEffect(() => {
    if (categories?.length == 0) handleShowCategoryHelper();
    else if (categories?.length >= 1 && allData?.tasks.length == 0) handleShowTaskHelper();
  }, [allData, categories]);

  //Sayfa ilk açıldığında getCategory çalıştır.
  useEffect(() => {
    getCategory();
  }, []);


  return (
    <>
      <Modal centered={true} show={showCategoryHelper} onHide={handleCloseCategoryHelper}>
        <Modal.Body>
          <div>
            <h4 className="text-center">
              Kategori Sayfasına Hoşgeldiniz.
            </h4>
            <hr />
            <p>
              Şu anda Kategori sayfasını ziyaret etmektesiniz. Bu sayfa üzerinde
              mevcut olan kategorilerinizi görüntüleyebilir, yeni kategori ekleyebilir ve mevcut kategorilerinizi
              düzenleyebilirsiniz. Üzerlerine tıklayıp ilgili kategorinin görevlerine direkt olarak gidebilirsiniz.
            </p>
            <p>
              Kategori eklemek için <span className="btn btn-sm btn-primary disabled">+ Ekle</span> butonuna tıklayın.
            </p>
            <div className="d-flex">
              <button onClick={handleCloseCategoryHelper} className="btn mx-auto btn-primary ">
                Anladım
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal centered={true} show={showTaskHelper} onHide={handleCloseTaskHelper}>
        <Modal.Body>
          <div>
            <h4 className="text-center">
              Tebrikler, ilk kategorinizi eklediniz.
            </h4>
            <hr />
            <p>
              Sıradaki işlem oluşturduğunuz kategorilere yeni görevler eklemek.
            </p>
            <div className="d-flex">
              <a href="/tasks" className="btn mx-auto btn-primary ">
                Görevler Sayfasına Git
              </a>
            </div>
          </div>
        </Modal.Body>
      </Modal>

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
                  cardStyle={{
                    borderColor: category.colorHex,
                    boxShadow: `0px 1px 5px ${category.colorHex}`,
                  }}
                ></Card>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CategoryPage;
