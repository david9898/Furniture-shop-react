import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import operations from '../../operations/operations';
import { GETALLARTICULS, CHANGEACTIVEPAGE } from '../../store/actions';
import PaginationComponent from './Pagination';
import AllArticuls from './RenderArticuls';
import Search from '../Search/Seach';

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }

        //Bind Func
        this.onChange = this.onChange.bind(this)
    }

    onChange(pageNumber) {
        this.props.changeActivePage(pageNumber)
    }

    componentDidMount() {
        operations.getAllArticuls().then(data => {
            this.props.setArticuls(data.data)
            if (window.location.pathname !== 'page1') {
                let page = window.location.pathname.substr(-1)
                this.onChange(page)
            }else {
                this.onChange(1)
            }
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            let page = this.props.location.pathname
            let lastChar = page.substr(page.length - 1)
            this.onChange(lastChar)
        }
    }

    render() {
        return(
        <main>
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Welcome to Furniture System</h1>
                        <p>Select furniture from the catalog to view details.</p>
                        <Search articuls={this.props.articuls}/>
                    </div>
                </div>
                <AllArticuls articuls={this.props.renderArr}/>
                <PaginationComponent articuls={this.props.articuls}/>
            </div>
        </main>
        )
    }
}

const mapStateToProps = (state) => ({
    articuls: state.articuls,
    activePage: state.activePage,
    renderArr: state.renderArr
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setArticuls: GETALLARTICULS,
        changeActivePage: CHANGEACTIVEPAGE
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)