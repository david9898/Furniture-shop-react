import React, { Component } from 'react';
import toastr from 'toastr';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import operations from '../../operations/operations';
import { CREATEARTICUL } from '../../store/actions';

class Create extends Component {
    constructor(props) {
        super(props)

        this.state = {
            make: '',
            model: '',
            year: '',
            description: '',
            price: '',
            image: '',
            material: '',
            redirect: false
        }

        //Bind Func
        this.onClick = this.onClick.bind(this)
    }

    onClick() {
        operations.create(this.state, this.props.authToken).then((res) => {
            this.props.createNewArticul(res.data)
            this.setState({redirect: true})
            toastr.success('Articul was created!')
        }).catch((err) => {
            console.log(err)
        })
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
                        <h1>Create New Furniture</h1>
                        <p>Please fill all fields.</p>
                    </div>
                </div>
                <form onSubmit={(e) => operations.onSubmit(e)}>
                    <div className="row space-top">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="form-control-label" htmlFor="new-make">Make</label>
                                <input value={this.state.make} onChange={(e) => operations.onChange(e, this)} className="form-control" name='make' id="new-make" type="text" />
                            </div>
                            <div className="form-group has-success">
                                <label className="form-control-label" htmlFor="new-model">Model</label>
                                <input value={this.state.model} className="form-control" name='model' onChange={(e) => operations.onChange(e, this)} id="new-model" type="text" />
                            </div>
                            <div className="form-group has-danger">
                                <label className="form-control-label" htmlFor="new-year">Year</label>
                                <input value={this.state.year} className="form-control" name='year' id="new-year" type="number" onChange={(e) => operations.onChange(e, this)} />
                            </div>
                            <div className="form-group">
                                <label className="form-control-label" htmlFor="new-description">Description</label>
                                <input className="form-control" value={this.state.description} id="new-description" name='description' type="text" onChange={(e) => operations.onChange(e, this)} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="form-control-label" htmlFor="new-price">Price</label>
                                <input className="form-control" id="new-price" type="number" value={this.state.price} name='price' onChange={(e) => operations.onChange(e, this)}/>
                            </div>
                            <div className="form-group">
                                <label className="form-control-label" htmlFor="new-image">Image</label>
                                <input className="form-control" id="new-image" type="text" name='image' value={this.state.image} onChange={(e) => operations.onChange(e, this)} />
                            </div>
                            <div className="form-group">
                                <label className="form-control-label" htmlFor="new-material">Material (optional)</label>
                                <input className="form-control" id="new-material" type="text" name='material' value={this.state.material} onChange={(e) => operations.onChange(e, this)}/>
                            </div>
                            <input onClick={this.onClick} type="submit" className="btn btn-primary" value="Create" />
                        </div>
                    </div>
                </form>
            </div>
        </main>
      )
    }
}

const mapStateToProps = (state) => ({
    authToken: state.authToken
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({createNewArticul: CREATEARTICUL}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Create)