import React, {Component} from 'react';
import TodoItem from "./TodoItem";

class TodoList extends Component {
    render() {
        const {todos, search, searchResult, handleDelete, handleEdit, handleCheck, handleArchive, handleUnArchive } = this.props;

        return (
            <ul className="list-group my-5">
                <h3 className="text-capitalize text-center">todo list</h3>
                {
                    searchResult.length !== 0 || search !== '' ?
                        searchResult.map(todo => {
                            return(
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
                                    handleUnarchive={() => handleUnArchive(todo.id)}
                                />
                            );
                        }) :
                        todos.map(todo => {
                            return(
                                <TodoItem
                                    key={todo.id}
                                    todo={todo}
                                    title={todo.title}
                                    description={todo.description}
                                    checked={todo.checked}
                                    handleDelete={() => handleDelete(todo.id)}
                                    handleEdit={() => handleEdit(todo.id)}
                                    handleCheck={() => handleCheck(todo.id)}
                                    handleArchive={() => handleArchive(todo.id)}
                                    handleUnArchive={() => handleUnArchive(todo.id)}
                                />
                            );
                        })
                }
            </ul>
        );
    }
}

export default TodoList;
