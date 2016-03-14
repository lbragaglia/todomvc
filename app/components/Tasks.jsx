import React from 'react';
import Task from './Task.jsx';

export default class Tasks extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const tasks = this.props.items;
    return <ul className="tasks">{tasks.map(this.renderTask)}</ul>
  }

  renderTask = (task) => {
    return (
      <li className="task" key={task.id}>
        <Task task={task.task}
              onEdit={this.props.onEdit.bind(null, task.id)}
              onDelete={this.props.onDelete.bind(null, task.id)} />
      </li>
    )
  }
}
