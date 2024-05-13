import React, { useEffect, useState } from "react";
import requestUtil from "../utils/requestUtil";
import useSubTasks from "./useSubTasks";

function useTask() {
  const { subTasks, getSubTasks, addSubTasks, deleteSubTasks } = useSubTasks();

  const [tasks, setTasks] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user")).id;
  const baseUrl = (categoryId) => `/users/${userId}/categories/${categoryId}/tasks`;

  const getTasks = async (categoryId) => {
    let _taskData = (await requestUtil().get(`${baseUrl(categoryId)}`)).data;
    _taskData.sort((a, b) => a.id - b.id);
    setTasks(_taskData);
    return _taskData;
  };

  const addTask = async (categoryId, name, description, difficulty, endOfDate, subTasks = []) => {
    let _taskData = (
      await requestUtil().post(`${baseUrl(categoryId)}`, {
        name: name,
        description: description,
        difficulty: difficulty,
        endOfDate: endOfDate,
      })
    ).data;
    for (let i = 0; i < subTasks.length; i++) {
      await addSubTasks(categoryId, _taskData.id, subTasks[i]);
    }
    await getTasks(categoryId);
    return _taskData;
  };

  const editTask = async (categoryId, taskId, name, description, difficulty, endOfDate, _subTasks = []) => {
    let _taskData = (await requestUtil().patch(`${baseUrl(categoryId)}/${taskId}`, { name: name, description: description, difficulty: difficulty, endOfDate: endOfDate })).data;
    let subTaskOld = await getSubTasks(categoryId, taskId);

    let deletedSubTasks = subTaskOld.filter(subTaskItem => !_subTasks.includes(subTaskItem.name));
    for (let i = 0; i < deletedSubTasks.length; i++) {
      await deleteSubTasks(categoryId, taskId, deletedSubTasks[i].id)
    }
    let instertedSubTasks = _subTasks.filter(subTaskItem => !subTaskOld.map(item => item.name).includes(subTaskItem));
    for (let i = 0; i < instertedSubTasks.length; i++) {
      await addSubTasks(categoryId, taskId, instertedSubTasks[i])
    }

    await getTasks(categoryId)
    return _taskData
  };

  const deleteTask = async (categoryId, taskId, subTasks = []) => {
    let _taskData = (await requestUtil().delete(`${baseUrl(categoryId)}/${taskId}`)).data;
    await getTasks(categoryId)
    return _taskData
  };

  return { tasks, getTasks, addTask, editTask, deleteTask }
}

export default useTask;
