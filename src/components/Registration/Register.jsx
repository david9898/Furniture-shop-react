import React, { Component } from 'react';
import operations from '../../operations/operations';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CHANGESTATUSUSER, LOGINUSER } from '../../store/actions';
import { Redirect } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            isUsername: '',
            email: '',
            isEmail: '',
            password: '',
            isPassword: '',
            repPass: '',
            isRepPass: '',
            redirect: false
        }

        //Bind Func
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePass = this.onChangePass.bind(this)
        this.onChangeRepPass = this.onChangeRepPass.bind(this)
        this.onClick = this.onClick.bind(this)
    }

    onChangeUsername(e) {
        let regex = /^[a-zA-Z\-]+$/
        operations.onChange(e, this)
        if (e.target.value !== '') {
            if (regex.test(e.target.value)) {
                e.target.classList.remove('is-invalid')
                e.target.classList.add('is-valid')
                this.setState({isUsername: true})
            }else {
                e.target.classList.remove('is-valid')
                e.target.classList.add('is-invalid')
                this.setState({isUsername: false})
            }
        }else {
            e.target.classList.remove('is-valid')
            e.target.classList.remove('is-invalid')
            this.setState({isUsername: ''})
        }
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

    onChangeRepPass(e) {
        operations.onChange(e, this)
        if (e.target.value !== '') {
            if (e.target.value === this.state.password) {
                e.target.classList.remove('is-invalid')
                e.target.classList.add('is-valid')
                this.setState({isRepPass: true})
            }else {
                e.target.classList.remove('is-valid')
                e.target.classList.add('is-invalid')
                this.setState({isRepPass: false})
            }
        }else {
            e.target.classList.remove('is-valid')
            e.target.classList.remove('is-invalid')
            this.setState({isRepPass: ''})
        }
    }

    onClick() {
        toastr.options = {
            timeOut: 5000,
            hideMethod: 'slideUp'
        }
        if (this.state.isUsername === false) {return toastr.error('Username must be contains only letters!')}  
        else if (this.state.isUsername === '') {return toastr.error('Username must be at least 1 character!')}
        else if (this.state.isEmail === false || this.state.isEmail === '') {return toastr.error('E-mail is not valid!')}
        else if (this.state.isPassword === false || this.state.isPassword === '') {return toastr.error('Password must be at least 3 characters!')}
        else if (this.state.isRepPass === false || this.state.isRepPass === '') {return toastr.error('Passwords are not equals!')}
        else if (this.state.isUsername && this.state.isEmail && this.state.isPassword && this.state.isRepPass) {
            operations.register(this.state).then((result) => {
                this.props.login(result.data._id, result.data._kmd.authtoken, result.data.username)
                this.props.change()
                this.setState({redirect: true})
                toastr.success('Registration successful!')
            })
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/'/>
        }
        
      return (
        <main>
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Register</h1>
                        <p>Please fill all fields.</p>
                    </div>
                </div>
                <form onSubmit={(e) => operations.onSubmit(e)}>
                    <div className="row space-top">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="form-control-label" htmlFor="new-username">User</label>
                                <input className="form-control" name='username' onChange={this.onChangeUsername} id="new-username" value={this.state.username} type="text" />
                                {this.state.isUsername === true && <div className="form-control-feedback">This input value is valid</div>}
                                {this.state.isUsername === false && <div className="form-control-feedback">This input value is invalid</div>}
                                {this.state.isUsername === '' && null}
                            </div>
                            <div className="form-group has-success">
                                <label className="form-control-label" htmlFor="new-email">E-mail</label>
                                <input className="form-control" value={this.state.email} onChange={this.onChangeEmail} name='email' id="new-email" type="text" />
                                {this.state.isEmail === true && <div className="form-control-feedback">This input value is valid</div>}
                                {this.state.isEmail === false && <div className="form-control-feedback">This input value is invalid</div>}
                                {this.state.isEmail === '' && null}
                            </div>
                            <div className="form-group has-danger">
                                <label className="form-control-label" htmlFor="new-password">Password</label>
                                <input className="form-control" value={this.state.password} onChange={this.onChangePass} name='password' id="new-password" type="password" />
                                {this.state.isPassword === true && <div className="form-control-feedback">This input value is valid</div>}
                                {this.state.isPassword === false && <div className="form-control-feedback">This input value is invalid</div>}
                                {this.state.isPassword === '' && null}
                            </div>
                            <div className="form-group has-danger">
                                <label className="form-control-label" htmlFor="new-repeat-password">Repeat password</label>
                                <input className="form-control" value={this.state.repPass} onChange={this.onChangeRepPass} name='repPass' id="new-repeat-password" type="password" />
                                {this.state.isRepPass === true && <div className="form-control-feedback">This input value is valid</div>}
                                {this.state.isRepPass === false && <div className="form-control-feedback">This input value is invalid</div>}
                                {this.state.isRepPass === '' && null}
                            </div>
                            <input type='submit' onClick={this.onClick} className="btn btn-primary" value="Register" />
                        </div>
                    </div>
                </form>
            </div>
        </main>
      )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({change: CHANGESTATUSUSER, login: LOGINUSER}, dispatch)
}


export default connect(null, mapDispatchToProps)(Register)