import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}

//link para o prototipo no figma: https://www.figma.com/file/10yDr2FYcG7XQ8X8SmG4cL/to.do-(Copy)?node-id=10485%3A499

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const foundTask = tasks.find(task => task.title === newTaskTitle);
    if (foundTask){
      Alert.alert("Task já cadastrada", "Você não pode cadastrar uma task com o mesmo nome");
    } else {
      const task = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      }
      setTasks([...tasks, task]);
    }
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({...task}));

    const foundTask = updatedTasks.find(task => task.id === id);

    if (!foundTask){
      return;
    }

    foundTask.done = !foundTask.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          style: "cancel"
        },
        { text: "Sim", onPress: () => setTasks(oldState => oldState.filter(task => task.id !== id))}
      ]
    );
  }

  function handleEditTask({ taskId, taskNewTitle }:  EditTaskArgs) {
    const updatedTasks = tasks.map(task => ({...task}));

    const foundTask = updatedTasks.find(task => task.id === taskId);

    if (!foundTask){
      return;
    }

    foundTask.title = taskNewTitle;
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})