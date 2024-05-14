import React, { useEffect, useState } from "react";
import requestUtil from "../../utils/requestUtil";
import useAllData from "../../services/useAllData";
import useCategory from "../../services/useCategory";
import Card from "../../components/Cards/Card";
import Difficulty from "../../components/Difficulties/Difficulty";
import { Emoji } from "emoji-picker-react";
import { Modal } from "react-bootstrap";
import {
  FaHandHoldingHeart,
  FaHandMiddleFinger,
  FaHands,
  FaHeart,
} from "react-icons/fa";

// Home sayfasındaki genel kapsayıcı alan.
function HomeDashboard() {
  const { allData, getAllData } = useAllData();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (allData?.categories.length == 0) handleShow();
  }, [allData]);

  return (
    <>
      <Modal centered={true} show={show} onHide={handleClose}>
        <Modal.Body>
          <div>
            <h4 className="text-center">
              Progless Uygulamasına Hoşgeldiniz. <FaHeart color="red" />
            </h4>
            <hr />
            <p >
              Şu anda Ana sayfayı ziyaret etmektesiniz. Bu sayfa üzerinde mevcut
              olan kategorilerinizi ve görevlerinizi görebilirsiniz. Üzerlerine
              tıklayıp ilgili görev veya kategoriye direkt olarak
              gidebilirsiniz.
            </p>
            <p>
              Kategori sayfasına gitmek için aşağıdaki butona
              tıklayın.
            </p>
            <div className="d-flex">
              <a href="/categories" className="btn mx-auto btn-primary ">
                Kategori Sayfasına Git
              </a>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className="container">
        <div className="row">
          <div className="col-sm-8">
            <div className="display-6 text-center">Görevler</div>
            {allData?.tasks
              .sort((a, b) => Date.parse(a.endOfDate) - Date.parse(b.endOfDate))
              .map((element) => {
                return (
                  <Card
                    key={element.id}
                    cardTitle={element.name}
                    cardContent={
                      allData.categories.filter(
                        (item) => item.id == element.categoryId
                      )[0].name
                    }
                    topRight={
                      <Difficulty difficultyRate={element?.difficulty ?? 1} />
                    }
                    bottomRight={element.endOfDate}
                  />
                );
              })}
          </div>
          <div className="col-sm-4">
            <div className="display-6 text-center">Kategoriler</div>
            {allData?.categories.map((element) => {
              return (
                <Card
                  _onClick={() => {
                    window.location.href = `/tasks?categoryId=${element.id}`;
                  }}
                  key={element.id}
                  cardTitle={element.name}
                  cardContent={`Görev sayısı: ${
                    allData.tasks.filter(
                      (item) => item.categoryId == element.id
                    ).length
                  }`}
                  topRight={<Emoji unified={element.imageCode} />}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeDashboard;
