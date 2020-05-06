import React, {Component} from 'react';
import TodoItem from "./TodoItem";
import logo from "../logo.svg";
import {Link} from "react-router-dom";

class ArchivePage extends Component {
    render() {
        const { todos, handleDelete, handleEdit, handleCheck, handleArchive, handleUnArchive } = this.props;

        return (
            <div className="App">
                <img src={logo} className="App-logo" alt="logo" />
                <div className="container">
                    <div className="row">
                        <div className="col-10 mx-auto col-md-8 mt-4">
                            <Link to="/">
                                <button className="btn btn-warning mb-5 font-weight-bold">Go to Todos</button>
                            </Link>
                            <h3 className="text-capitalize text-center">archive list</h3>
                            {
                                todos.map(todo => {
                                    return (
                                        <TodoItem
                                            key={todo.id}
                                            todo={todo}
                                            title={todo.title}
                                            description={todo.description}
                                            checked={todo.checked}
                                            edited={todo.edit}
                                            handleDelete={() => handleDelete(todo.id)}
                                            handleEdit={() => handleEdit(todo.id)}
                                            handleCheck={() => handleCheck(todo.id)}
                                            handleArchive={() => handleArchive(todo.id)}
                                            handleUnArchive={() => handleUnArchive(todo.id)}
                                        />
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ArchivePage;
