import React from 'react';
import Task from './Task.jsx';

export default class Tasks extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const notes = this.props.items;
    return <ul className="notes">{notes.map(this.renderTask)}</ul>
  }

  renderTask = (note) => {
    return (
      <li className="note" key={note.id}>
        <Task task={note.task}
              onEdit={this.props.onEdit.bind(null, note.id)}
              onDelete={this.props.onDelete.bind(null, note.id)} />
      </li>
    )
  }
}
