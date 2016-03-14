import React from "react";
import Tasks from "./Tasks.jsx";
import TaskActions from "../actions/TaskActions"
import TaskStore from "../stores/TaskStore"

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = TaskStore.getState();
  }

  componentDidMount() {
    TaskStore.listen(this.storeChanged);
    TaskActions.read();
  }

  componentWillUnmount() {
    TaskStore.unlisten(this.storeChanged);
  }

  storeChanged = (state) => {
    this.setState(state)
  }

  render() {
    const tasks = this.state.tasks;
    return (
      <div>
        <h1 className="title">ToDoMVC</h1>
        <button className="add-task" onClick={this.addTask}>
          <span className="add-text">New Task</span>
          <span className="add-icon">+</span>
        </button>
        <Tasks items={tasks} onEdit={this.editTask} onDelete={this.deleteTask}/>
      </div>
    )
  }

  addTask = () => {
    TaskActions.create({ task : "New (click to edit)" });
  }

  editTask = (id, task) => {
    TaskActions.update({ id, task })
  }

  deleteTask = (id) => {
    TaskActions.delete(id)
  }

}
