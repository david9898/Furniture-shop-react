import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CHANGESTATUSUSER, LOGOUT } from '../../store/actions';
import { Redirect } from 'react-router-dom';
import toastr from 'toastr'
import operations from '../../operations/operations';

class Navigation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: false
        }

        //Bind Func
        this.Logout = this.Logout.bind(this)
    }

    Logout() {
        operations.logout(this.props.authToken)
        .then(() => {
            this.props.change()
            this.props.logoutUser()
            this.setState({redirect: true})
            window.location.reload()
            toastr.success('Logout successful!')
        })

    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }

      return (
        <header>
            <nav className="navbar navbar-dark bg-primary">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <p className="navbar-brand">FS</p>
                            <NavLink className="btn btn-default btn-small justBTN" to="/">Home</NavLink>
                            {this.props.isLog ? <NavLink className="btn btn-small btn-default justBTN" to="/create">Create Furniture</NavLink> : null}
                            {this.props.isLog ? <NavLink className="btn btn-default btn-small justBTN" to="/myProduct">My Furniture</NavLink> : null}
                            {this.props.isLog ? <input type='submit' onClick={this.Logout} className="btn btn-small btn-default justBTN" value='Logout' /> : null}
                            {this.props.isLog ? null : <NavLink className="btn btn-small btn-default justBTN" to="/login">Login</NavLink>}
                            {this.props.isLog ? null : <NavLink className="btn btn-default btn-small justBTN" to="/register">Register</NavLink>}
                            <span>{this.props.articuls.length} items in catalog</span>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
      )
    }
}
const mapStateToProps = (state) => ({
    isLog: state.isLog,
    authToken: state.authToken,
    articuls: state.articuls
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators({change: CHANGESTATUSUSER, logoutUser: LOGOUT}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Navigation)