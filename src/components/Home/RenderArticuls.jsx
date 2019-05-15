import React, { Component } from 'react';
import ArticulView from './ArticulView';

class AllArticuls extends Component {
    render() {
      return (
        <div className="row space-top">
            {this.props.articuls.map((obj) => {
                return <ArticulView obj={obj} key={obj._id} />
            })}
        </div>
      )
    }
}

export default AllArticuls