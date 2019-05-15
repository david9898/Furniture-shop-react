import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import toastr from 'toastr';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import operations from '../../operations/operations';
import { CHANGESTATUSUSER, LOGINUSER } from '../../store/actions';

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            isEmail: '',
            password: '',
            isPassword: '',
            redirect: false
        }

        //Bind Func
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePass = this.onChangePass.bind(this)
        this.onClick = this.onClick.bind(this)
    }

    onChangeEmail(e) {
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        operations.onChange(e, this)
        if (e.target.value !== '') {
            if (regex.test(e.target.value)) {
                e.target.classList.remove('is-invalid')
                e.target.classList.add('is-valid')
                this.setState({isEmail: true})
            }else {
                e.target.classList.remove('is-valid')
                e.target.classList.add('is-invalid')
                this.setState({isEmail: false})
            }
        }else {
            e.target.classList.remove('is-valid')
            e.target.classList.remove('is-invalid')
            this.setState({isEmail: ''})
        }
    }

    onChangePass(e) {
        operations.onChange(e, this)
        if (e.target.value !== '') {
            if (e.target.value.length >= 3) {
                e.target.classList.remove('is-invalid')
                e.target.classList.add('is-valid')
                this.setState({isPassword: true})
            }else {
                e.target.classList.remove('is-valid')
                e.target.classList.add('is-invalid')
                this.setState({isPassword: false})
            }
        }else {
            e.target.classList.remove('is-valid')
            e.target.classList.remove('is-invalid')
            this.setState({isPassword: ''})
        }
    }

    onClick() {
        if (this.state.isEmail === '' || this.state.isPassword === '') { return toastr.error('You must fill in all fields!')}
        else if (this.state.isEmail === false) { return toastr.error('Email is not valid!') }
        else if (this.state.isPassword === false) { return toastr.error('Password must be at least 3 characters!') }
        else if (this.state.isEmail && this.state.isPassword) {
            operations.login(this.state).then((result) => {
                this.props.log(result.data._id, result.data._kmd.authtoken, result.data.username)
                this.props.change()
                this.setState({redirect: true})
                toastr.success('Login successful!')
            }).catch((error) => {
                console.log(error)                
            })
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }

      return (
        <main>
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Login</h1>
                    </div>
                </div>
                <form onSubmit={(e) => operations.onSubmit(e)}>
                    <div className="row space-top">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="form-control-label" htmlFor="email">E-mail</label>
                                <input name='email' onChange={this.onChangeEmail} className="form-control" value={this.state.email} id="email" type="text" />
                                {this.state.isEmail === true && <div className="form-control-feedback">This input value is valid</div>}
                                {this.state.isEmail === false && <div className="form-control-feedback">This input value is invalid</div>}
                                {this.state.isEmail === '' && null}
                            </div>
                            <div className="form-group">
                                <label className="form-control-label" htmlFor="password">Password</label>
                                <input name='password' onChange={this.onChangePass} className="form-control" value={this.state.password} id="password" type="password" />
                                {this.state.isPassword === true && <div className="form-control-feedback">This input value is valid</div>}
                                {this.state.isPassword === false && <div className="form-control-feedback">This input value is invalid</div>}
                                {this.state.isPassword === '' && null}
                            </div>
                            <input onClick={this.onClick} type="submit" className="btn btn-primary" value="Login" />
                        </div>
                    </div>
                </form>
            </div>
        </main>
      )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({change: CHANGESTATUSUSER, log: LOGINUSER}, dispatch)
}

export default connect(null, mapDispatchToProps)(Login)