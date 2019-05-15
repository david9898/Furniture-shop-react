import React, { Component } from 'react';
import operations from '../../operations/operations';
import { Link } from 'react-router-dom';
import { SEARCHITEMS } from '../../store/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

class Search extends Component {
    constructor(props) {
        super(props)

        this.state = {
            search: ''
        }

        //Bind Func
        this.onSearch = this.onSearch.bind(this)
    }

    onSearch() {
        let filterArticuls = this.props.articuls.filter((articul) => {
            return articul.model.toLowerCase().indexOf(this.state.search) !== -1
        })
        this.props.search(filterArticuls)
    
    }

    render() {
      return (
        <form className="form-inline my-2 my-lg-0" onSubmit={(e) => operations.onSubmit(e)}>
            <input onChange={(e) => operations.onChange(e, this)} value={this.state.search} className="form-control mr-sm-2" name='search' placeholder="Search" type="text" />
            <Link to='/search' onClick={this.onSearch} className="btn btn-primary my-2 my-sm-0">Search</Link>
        </form>
      )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({search: SEARCHITEMS}, dispatch)
}


export default connect(null, mapDispatchToProps)(Search)