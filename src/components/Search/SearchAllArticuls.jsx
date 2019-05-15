import React, { Component } from 'react';
import AllArticuls from '../Home/RenderArticuls';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchPagination from './SearchPagination';
import { CHANGEACTIVESEARCHPAGE } from '../../store/actions';

class SearchAllArticuls extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }

    //Bind Func
    this.onChangePage = this.onChangePage.bind(this)
  }

  onChangePage(newPage) {
    this.props.changeRender(newPage)
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
        let page = this.props.location.pathname
        let lastChar = page.substr(page.length - 1)
        this.onChangePage(lastChar)
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
              <AllArticuls articuls={this.props.searchRenderArr}/>
              <SearchPagination articuls={this.props.searchArticuls}/>
          </div>
      </main>
    )
  }
}

const mapStateToProps = (state) => ({
    searchArticuls: state.seachArticuls,
    searchRenderArr: state.renderSearchArticuls
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({changeRender: CHANGEACTIVESEARCHPAGE}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchAllArticuls)