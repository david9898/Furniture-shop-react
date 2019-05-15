import React, { Component } from 'react';
import MyArticulView from './MyArticulView';

class MyAllArticuls extends Component {
    render() {
      return (
        <div className="row space-top">
            {this.props.articuls.map((obj) => {
                return <MyArticulView obj={obj} key={obj._id} />
            })}
        </div>
      )
    }
}

export default MyAllArticuls