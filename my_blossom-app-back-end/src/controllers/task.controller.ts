import { Request, Response } from "express";
import Task from "../models/task-modal";
import { ITask } from "../types";
import { AuthRequest } from "../middleware";

export const getAllTasks = async (request: AuthRequest, response: Response) => {
  try {
    const { userId } = request.body;

    const tasks = await Task.find({
      user: userId,
    });
    return response.send(tasks);
  } catch (error) {
    console.log("error in getAllTasks", error);
    response.send({ error: "Something went wrong" });
    throw error;
  }
};

export const getAllTasksByCategoryId = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const userId = request.user;
    const { categoryId } = request.body;

    const tasks = await Task.find({
      user: userId,
      category: categoryId,
    });
    return response.send(tasks);
  } catch (error) {
    console.log("error in getAllTasksByCategoryId", error);
    response.send({ error: "Something went wrong" });
    throw error;
  }
};

export const getAllCompletedTasks = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const userId = request.user;

    const tasks = await Task.find({
      user: userId,
      isCompleted: true,
    });
    return response.send(tasks);
  } catch (error) {
    console.log("error in getAllCompletedTasks", error);
    response.send({ error: "Something went wrong" });
    throw error;
  }
};

export const getTasksForToday = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const userId = request.user;
    const todayISODate = new Date()
    todayISODate.setHours(0, 0, 0, 0);
    const tasks = await Task.find({
      user: userId,
      date: todayISODate.toISOString(),
    });
    return response.send(tasks);
  } catch (error) {
    console.log("error in getTasksForToday", error);
    response.send({ error: "Something went wrong" });
    throw error;
  }
};

export const createTask = async (request: AuthRequest, response: Response) => {
  try {
    const { name, isCompleted, categoryId, date, isEditable }: ITask =
      request.body;
    const task = await Task.create({
      name,
      isCompleted,
      categoryId,
      date,
      isEditable,
    });
    return response.send(task);
  } catch (error) {
    console.log("error in createTask", error);
    response.send({ error: "Something went wrong" });
    throw error;
  }
};

export const toogleTaskStatus = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const { isCompleted }: ITask = request.body;
    const { id } = request.params;
    const task = await Task.updateOne(
      {
        id,
      },
      {
        $set: { isCompleted },
      }
    );
    return response.send({ message: "Task updated successfully" });
  } catch (error) {
    console.log("error in updateTask", error);
    response.send({ error: "Error in updating the Task" });
    throw error;
  }
};

export const deleteTask = async (request: AuthRequest, response: Response) => {
  try {
    const { id } = request.params;
    Task.deleteMany({ _id: id });
    return response.send({ message: "Task deleted!" });
  } catch (error) {
    console.log("error in deleteTask", error);
    response.send({ error: "Something went wrong" });
    throw error;
  }
};

export const updateTask = async (request: AuthRequest, response: Response) => {
  try {
    const { _id, name, isCompleted, categoryId, date, isEditable }: ITask =
      request.body;
    const task = await Task.updateOne(
      {
        _id,
      },
      {
        $set: { name, isCompleted, categoryId, date, isEditable },
      }
    );
    return response.send({ message: "Task updated successfully" });
  } catch (error) {
    console.log("error in updateTask", error);
    response.send({ error: "Error in updating the Task" });
    throw error;
  }
};
