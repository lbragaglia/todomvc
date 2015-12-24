import uuid from "node-uuid";
import React from "react";
import Notes from "./Notes.jsx";
import NoteActions from "../actions/NoteActions"
import NoteStore from "../stores/NoteStore"

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = NoteStore.getState();
  }

  componentDidMount() {
    NoteStore.listen(this.storeChanged);
    NoteActions.read();
  }

  componentWillUnmount() {
    NoteStore.unlisten(this.storeChanged);
  }

  storeChanged = (state) => {
    this.setState(state)
  }

  render() {
    const notes = this.state.notes;
    return (
      <div>
        <h1 className="title">ToDoMVC</h1>
        <button className="add-note" onClick={this.addNote}>
          <span className="add-text">New Task</span>
          <span className="add-icon">+</span>
        </button>
        <Notes items={notes} onEdit={this.editNote} onDelete={this.deleteNote}/>
      </div>
    )
  }

  addNote = () => {
    NoteActions.create({ task : "New (click to edit)" });
  }

  editNote = (id, task) => {
    NoteActions.update({ id, task })
  }

  deleteNote = (id) => {
    NoteActions.delete(id)
  }

}
