import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { updateTodo } from '../Modules/action.js';
import { deleteTodo } from '../Modules/action.js';
import { connect } from 'react-redux';

class Edit extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: this.props.todo.title,
      description: this.props.todo.description,
      id: this.props.todo.id,
      startDate: '',
    }
    this.handleTitle = this.handleTitle.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleTitle(event) {
    this.setState({
      title: event.target.value.trim()
    })
  }

  handleDescription(event) {
    this.setState({
      description: event.target.value.trim()
    })
  }

  handleDateChange(date) {
    this.setState({
      startDate: date
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.title || !this.state.description || !this.state.startDate) {
      return
    }
    let newTodo = {
      id: this.props.todo.id,
      title: this.state.title,
      description: this.state.description,
      date: this.state.startDate,
      completed: false,
    }
    this.props.updateTodo(newTodo);
    window.location.reload();
    this.props.closePopup();
  }

  handleDelete() {
    this.props.deleteTodo(this.props.todo);
    window.location.reload();
    this.props.closePopup();
  }

  render() {
    console.log('props', this.props.todo.id)
    return (
      <div className='popup'>
        <div className='popup-inner'>
          <form
            className='form'
            onSubmit={ this.handleSubmit }>
            <input
              type='text'
              className='input-title'
              placeholder={ this.props.todo.title }
              onChange={ this.handleTitle }
              />
            <input
              type='text'
              className='input-description'
              placeholder={ this.props.todo.description }
              onChange={ this.handleDescription }
              />
              <br/>
              <div className='date-input'>
                <DatePicker
                  placeholder={ this.props.todo.date.substring(0, 10) }
                  selected={ this.state.startDate }
                  onChange={ this.handleDateChange }
                  dateFormat="MMMM d, yyyy"
                />
              </div>
            <button className='add-todo' type='submit'>
              SAVE
            </button>
          </form>
          <button className='delete-edit' onClick={ this.handleDelete }>
            Delete
          </button>
          <button className='close-edit' onClick={ this.props.closePopup }>
            CLOSE
          </button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  };
}

export default connect(
  mapStateToProps,
  { updateTodo, deleteTodo },
)(Edit);