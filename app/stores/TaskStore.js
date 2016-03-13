import alt from "../libs/alt.js";
import TaskActions from "../actions/TaskActions";
import * as $ from "axios";
class TaskStore {

  constructor() {
    this.bindActions(TaskActions);
    this.notes = [];
  }

  read() {
    let _this = this;
    const notes = this.notes;
    $.get("http://todomvc.stamplayapp.com/api/cobject/v1/task", { params : { select : "task" } })
      .then(function(res) {
        let tasks = res.data.data;
        _this.setState({
          notes : notes.concat(tasks)
        })
      })
  }

  create(note) {
    let _this = this;
    const notes = this.notes;
    $.post("https://todomvc.stamplayapp.com/api/cobject/v1/task", note)
      .then(function(res) {
        let task = res.data;
        _this.setState({
          notes : notes.concat(task)
        })
      })
  }

  update({id, task}) {
    let _this = this;
    const notes = this.notes;
    const noteIndex = this.findTask(id);

    if(noteIndex < 0) { return }

    $.put("https://todomvc.stamplayapp.com/api/cobject/v1/task/" + id, { task : task })
      .then(function(res) {
        console.info("Updated", id);
      }, function(err) {
        console.err("Error updating :", id, err);
      })

    notes[noteIndex].task = task;

    this.setState({
      notes : notes
    })

  }

  delete(id) {
    let _this = this;
    const notes = this.notes;
    const noteIndex = this.findTask(id);

    if(noteIndex < 0) { return }

    $.delete("https://todomvc.stamplayapp.com/api/cobject/v1/task/" + id)
      .then(function(res) {
        console.info("Deleted", id);
      }, function(err) {
        console.err("Error deleting :", id, err);
      })

      this.setState({
        notes : notes.slice(0, noteIndex).concat(notes.slice(noteIndex + 1))
      })

  }

  findTask(id) {
    const notes = this.notes;
    const noteIndex = notes.findIndex((note) => note.id === id);
    if(noteIndex < 0) {
      console.warn("Failed to find note", notes, id);
    }
    return noteIndex;
  }

}

export default alt.createStore(TaskStore, 'TaskStore');
