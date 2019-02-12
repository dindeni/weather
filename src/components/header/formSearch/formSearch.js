import React, {Component} from 'react';
import {connect} from 'react-redux';

import {search} from "../../../actions";
import classes from './formSearch.module.css';

class FormSearch extends Component{


    search=(evt)=>{
        evt.preventDefault();
      console.log(evt.target.value);
      this.props.search(evt.target.value);




    };

    render(){
        return(
            <form className={classes["header__form-search"]}>
                <input className={classes["header__form-input"]}
                    onChange={this.search}
                value={this.props.searchValue}
                type="text"/>
            </form>
        );
    }



}

const mapStateToProps = state =>{
    return{
        searchValue: state.reducer.searchValue
    }
};

const mapDispatchToProps = (dispatch)=>({
    search: (data)=>dispatch(search(data))
});



export default connect(mapStateToProps, mapDispatchToProps) (FormSearch);