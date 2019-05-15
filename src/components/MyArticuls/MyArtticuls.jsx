import React, { Component } from 'react';
import { connect } from 'react-redux';
import AllArticuls from '../Home/RenderArticuls';
import MyPagination from './MyPagination';
import MyAllArticuls from './MyAllPosts';

class MyArticuls extends Component {
    constructor(props) {
        super(props)

        this.state = {
            myPosts: [],
            renderArr: [],
            activePage: 1
        }

        //Bind Func
        this.onLoadFunc = this.onLoadFunc.bind(this)
    }

    async onLoadFunc() {
        let page = window.location.pathname.substr(-1)
        let arr = []
        this.props.articuls.map(obj => {
            if (this.props.id === obj._acl.creator) {
                arr.push(obj)
            } 
        })
        let startIndex = (page * 6) - 6
        let endIndex = startIndex + 6
        await this.setState({myPosts: arr})
        this.setState({renderArr: this.state.myPosts.slice(startIndex, endIndex)})        
    }

    componentDidMount() {
        this.onLoadFunc()
    }

    componentDidUpdate(prevState) {
        if (window.location.pathname !== prevState.location.pathname) {
            let page = window.location.pathname.substr(-1)
            let startIndex = (page * 6) - 6
            let endIndex = startIndex + 6
            this.setState({activePage: page})
            this.setState({renderArr: this.state.myPosts.slice(startIndex, endIndex)})
        }
    }

    render() {
      return (
        <main>
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Welcome to Furniture System</h1>
                    </div>
                </div>
                <MyAllArticuls articuls={this.state.renderArr} />
                <MyPagination articuls={this.state.myPosts}/>
            </div>
        </main>
      )
    }
}

const mapStateToProps = (state) => ({
    articuls: state.articuls,
    id: state.id
})

export default connect(mapStateToProps)(MyArticuls)