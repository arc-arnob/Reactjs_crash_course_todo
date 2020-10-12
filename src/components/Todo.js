import React, {Component} from 'react'
import PropTypes from "prop-types";
import TodosItem from './TodosItem';

export default class Todo extends Component {
    
    render() {
        return this.props.todos.map((todo) => (
        <TodosItem 
            key={todo.id} 
            todo={todo}  
            markComplete={this.props.markComplete}
            delTodo = {this.props.delTodo}/>
        ));      
    }
    
    
}

//PropTypes
Todo.propTypes = {
    todos: PropTypes.array.isRequired
}