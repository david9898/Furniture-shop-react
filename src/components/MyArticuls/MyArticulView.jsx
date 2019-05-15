import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'C:/Users/Toshiba/AppData/Local/Microsoft/TypeScript/2.9/node_modules/redux';
import { CHANGEDETAILS, REMOVEARTICUL } from '../../store/actions';
import operations from '../../operations/operations';
import toastr from 'toastr';

class MyArticulView extends Component {
    onClick() {
        operations.deleteArticul(this.props.obj._id, this.props.token)
        .then((res) => {
            this.props.remove(this.props.obj._id)
            window.location.reload()
            toastr.success('Articul was deleted!')
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
      return (
        <div className="col-md-4">
            <div className="card text-white bg-primary">
                <div className="card-body">
                    <blockquote className="card-blockquote">
                        <img src={this.props.obj.image} className='imageArticul'/>
                        <p>{this.props.obj.description}</p>
                        <footer className='color'>Someone famous in
                            <cite title="Source Title"> {this.props.obj.model}</cite>
                        </footer>
                        <div className="pull-right">
                            <Link to={`${window.location.pathname}/articul${btoa(this.props.obj._id)}`} onClick={() => this.props.changeDetails(this.props.obj)} className="btn btn-info">Details</Link>
                            <button className='btn btn-danger' onClick={this.onClick.bind(this)}>DELETE</button>
                        </div>
                    </blockquote>
                </div>
            </div>
        </div>
      )
    }
}

const mapStateToProps = (state) => ({
    token: state.authToken
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        changeDetails: CHANGEDETAILS,
        remove: REMOVEARTICUL
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(MyArticulView)