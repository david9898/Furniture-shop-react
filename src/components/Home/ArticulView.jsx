import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'C:/Users/Toshiba/AppData/Local/Microsoft/TypeScript/2.9/node_modules/redux';
import { CHANGEDETAILS } from '../../store/actions';

class ArticulView extends Component {
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
                        </div>
                    </blockquote>
                </div>
            </div>
        </div>
      )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({changeDetails: CHANGEDETAILS}, dispatch)
}


export default connect(null, mapDispatchToProps)(ArticulView)