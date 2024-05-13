import React, { useEffect, useState } from "react";
import PopUp from "./PopUp";
import useTask from "../../services/useTask";
import useCategory from "../../services/useCategory";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import "./PopUp.css";
import useSubTasks from "../../services/useSubTasks";

function TaskEditPopUp({ taskInfo, isEdit, getAllData }) {
  // api servislerinin import edilmesi
  const { addTask, editTask, deleteTask } = useTask();
  const { categories, getCategory } = useCategory();
  const { subTasks, getSubTasks, addSubTasks, editSubTasks, deleteSubTasks } =
    useSubTasks();

  // form verileri
  const [taskName, setTaskName] = useState(taskInfo?.name ?? "");
  const [taskDescription, setTaskDescription] = useState(
    taskInfo?.description ?? ""
  );
  const [taskEndOfDate, setTaskEndOfDate] = useState(
    taskInfo?.endOfDate ?? dateParse(new Date())
  );
  const [difficultyRange, setDifficultyRange] = useState(
    taskInfo?.difficulty ?? 1
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    taskInfo?.categoryId ?? categories[0]?.id ?? -1
  );
  const [taskSubTasks, setTaskSubTasks] = useState([]);

  useEffect(() => {
    setTaskName(taskInfo?.name ?? "");
    setTaskDescription(taskInfo?.description ?? "");
    setTaskEndOfDate(taskInfo?.endOfDate ?? dateParse(new Date()));
    setDifficultyRange(taskInfo?.difficulty ?? 1);

    if (taskInfo)
      getSubTasks(taskInfo.categoryId, taskInfo.id).then((result) => {
        setTaskSubTasks(result.map(item => item.name));
      });
    else setTaskSubTasks([]);

    getCategory().then(res => {
      setSelectedCategoryId(taskInfo?.categoryId ?? res[0].id);
    })
  }, [taskInfo]);

  function dateParse(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  const getDifficulty = (difficultyRange) => {
    let difficulty = "";
    switch (difficultyRange) {
      case 1:
        difficulty = "Çok Kolay";
        break;
      case 2:
        difficulty = "Kolay";
        break;
      case 3:
        difficulty = "Orta";
        break;
      case 4:
        difficulty = "Zor";
        break;
      case 5:
        difficulty = "Çok Zor";
        break;
      default:
        difficulty = "Aralık dışı";
    }
    return difficulty;
  };

  const addDate = (_day, _month, _year) => {
    let date = new Date();
    // Gün, Ay, Yıl değerlerini alma
    const year = date.getFullYear();
    const month = date.getMonth(); // getMonth() 0'dan başlar, bu yüzden +1 ekliyoruz
    const day = date.getDate();

    // Gün, Ay, Yıl değerlerini arttırma
    const newYear = year + _year;
    const newMonth = month + _month;
    const newDay = day + _day;

    // Yeni tarihi oluşturma
    const newDate = new Date(newYear, newMonth, newDay); // getMonth() 0'dan başladığı için -1 çıkarıyoruz

    // Yeni tarihi 'yyyy-MM-dd' formatına çevirme
    const newFormattedDate = `${newDate.getFullYear()}-${String(
      newDate.getMonth() + 1
    ).padStart(2, "0")}-${String(newDate.getDate()).padStart(2, "0")}`;

    return newFormattedDate;
  };

  function clearTaskInputs() {
    setTaskName("");
    setTaskDescription("");
    setTaskEndOfDate(dateParse(new Date()));
    setDifficultyRange(1);
    setTaskSubTasks([]);
  }

  return (
    <>
      <PopUp>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div>
            <div className="row mb-3">
              <label htmlFor="taskName" className="col-sm-3 col-form-label">
                Görev Adı
              </label>
              <div className="col-sm-9">
                <input
                  type="email"
                  className="form-control"
                  id="taskName"
                  value={taskName}
                  onChange={(e) => {
                    setTaskName(e.target.value);
                  }}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="taskDescription"
                className="col-sm-3 col-form-label"
              >
                Görev Açıklaması
              </label>
              <div className="col-sm-9">
                <input
                  type="email"
                  className="form-control"
                  id="taskDescription"
                  value={taskDescription}
                  onChange={(e) => {
                    setTaskDescription(e.target.value);
                  }}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="taskDifficultyRange"
                className="col-sm-3 col-form-label"
              >
                Görev Zorluğu
              </label>
              <div className="col-sm-9 d-flex align-items-center">
                <input
                  type="range"
                  id="taskDifficultyRange"
                  min={1}
                  max={5}
                  className="form-control me-2 pl-task-range"
                  onChange={(e) => {
                    setDifficultyRange(parseInt(e.target.value));
                  }}
                  value={difficultyRange}
                  required
                />
                <span className="text-center" style={{ width: "100px" }}>
                  {getDifficulty(difficultyRange)}
                </span>
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="subTasks" className="col-sm-3 col-form-label">
                Alt Görevler
              </label>
              <div className="col-sm-9 d-flex align-items-center">
                <TagsInput
                  id={`subTasks`}
                  className="form-control me-2"
                  onChange={(tags) => {
                    setTaskSubTasks(tags);
                  }}
                  value={taskSubTasks}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="selectTaskCategory"
                className="col-sm-3 col-form-label"
              >
                Kategori
              </label>
              <div className="col-sm-9 d-flex align-items-center">
                <select
                  id="selectTaskCategory"
                  className="form-select"
                  aria-label="Default select example"
                  value={selectedCategoryId}
                  onChange={(e) => {
                    setSelectedCategoryId(e.target.value);
                  }}
                >
                  {categories?.map((category) => {
                    return (
                      <option key={category.id} value={`${category.id}`}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="taskDate" className="col-sm-3 col-form-label">
                Bitiş Tarihi
              </label>
              <div className="col-sm-9">
                <div className="row">
                  <div className="col-4">
                    <input
                      type="date"
                      id="taskDate"
                      min={dateParse(new Date())}
                      className="form-control"
                      onChange={(e) => {
                        setTaskEndOfDate(dateParse(new Date(e.target.value)));
                      }}
                      value={taskEndOfDate}
                      required
                    />
                  </div>
                  <div className="col-2">
                    <input
                      type="button"
                      value="1 Gün"
                      className="form-control"
                      onClick={() => {
                        setTaskEndOfDate(addDate(1, 0, 0));
                      }}
                    />
                  </div>
                  <div className="col-2">
                    <input
                      type="button"
                      value="1 Hafta"
                      className="form-control"
                      onClick={() => {
                        setTaskEndOfDate(addDate(7, 0, 0));
                      }}
                    />
                  </div>
                  <div className="col-2">
                    <input
                      type="button"
                      value="1 Ay"
                      className="form-control"
                      onClick={() => {
                        setTaskEndOfDate(addDate(0, 1, 0));
                      }}
                    />
                  </div>
                  <div className="col-2">
                    <input
                      type="button"
                      value="1 Yıl"
                      className="form-control"
                      onClick={() => {
                        setTaskEndOfDate(addDate(0, 0, 1));
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 d-flex align-items-center justify-content-between">
            <div>
              <button
                className="btn btn-danger mx-2 pl-block-mode"
                data-bs-dismiss="modal"
                onClick={() => {
                  clearTaskInputs();
                }}
              >
                Vazgeç
              </button>
              <button
                type="submit"
                className="btn btn-success mx-2 pl-block-mode"
                data-bs-dismiss="modal"
                onClick={() => {
                  if (isEdit) {
                    editTask(
                      selectedCategoryId,
                      taskInfo.id,
                      taskName,
                      taskDescription,
                      difficultyRange,
                      taskEndOfDate,
                      taskSubTasks
                    ).then(() => {
                      getAllData();
                    });
                  } else {
                    addTask(
                      selectedCategoryId,
                      taskName,
                      taskDescription,
                      difficultyRange,
                      taskEndOfDate,
                      taskSubTasks
                    ).then(() => {
                      getAllData();
                    });
                  }
                  clearTaskInputs();
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
                  onClick={() => {
                    deleteTask(selectedCategoryId, taskInfo.id).then(() => {
                      getAllData();
                    });
                  }}
                >
                  Görevi Sil
                </button>
              </div>
            )}
          </div>
        </form>
      </PopUp>
    </>
  );
}

export default TaskEditPopUp;
