import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class PaginationComponent extends Component {
    render() {
        let arr = []
        let pages = Math.ceil(this.props.articuls.length / 6)
        for (let i = 0; i < pages; i++) {
            arr.push(i + 1)
        }
      return (
        <div className="row space-top">
            <div className="col-md-12">
                <ul className="pagination">
                    <li className="page-item">
                        <NavLink to='/page1' className="page-link" >«</NavLink>
                    </li>
                    {arr.map(index => {
                        return  <li className="page-item" key={index}>
                                    <NavLink to={`/page${index}`} activeStyle={{
                                        color: 'white',
                                        backgroundColor: 'blue'
                                    }} className="page-link">{index}</NavLink>
                                </li>
                    })}
                    <li className="page-item">
                        <NavLink to={`/page${arr.length}`} className="page-link">»</NavLink>
                    </li>
                </ul>
            </div>
        </div>
      )
    }
}

export default PaginationComponent