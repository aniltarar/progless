import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useAllData from "../../services/useAllData";
import Card from "../../components/Cards/Card";
import { Emoji } from "emoji-picker-react";
import { FaPen } from "react-icons/fa";
import Difficulty from "../../components/Difficulties/Difficulty";

function TaskPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get("categoryId");
  const { allData } = useAllData();
  const [tasks, setTasks] = useState();

  useEffect(() => {
    if (!allData) return;
    if (categoryId)
      setTasks(allData.tasks.filter((item) => item.categoryId == categoryId));
    else setTasks(allData.tasks);
  }, [allData]);

  return (
    <div className="container pt-3">
      <button
        type="button"
        className="btn btn-sm btn-primary px-3"
        data-bs-toggle="modal"
        data-bs-target="#pl-PopUp"
        onClick={() => {
        }}
      >
        + Ekle
      </button>
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
                    onClick={(e) => {}}
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
  );
}

export default TaskPage;
