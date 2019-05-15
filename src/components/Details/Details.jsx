import React, { Component } from 'react';
import { connect } from 'react-redux'
import operations from '../../operations/operations';
import toastr from 'toastr'
import { bindActionCreators } from 'C:/Users/Toshiba/AppData/Local/Microsoft/TypeScript/2.9/node_modules/redux';
import { CHANGECOMMENTS, ADDCOMMENT } from '../../store/actions';
import CommentView from './CommentView';

class Details extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rating: 0,
            content: ''
        }

        //Bind Func
        this.onClick = this.onClick.bind(this)
        this.onSend = this.onSend.bind(this)
    }

    componentDidMount() {
        operations.getComments(this.props.details._id, this.props.authToken)
        .then((res) => {
            this.props.changeComments(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    onClick(e) {
        let rating = e.target.value
        this.setState({rating: rating})
        let btns = document.getElementsByClassName('button')
        for (let btn of btns) {
            btn.classList.remove('btn-primary')
        }
        e.target.classList.add('btn-primary')
    }

    onSend() {
        operations.createComment(this.props.username, this.state.content, this.props.details._id, this.props.authToken, this.state.rating)
        .then((res) => {
            this.props.addComment(res.data)
            toastr.success('Commet was created!')
            this.setState({content: ''})
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
      return (
        <main>
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Furniture Details</h1>
                    </div>
                </div>
                <div className="row space-top">
                    <div className="col-md-4">
                        <div className="card text-white bg-primary">
                            <div className="card-body">
                                <blockquote className="card-blockquote">
                                    <img src={this.props.details.image} />
                                </blockquote>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <p>Make: {this.props.details.make}</p>
                        <p>Model: {this.props.details.model}</p>
                        <p>Year: {this.props.details.year}</p>
                        <p>Description: {this.props.details.description}</p>
                        <p>Price: {this.props.details.price}</p>
                        <p>Material: {this.props.details.material}</p>
                    </div>
                </div>
                {this.props.authToken !== '' && 
                <div className="row space-top">
                    <div className="col-md-8">
                        <form onSubmit={(e) => operations.onSubmit(e)}>
                            <legend>Leave a review</legend>
                            <div className="form-group">
                                <textarea onChange={(e) => operations.onChange(e, this)} value={this.state.content} name='content' className="form-control"></textarea>
                            </div>
                            <div className="form-group">
                                <label>Rating</label>
                                <div className="btn-group mr-2" role="group" aria-label="First group">
                                    <button onClick={this.onClick} value='1' type="button" className="btn btn-secondary button">1</button>
                                    <button onClick={this.onClick} value='2' type="button" className="btn btn-secondary button">2</button>
                                    <button onClick={this.onClick} value='3' type="button" className="btn btn-secondary button">3</button>
                                    <button onClick={this.onClick} value='4' type="button" className="btn btn-secondary button">4</button>
                                    <button onClick={this.onClick} value='5' type="button" className="btn btn-secondary button">5</button>
                                </div>
                                <input onClick={this.onSend} type="submit" className="btn btn-primary" value="Submit review" />
                            </div>
                        </form>
                    </div>
                    {this.props.comments.map((comment) => {
                        return <CommentView key={comment._id} id={this.props.id} token={this.props.authToken} author={this.props.username} obj={comment}/>
                    })}
                </div>}
            </div>
        </main>
      )
    }
}

const mapStateToProps = (state) => ({
    details: state.details,
    username: state.username,
    id: state.id,
    authToken: state.authToken,
    comments: state.comments
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        changeComments: CHANGECOMMENTS,
        addComment: ADDCOMMENT
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Details)