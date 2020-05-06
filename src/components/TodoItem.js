import React, {Component} from 'react';
import { Link } from "react-router-dom";

class TodoItem extends Component {
    render() {
        const { todo, title, description, checked, handleDelete, handleEdit, handleCheck, handleArchive, handleUnArchive } = this.props;

        return (
                <li className="list-group-item text-capitalize my-2 d-block">
                    {
                        todo.archived ?
                            <div>
                                <div className={
                                    checked ?
                                        "text-dark ml-2 mb-0 font-weight-bold pointer checked":
                                        "text-dark ml-2 mb-0 font-weight-bold pointer"
                                }>{title}</div>
                                <div className={
                                    checked ?
                                        "text-dark pointer checked" :
                                        "text-dark pointer"
                                }>{description}</div>
                                <div className="todo-icon d-flex align-items-center justify-content-center">
                                    <button className="mx-2 my-2 h6 mb-0 btn btn-info" onClick={handleUnArchive}>Unarchive</button>
                                </div>
                            </div> :
                            <div>
                                <div className={
                                    checked ?
                                        "text-dark ml-2 mb-0 font-weight-bold pointer checked":
                                        "text-dark ml-2 mb-0 font-weight-bold pointer"
                                } onClick={handleCheck}>{title}</div>
                                <div className={
                                    checked ?
                                        "text-dark pointer checked" :
                                        "text-dark pointer"
                                }>{description}</div>
                                <div className="todo-icon d-flex align-items-center justify-content-center">
                                    <Link to={`/edit/${todo.id}`}>
                                        <button className="mx-2 my-2 h6 mb-0 btn btn-success" onClick={handleEdit}>Edit</button>
                                    </Link>
                                    <button className="mx-2 my-2 h6 mb-0 btn btn-danger" onClick={handleDelete}>Delete</button>
                                    <button className="mx-2 my-2 h6 mb-0 btn btn-info" onClick={handleArchive}>Archive</button>
                                </div>
                            </div>
                    }
                </li>
        );
    }
}

export default TodoItem;
