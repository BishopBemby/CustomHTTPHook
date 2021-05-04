import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);

//to ensure the state sdoesnt chaneg again and again, we can either use useCallback like below

//SOlution: 1
  // const transformedTasks = useCallback((taskObj) => {
  //   const loadedTasks = [];

  //   for (const taskKey in taskObj) {
  //     loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
  //   }

  //   setTasks(loadedTasks);
  // }, []);

  // const returnedObj = useHttp(transformedTasks);

  // const {isLoading, error, sendReq: fetchTasks} = returnedObj;

  // //here useEffect dont know about fetchTaks for now, but wont do it as it will create infinte loop, so a better way to do it,
  // useEffect(() => {
  //   fetchTasks(
  //    { url: "https://reacthttp-f4741-default-rtdb.firebaseio.com/tasks.json"});
  // }, [fetchTasks]);

  //Solution: 2 , using useEffect only

  const returnedObj = useHttp();

  const {isLoading, error, sendReq: fetchTasks} = returnedObj;

  //here useEffect dont know about fetchTaks for now, but wont do it as it will create infinte loop, so a better way to do it,
  useEffect(() => {
    const transformedTasks = (taskObj) => {
      const loadedTasks = [];
  
      for (const taskKey in taskObj) {
        loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
      }
  
      setTasks(loadedTasks);
    };
    fetchTasks(
     { url: "https://reacthttp-f4741-default-rtdb.firebaseio.com/tasks.json"}, transformedTasks);
  }, [fetchTasks]);


  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
