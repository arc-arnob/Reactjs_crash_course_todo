import React, { Component } from 'react';
import {v4} from 'uuid'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Todo from './components/Todo';
import Header from './components/Header'
import AddTodo from './components/AddTodo'
import About from './components/About'

import './App.css';
import axios from 'axios';
class App extends Component {
  state = {
    todos: []
  }

  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos')
    .then(res => this.setState({ todos: res.data }))
  }
  // Toggle Complete
  markComplete = (id) => {
    console.log(id)
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  //Delete tasks
  delTodo = (id) =>{
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)] } ) )
    
     //Note: ... is spread operator to copy everthing already there
  }

  //Add Todo
  addTodo =(title)=>{
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    })
    .then(res => this.setState({todos: [...this.state.todos, res.data]}) )
   
  }

  
  render(){
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (

              <React.Fragment>
                <AddTodo  addTodo={this.addTodo}/>
                <Todo 
                  todos={this.state.todos} 
                  markComplete={this.markComplete}
                  delTodo={this.delTodo}
                />
              </React.Fragment>

            )} />
            <Route exact path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}


export default App;
