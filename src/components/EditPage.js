import React, {Component} from 'react';
import logo from "../logo.svg";
import {Link} from "react-router-dom";

class EditPage extends Component {
    render() {
        const { todo, editResult, handleSave, handleEditInput } = this.props;

        return (
            <div className="App">
                <img src={logo} className="App-logo" alt="logo" />
                <div className="container">
                    <div className="row">
                        <div className="col-10 mx-auto col-md-8 mt-4">
                            <h3 className="text-capitalize text-center">Edit</h3>
                            {
                                todo.map(item => {
                                    return (
                                        <form key={item.id}>
                                            <input
                                                type="text"
                                                className="form-control text-capitalize d-block w-100 mb-2"
                                                value={editResult}
                                                onChange={handleEditInput}
                                            />
                                            <Link to="/">
                                                <button type="submit" className="btn btn-success col-2 mr-3" onClick={handleSave}>Apply</button>
                                            </Link>
                                        </form>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditPage;
