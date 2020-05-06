import React, {Component} from 'react';

class TodoInput extends Component {
    render() {
        const { title, description, handleInputChange, handleDescriptionChange, handleSubmit } = this.props;
        return (
            <div className="card card-body my-3">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control text-capitalize d-block w-100 mb-2"
                            placeholder="add a todo item"
                            value={title}
                            onChange={handleInputChange}
                        />
                        <textarea
                            className="d-block w-100 text-capitalize pl-2 text-dark"
                            placeholder="add a todo description"
                            value={description}
                            onChange={handleDescriptionChange}
                        >
                        </textarea>
                    </div>
                    <button type="submit" className="btn btn-block btn-primary mt-3">Add Item</button>
                </form>
            </div>
        );
    }
}

export default TodoInput;
