import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useAllData from "../../services/useAllData";
import Card from "../../components/Cards/Card";
import { Emoji } from "emoji-picker-react";
import { FaPen } from "react-icons/fa";
import Difficulty from "../../components/Difficulties/Difficulty";
import TaskPopUp from "../../components/PopUps/TaskPopUp";
import useTask from "../../services/useTask";

function TaskPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get("categoryId");
  const { allData, getAllData } = useAllData();
  const [tasks, setTasks] = useState();
  const [isTaskEdit, setIsTaskEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState();
  const { getTasks } = useTask();

  useEffect(() => {
    if (!allData) return;
    if (categoryId)
      setTasks(allData.tasks.filter((item) => item.categoryId == categoryId));
    else setTasks(allData.tasks);
  }, [allData]);

  return (
    <>
      <TaskPopUp
        taskInfo={selectedTask}
        isEdit={isTaskEdit}
        categoryId={categoryId}
        getAllData={getAllData}
      />

      <div className="container pt-3">
        <div className="d-flex align-items-center gap-3">
          <div>
            <h1 className="display-6">Görevlerim</h1>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-sm btn-primary px-3"
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
              <div key={i} className="col-md-6">
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
                    <Difficulty difficultyRate={item.difficulty ?? 1} />
                  }
                  topRight={
                    <button
                      className="btn btn-sm btn-warning pl-hided d-flex gap-2 align-items-center"
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
                  bottomRight={item.endOfDate}
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
