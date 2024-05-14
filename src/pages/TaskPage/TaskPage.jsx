import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useAllData from "../../services/useAllData";
import Card from "../../components/Cards/Card";
import { Emoji } from "emoji-picker-react";
import { FaPen } from "react-icons/fa";
import Difficulty from "../../components/Difficulties/Difficulty";
import TaskEditPopUp from "../../components/PopUps/TaskEditPopUp";
import useTask from "../../services/useTask";
import TaskDetailPopUp from "../../components/PopUps/TaskDetailPopUp";
import { Modal } from "react-bootstrap";

function TaskPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get("categoryId");
  const { allData, getAllData } = useAllData();
  const [tasks, setTasks] = useState();
  const [isTaskEdit, setIsTaskEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState();
  const [selectedTaskCategory, setSelectedTaskCategory] = useState();
  const [showTaskHelper, setShowTaskHelper] = useState(false);
  const [showProcessHelper, setShowProcessHelper] = useState(false);

  const handleCloseTaskHelper = () => setShowTaskHelper(false);
  const handleShowTaskHelper = () => setShowTaskHelper(true);
  const handleCloseProcessHelper = () => setShowProcessHelper(false);
  const handleShowProcessHelper = () => setShowProcessHelper(true);

  useEffect(() => {
    if (!allData) return;
    if (categoryId)
      setTasks(allData.tasks.filter((item) => item.categoryId == categoryId));
    else setTasks(allData.tasks);

    if (allData?.tasks.length == 0) handleShowTaskHelper();
    if (allData?.tasks.length == 1) handleShowProcessHelper();
  }, [allData]);

  return (
    <>
      <Modal
        centered={true}
        show={showTaskHelper}
        onHide={handleCloseTaskHelper}
      >
        <Modal.Body>
          <div>
            <h4 className="text-center">
              Görevler sayfasına hoşgeldiniz.
            </h4>
            <hr />
            <p>
              Sıradaki işlem oluşturduğunuz kategorilere yeni görevler eklemek.
            </p>
            <p>
              Görev eklemek için{" "}
              <span className="btn btn-sm btn-primary disabled">+ Ekle</span>{" "}
              butonuna tıklayın.
            </p>
            <div className="d-flex">
              <button
                onClick={handleCloseTaskHelper}
                className="btn mx-auto btn-primary "
              >
                Anladım
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        centered={true}
        show={showProcessHelper}
        onHide={handleCloseProcessHelper}
      >
        <Modal.Body>
          <div>
            <h4 className="text-center">
              Tebrikler, ilk görevinizi eklediniz.
            </h4>
            <hr />
            <p>
              Yaptığınız işlemleri görmek için <a className="text-decoration-none" href="/dashboard">Süreç Takibi</a> sayfasına gidebilirsiniz.
            </p>
            <div className="d-flex">
              <button
                onClick={handleCloseProcessHelper}
                className="btn mx-auto btn-primary "
              >
                Anladım
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <TaskEditPopUp
        taskInfo={selectedTask}
        isEdit={isTaskEdit}
        categoryId={categoryId}
        getAllData={getAllData}
      />

      <TaskDetailPopUp
        taskInfo={selectedTask}
        categoryInfo={selectedTaskCategory}
      />

      <div className="container">
        <div className="d-flex align-items-center gap-3">
          <div>
            <h1 className="display-6">Görevlerim</h1>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-sm btn-primary px-3 pl-block-mode"
              data-bs-toggle="modal"
              data-bs-target="#pl-PopUp"
              onClick={() => {
                setIsTaskEdit(false);
              }}
            >
              + Ekle
            </button>
          </div>
        </div>
        <hr />

        <div className="row">
          {tasks?.map((item, i) => {
            return (
              <div key={i} className="col-lg-6">
                <Card
                  cardTitle={
                    <div className="d-flex align-items-center">
                      {item.name} ~{" "}
                      {
                        allData.categories.filter(
                          (categoryItem) => categoryItem.id == item.categoryId
                        )[0].name
                      }
                      &nbsp;
                      <Emoji
                        size={25}
                        unified={
                          allData.categories.filter(
                            (categoryItem) => categoryItem.id == item.categoryId
                          )[0].imageCode
                        }
                      />{" "}
                    </div>
                  }
                  cardContent={
                    <>
                      <Difficulty difficultyRate={item.difficulty ?? 1} />{" "}
                      {item.endOfDate}
                    </>
                  }
                  topRight={
                    <button
                      className="btn btn-warning pl-hided d-flex gap-2 align-items-center pl-block-mode"
                      data-bs-toggle="modal"
                      data-bs-target="#pl-PopUp"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTask(item);
                        setIsTaskEdit(true);
                      }}
                    >
                      Düzenle <FaPen />
                    </button>
                  }
                  bottomRight={
                    <>
                      <button
                        className="btn btn-primary mt-1 pl-block-mode"
                        data-bs-toggle="modal"
                        data-bs-target="#pl-taskDetail"
                        onClick={() => {
                          setSelectedTask(item);
                          setSelectedTaskCategory(
                            allData.categories.filter(
                              (categoryItem) =>
                                categoryItem.id == item.categoryId
                            )[0]
                          );
                        }}
                      >
                        Yapılacaklar
                      </button>
                    </>
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

export default TaskPage;
