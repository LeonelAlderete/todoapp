import React from "react";
//Componentes
import TaskHeader from "../../modules/Task/components/TaskHeader";
import CreateTask from "../../modules/Task/components/CreateTask";
import TaskList from "../../modules/Task/components/Tasklist";

export default function Home() {
  return (
    <>
      <TaskHeader />

      <CreateTask />

      <TaskList />
    </>
  );
}
