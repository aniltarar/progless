import React from "react";
import useAllData from "../../services/useAllData";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { axisClasses, barElementClasses, useDrawingArea } from "@mui/x-charts";
import { styled } from "@mui/material";
import PlPieChart from "./PlPieChart";

function DashboardPage() {
  const { allData, getAllData } = useAllData();

  const ChartCard = ({ title, children, isBlock = false, style }) => {
    return (
      <div
        className={`card m-3 ${isBlock ? "pl-block-mode" : ""}`}
        style={style}
      >
        <div className="card-body">
          <h5 className="card-title text-center">{title}</h5>
          {children}
        </div>
      </div>
    );
  };

  const getTaskPercent = (categoryId, taskId, state) => {
    let allSubTasks = allData?.subtasks.filter(subTaskItem => subTaskItem.categoryId == categoryId && subTaskItem.taskId == taskId) ?? [];
    let value = parseInt((allSubTasks.filter(subTaskItem => subTaskItem.state == state).length / allSubTasks.length)*100);
    console.log(allSubTasks);
    console.log(value);
    return value
  };

  return (
    <>
      <div className="container">
        <div className="m-3 p-3 border border-1 rounded border-white">
          <ChartCard
            title={"Tüm Kategoriler"}
            isBlock={true}
            style={{
              ...( localStorage.getItem("theme") == 'dark'  ? { backgroundColor: "#cdcdcd" } : {}),
              ...{ paddingLeft: "25%", paddingRight: "25%" },
            }}
          >
            <PlPieChart
              data={
                allData?.categories.map((categoryItem) => ({
                  id: categoryItem.id,
                  value: allData.tasks.filter(
                    (taskItem) => taskItem.categoryId == categoryItem.id
                  ).length,
                  label: categoryItem.name,
                })) ?? []
              }
            />
          </ChartCard>
        </div>

        <ChartCard title={"Kategoriler"}>
          <div className="row">
            {allData?.categories.map((categoryItem, i) => {
              return (
                <div
                  key={categoryItem.id}
                  className="col-xl-6 pl-category-card"
                >
                  <ChartCard
                    title={categoryItem.name}
                    isBlock={true}
                    style={
                      localStorage.getItem("theme") == "dark"
                        ? { backgroundColor: "#cdcdcd" }
                        : {}
                    }
                  >
                    {
                      <PlPieChart
                        data={allData.tasks
                          .filter(
                            (taskItem) => taskItem.categoryId == categoryItem.id
                          )
                          .map((taskItem) => ({
                            id: taskItem.id,
                            value: allData.subtasks.filter(
                              (subTaskItem) =>
                                subTaskItem.categoryId == categoryItem.id &&
                                subTaskItem.taskId == taskItem.id
                            ).length,
                            label: taskItem.name,
                          }))}
                      />
                    }
                  </ChartCard>
                </div>
              );
            })}
          </div>
        </ChartCard>

        <ChartCard title={"Görev İlerlemeleri"}>
            <div className="row">
            {
                allData?.categories.map(categoryItem => {
                    return (
                        <div key={categoryItem.id} className="col-xl-6">
                            <ChartCard title={categoryItem.name}>
                            {
                                allData.tasks.filter(taskItem => taskItem.categoryId == categoryItem.id).map(taskItem => {
                                    return (
                                        <ChartCard key={taskItem.id} title={taskItem.name} isBlock={true}
                                            style={
                                            localStorage.getItem("theme") == "dark"
                                                ? { backgroundColor: "#cdcdcd" }
                                                : {}
                                            }>
                                                <div className="" style={{ backgroundColor: '#cdcdcd' }}>
                                                    <div className="text-center" style={{ borderTopRightRadius: ".5rem", borderBottomRightRadius: '.5rem',width: `${getTaskPercent(categoryItem.id, taskItem.id, 'SUCCESS')}%`, backgroundColor: 'hsl(210, 35%, 9%)', color: 'white' }}>{getTaskPercent(categoryItem.id, taskItem.id, 'SUCCESS')}%</div>
                                                </div>
                                        </ChartCard>
                                    );
                                })
                            }
                            </ChartCard>
                        </div>
                    );
                })
            }
            </div>
        </ChartCard>
      </div>
    </>
  );
}

export default DashboardPage;
