import alt from "../libs/alt.js";
import TaskActions from "../actions/TaskActions";
import * as $ from "axios";
import { Stamplay } from "stamplay-js-sdk";

class TaskStore {

  constructor() {
    this.bindActions(TaskActions);
    this.tasks = [];
    Stamplay.init("todoapptest");
  }

  read() {
    Stamplay.Object('task').get({ sort: "dt_create" })
      .then((response) => {
        this.setState({ tasks: this.tasks.concat(response.data) })
      }, (error) => console.error(error));
  }

  create(task) {
    Stamplay.Object('task').save(task)
      .then((response) => {
        this.setState({ tasks: this.tasks.concat(response) })
      }, (error) => console.error(error));
  }

  update({id, task}) {
    const taskIndex = this.findTask(id);
    if(taskIndex < 0) { return }

    this.tasks[taskIndex].task = task; // ?
    Stamplay.Object('task').update(id, { task: task })
      .then((response) => console.info("Updated", id), (error) => console.error("Error updating: ", id, error));

    this.setState({
      tasks : this.tasks
    })
  }

  delete(id) {
    const taskIndex = this.findTask(id);
    if(taskIndex < 0) { return }

    Stamplay.Object('task').remove(id)
      .then((response) => console.info("Deleted", id), (error) => console.error("Error deleting: ", id, error));

    this.setState({
      tasks : this.tasks.slice(0, taskIndex).concat(this.tasks.slice(taskIndex + 1))
    })
  }

  findTask(id) {
    const tasks = this.tasks;
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if(taskIndex < 0) {
      console.warn("Failed to find task", tasks, id);
    }
    return taskIndex;
  }

}

export default alt.createStore(TaskStore, 'TaskStore');
