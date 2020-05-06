import React, {Component} from 'react';

class Search extends Component {
    render() {
        const { search, handleSearch } = this.props;
        return (
            <div>
                <div>
                    <input
                        type="text"
                        className="form-control text-capitalize d-block w-100 mb-2"
                        placeholder="Looking for..."
                        value={search}
                        onChange={handleSearch}
                    />
                </div>
            </div>
        );
    }
}

export default Search;
