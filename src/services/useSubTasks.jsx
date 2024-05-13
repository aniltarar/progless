import React, { useState } from "react";
import requestUtil from "../utils/requestUtil";

function useSubTasks() {
  const userId = JSON.parse(localStorage.getItem("user")).id;
  const baseUrlFunction = (categoryId, taskId) =>
    `/users/${userId}/categories/${categoryId}/tasks/${taskId}/subtasks`;
  const [subTasks, setSubTasks] = useState([]);

  const getSubTasks = async (categoryId, taskId) => {
    let subTaskData = (await requestUtil().get(baseUrlFunction(categoryId, taskId)))
      .data;
    setSubTasks(subTaskData);
    return subTaskData;
  };

  const addSubTasks = async (categoryId, taskId, name) => {
    let subTaskData = (
      await requestUtil().post(baseUrlFunction(categoryId, taskId), { taskId: taskId, categoryId: categoryId, name: name })
    ).data;
    getSubTasks(categoryId, taskId);
    return subTaskData;
  };

  const editSubTasks = async (categoryId, taskId, subTaskId, name) => {
    let subTaskData = (
      await requestUtil().patch(`${baseUrlFunction(categoryId, taskId)}/${subTaskId}`, { name: name })
    ).data;
    getSubTasks(categoryId, taskId);
    return subTaskData;
  };

  const deleteSubTasks = async (categoryId, taskId, subTaskId) => {
    let subTaskData = (
      await requestUtil().delete(`${baseUrlFunction(categoryId, taskId)}/${subTaskId}`)
    ).data;
    getSubTasks(categoryId, taskId);
    return subTaskData;
  };

  return { subTasks, getSubTasks, addSubTasks, editSubTasks, deleteSubTasks };
}

export default useSubTasks;
