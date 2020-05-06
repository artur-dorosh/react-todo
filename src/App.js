import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import axios from 'axios';

import logo from './logo.svg';
import './App.css';
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

import 'bootstrap/dist/css/bootstrap.min.css';
import uuid from "uuid";
import Search from "./components/Search";
import EditPage from "./components/EditPage";
import ArchivePage from "./components/ArchivePage";

class App extends Component {
    state = {
        todos: [],
        title: '',
        description: '',
        search: '',
        searchResult: [],
        edit: 0,
        editResult: '',
        archive: []
    };

    componentDidMount() {
        axios.get("http://localhost:3001/posts")
            .then(resp => resp.data)
            .then(data => {
                this.setState({
                    todos: data.todos,
                    title: data.title,
                    description: data.description,
                    edit: data.edit,
                    editResult: data.editResult,
                    archive: data.archive
                })
            });
    }

    handleInputChange = (event) => {
        this.setState({
            title: event.target.value
        })
    };

    handleDescriptionChange = (event) => {
        this.setState({
            description: event.target.value
        })
    };

    handleSubmit = (event) => {
      event.preventDefault();

      const id = uuid();

      axios.post(`http://localhost:3001/posts`, {
        id: id,
        title: this.state.title,
        description: this.state.description,
        edit: false,
        checked: false
      })
          .then(
              this.setState({
                  todos: [...this.state.todos, {
                      id: id,
                      title: this.state.title,
                      description: this.state.description,
                      edit: false,
                      checked: false
                  }],
                  title: '',
                  description: ''
              })
          )
    };

    handleDelete = (id) => {
        axios.delete(`http://localhost:3001/posts/${id}`)
            .then(resp => console.log(resp))
            .then(
                this.setState({
                    todos: this.state.todos.filter(todo => todo.id !== id)
                })
            )
            .catch(error => console.log(error))
    };

    handleEdit = (id) => {
        const newState = {
            ...this.state,
            edit: id,
            editResult: this.state.todos.map(todo => todo.id === id ? todo.title : '').join('')
        };

        axios.put(`http://localhost:3001/posts`, newState)
            .then(() =>
                this.setState({
                    edit: id,
                    editResult: this.state.todos.map(todo => todo.id === id ? todo.title : '').join('')
                })
            )
    };

    handleCheck = (id) => {
        const item = this.state.todos.find(todo => todo.id === id);

        axios.put(`http://localhost:3001/posts/${id}`, {
            ...item,
            checked: !item.checked
        })
            .then(resp => console.log(resp))
            .then(() =>
                this.setState({
                    todos: this.state.todos.map(todo => {
                        return todo.id === id ?
                            {
                                ...todo,
                                checked: !todo.checked
                            } :
                            todo
                    })
                })
            )
            .catch(error => console.log(error));
    };

    handleEditInput = (event) => {
        this.setState({
            editResult: event.target.value
        });
    };

    handleSave = (id) => {
        const newState = {
            ...this.state,
            editResult: this.state.editResult,
            todos: this.state.todos.map(item => {
                return item.id === id ?
                    {
                        ...item,
                        title: this.state.editResult,
                        edit: !item.edit
                    } :
                    item
            })
        };

        axios.put(`http://localhost:3001/posts/${id}`, newState)
            .then(() => {
                this.setState(
                    newState
                );
            })
            .catch(error => console.log(error));

        axios.put(`http://localhost:3001/posts`, newState);
    };

    handleSearch = (event) => {
        this.setState({
            search: event.target.value,
        });
    };

    handleArchive = (id) => {
        const item = this.state.todos.find(todo => todo.id === id);
        const newState = {
            ...this.state,
            todos: this.state.todos.filter(todo => todo.id !== id),
            archive: [
                ...this.state.archive,
                {
                    ...item,
                    archived: !item.archived
                }
            ]
        };

        axios.put(`http://localhost:3001/posts`, newState)
            .then(() =>
                this.setState(newState)
            )
    };

    handleUnArchive = (id) => {
        const item = this.state.archive.find(todo => todo.id === id);

        const newState = {
            ...this.state,
            todos: [
                ...this.state.todos,
                {
                    ...item,
                    archived: !item.archived
                }
            ],
            archive: this.state.archive.filter(todo => todo.id !== id)
        };

        axios.put(`http://localhost:3001/posts`, newState)
            .then(() => {
                this.setState(newState)
            })
    };

    render() {
        const item = this.state.todos.filter((todo => todo.id === this.state.edit));
        const search = this.state.search.toLowerCase();
        const searchResult = this.state.todos.filter(
            item => item.title.toLowerCase().includes(search) || item.description.toLowerCase().includes(search)
        );
        return (
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <div className="App">
                            <img src={logo} className="App-logo" alt="logo" />
                            <div className="container">
                                <div className="row">
                                    <div className="col-10 mx-auto col-md-8 mt-4">
                                        <Link to="/archive">
                                            <button className="btn btn-warning mb-5 font-weight-bold">Go to Archive</button>
                                        </Link>
                                        <h3 className="text-capitalize text-center">Search</h3>
                                        <Search
                                            search={this.state.search}
                                            handleSearch={this.handleSearch}
                                        />
                                        <h3 className="text-capitalize text-center">Todo Input</h3>
                                        <TodoInput
                                            title={this.state.title}
                                            description={this.state.description}
                                            handleChange={this.handleChange}
                                            handleInputChange={this.handleInputChange}
                                            handleDescriptionChange={this.handleDescriptionChange}
                                            handleSubmit={this.handleSubmit}
                                        />
                                        <TodoList
                                            todos={this.state.todos}
                                            search={this.state.search}
                                            searchResult={searchResult}
                                            handleDelete={this.handleDelete}
                                            handleEdit={this.handleEdit}
                                            handleCheck={this.handleCheck}
                                            handleSave={this.handleSave}
                                            handleArchive={this.handleArchive}
                                            handleUnArchive={this.handleUnArchive}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Route>
                    <Route path="/edit/:id">
                        <EditPage
                            todo={item}
                            editResult={this.state.editResult}
                            handleSave={() => this.handleSave(this.state.edit)}
                            handleEditInput={this.handleEditInput}
                        />
                    </Route>
                    <Route path="/archive">
                        <ArchivePage
                            todos={this.state.archive}
                            handleDelete={this.handleDelete}
                            handleEdit={this.handleEdit}
                            handleCheck={this.handleCheck}
                            handleArchive={this.handleArchive}
                            handleUnArchive={this.handleUnArchive}
                        />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;
