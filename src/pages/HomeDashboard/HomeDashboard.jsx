import React, { useEffect, useState } from "react";
import requestUtil from "../../utils/requestUtil";
import useAllData from "../../services/useAllData";
import useCategory from "../../services/useCategory";
import Card from "../../components/Cards/Card";
import Difficulty from "../../components/Difficulties/Difficulty";
import { Emoji } from "emoji-picker-react";

// Home sayfasındaki genel kapsayıcı alan.
function HomeDashboard() {
  const { allData, getAllData } = useAllData();

  return (
    <>
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
