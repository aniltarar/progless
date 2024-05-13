import React, { useEffect, useState } from "react";
import PopUp from "./PopUp";
import useAllData from "../../services/useAllData";
import useSubTasks from "../../services/useSubTasks";

function TaskDetailPopUp({ taskInfo, categoryInfo }) {
  const { allData, getAllData } = useAllData();
  const [subTasks, setSubTasks] = useState();
  const { editSubTasks } = useSubTasks();

  const getProgressName = (progressRate) => {
    let name = "";
    switch (progressRate) {
      case "LATER":
        name = "Beklemede";
        break;
      case "IN_PROGRESS":
        name = "Yapılıyor";
        break;
      case "SUCCESS":
        name = "Tamamlandı";
        break;
      default:
        name = "Başarısız";
    }
    return name;
  };

  const getProgressColor = (progressRate) => {
    let color = "";
    switch (progressRate) {
      case "LATER":
        color = "yellow";
        break;
      case "IN_PROGRESS":
        color = "orange";
        break;
      case "SUCCESS":
        color = "green";
        break;
      default:
        color = "red";
    }
    return color;
  };

  const getNextProcess = (subTask) => {
    let nextProcess = "";
    switch (subTask.state) {
      case "LATER":
        nextProcess = "IN_PROGRESS";
        break;
      case "IN_PROGRESS":
        nextProcess = "SUCCESS";
        break;
      default:
        nextProcess = subTask.state;
        break;
    }
    subTask = { ...subTask, state: nextProcess };
    return subTask;
  };

  useEffect(() => {
    getAllData();
  }, [taskInfo]);

  useEffect(() => {
    setSubTasks(
      allData?.subtasks.filter((item) => item.taskId == taskInfo?.id)
    );
  }, [allData, taskInfo]);

  return (
    <>
      <PopUp popUpId={"pl-taskDetail"}>
        <b>
          {taskInfo?.name} - {categoryInfo?.name}
        </b>
        <ul className="list-group list-group-flush">
          {subTasks
            ?.sort((a, b) => a.id - b.id)
            .map((item, i) => {
              return (
                <li
                  className="list-group-item d-flex justify-content-between"
                  key={i}
                >
                  <div>{item.name} </div>
                  <div>
                    <button
                      className="btn btn-sm btn-primary border-0 pl-block-mode"
                      style={{ width: '7rem', backgroundColor: getProgressColor(item.state) }}
                      onClick={() => {
                        let newSubTask = getNextProcess(item);
                        editSubTasks(
                          item.categoryId,
                          item.taskId,
                          item.id,
                          item.name,
                          newSubTask.state
                        ).then(() => getAllData());
                      }}
                    >
                      {getProgressName(item.state)}
                    </button>
                  </div>
                </li>
              );
            })}
        </ul>
        <div className="mt-3">
          <button className="btn btn-danger pl-block-mode" data-bs-dismiss="modal">
            Kapat
          </button>
        </div>
      </PopUp>
    </>
  );
}

export default TaskDetailPopUp;
