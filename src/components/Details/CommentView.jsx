import React, { Component } from 'react';
import operations from '../../operations/operations';
import toastr from 'toastr';

class CommentView extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }

        //Bind Func
        this.onClick = this.onClick.bind(this)
    }

    onClick() {
        operations.deleteComment(this.props.obj._id, this.props.token)
        .then((res) => {
            toastr.success('Comment was deleted!')
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
      return (
        <div className="col-md-8">
            <div className="card text-black bg-light">
                <div className="card-body">
                    <blockquote className="card-blockquote">
                        <p>{this.props.obj.content}</p>
                        <h4>Rating: {this.props.obj.rating}</h4>
                        <footer>
                            Submited {operations.calcTime(this.props.obj._kmd.lmt)} by {this.props.obj.author}
                        </footer>
                    </blockquote>
                    {this.props.obj._acl.creator === this.props.id && <button onClick={this.onClick} className='btn btn-danger btn-sm'>Delete</button>}
                </div>
            </div>
        </div>
      )
    }
}

export default CommentView