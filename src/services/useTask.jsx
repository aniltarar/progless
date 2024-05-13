import React, { useEffect, useState } from "react";
import requestUtil from "../utils/requestUtil";

function useTask() {
  const [tasks, setTasks] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user")).id;
  const baseUrl = (categoryId) => `/users/${userId}/categories/${categoryId}/tasks`;

  const getTasks = async (categoryId) => {
    let _taskData = (await requestUtil().get(`${baseUrl(categoryId)}`)).data;
    _taskData.sort((a, b) => a.id - b.id);
    setTasks(_taskData);
    return _taskData;
  };

  const addTask = async (categoryId, name, description, difficulty, endOfDate) => {
    let _taskData = (
      await requestUtil().post(`${baseUrl(categoryId)}`, {
        name: name,
        description: description,
        difficulty: difficulty,
        endOfDate: endOfDate,
      })
    ).data;
    await getTasks(categoryId);
    return _taskData;
  };

  const editTask = async (categoryId, taskId, name, description, difficulty, endOfDate) => {
    let _taskData = (await requestUtil().patch(`${baseUrl(categoryId)}/${taskId}`, { name: name, description: description, difficulty: difficulty, endOfDate: endOfDate })).data;
    await getTasks(categoryId)
    return _taskData
  };

  const deleteTask = async (categoryId, taskId) => {
    let _taskData = (await requestUtil().delete(`${baseUrl(categoryId)}/${taskId}`)).data;
    await getTasks(categoryId)
    return _taskData
  };

  return { tasks, getTasks, addTask, editTask, deleteTask }
}

export default useTask;
