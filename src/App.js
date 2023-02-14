import React, { useState, useEffect } from "react";
import "./App.css";
import { CheckCircleFilled, EditFilled, DeleteFilled } from "@ant-design/icons";
import { Input } from "antd";

function App() {
  const [toDo, setToDo] = useState([]);
  //for storing tasks
  const [newTask, setNewTask] = useState([]);
  //for updating tasks
  const [updateData, setUpdateData] = useState([]);
  //addtask
  const [deleteFull, setDeleteFull] = useState([]);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(toDo));
  }, [toDo]);

  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false };
      setToDo([...toDo, newEntry]);
      setNewTask("");
    }
  };
  const deleteTask = (id) => {
    let newTasks = toDo.filter((t) => t.id != id);
    setToDo(newTasks);
  };
  const deletefull = () => {
    let num = toDo.length;
    let deleteall = { id: num, title: newTask, status: false };
  };
  const markDone = (id) => {
    let newTask = toDo.map((t) => {
      if (t.id === id) {
        return { ...t, status: !t.status };
      }
      return t;
    });
    setToDo(newTask);
  };

  const updateTask = () => {
    let filterRecords = [...toDo].filter((t) => t.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData];
    setToDo(updatedObject);
    setUpdateData("");
  };
  const cancelUpdate = () => {
    setUpdateData("");
  };
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEntry);
  };

  return (
    <div className="App">
      <br />
      <br />
      <h3>To DO List App React js</h3>
      <br />
      <br />
      <div className="dis">
        {" "}
        <Input
          width={"20 px"}
          placeholder=""
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="taskbut" onClick={addTask}>
          Add Task
        </button>{" "}
        <button className="taskbut5" onClick={deletefull}>
          Del All Tasks
        </button>{" "}
      </div>
      <br />
      <br />
      <div className="dis">
        <Input
          width={"20 px"}
          placeholder=""
          value={updateData && updateData.title}
          onChange={(e) => changeTask(e)}
        />
        <button className="taskbut" onClick={updateTask}>
          Update
        </button>
        <button className="taskbut5" onClick={cancelUpdate}>
          cancel
        </button>
      </div>
      <br />
      <br />
      {toDo && toDo.length ? "" : "No tasks"}
      {toDo &&
        toDo.map((t, index) => {
          return (
            <div key={t.id}>
              <div className="taskBg">
                <div className={t.status ? "done" : ""}>
                  <h3 className="taskNumber">{index + 1} &nbsp;</h3>
                  <span className="taskText">{t.title}</span>
                </div>
                <div className="flexxx">
                  <span
                    title="completed/not completed"
                    onClick={(e) => markDone(t.id)}
                  >
                    {" "}
                    <CheckCircleFilled />
                  </span>
                  {t.status ? null : (
                    <span
                      title="edit"
                      onClick={() => {
                        setUpdateData({
                          id: t.id,
                          title: t.title,
                          status: t.status ? true : false,
                        });
                      }}
                    >
                      <EditFilled />
                    </span>
                  )}

                  <span title="delete">
                    <DeleteFilled onClick={() => deleteTask(t.id)} />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default App;
