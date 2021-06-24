import React, { Component } from 'react';
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import './Todolist.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TodolistConsumer from './Context';


class Tasks extends Component {

  state = {
    gorev : this.props.gorev,
    isChecked : false,
    inputEditTrueFalse : false
  }

  inputDegistir = (e) =>{
     
   
    this.setState({
      
        [e.target.name] : e.target.value

    })
  
}

 
    deleteTask =async(dispatch,e) => {
      const {id} = this.props;
       dispatch({type : "DELETE_TASK" , payload : id});
    }

    checkboxChange= async(dispatch,e) =>{
      const {id} = this.props;
      const {isChecked} = this.state;
      const {gorev} = this.state;

      this.setState({
        isChecked : !this.state.isChecked
      })

      const newCheckboxChange = {
        id,
        isChecked,
        gorev
      }
 
      dispatch({type : "CHANGE_ISCHECKED" , payload : newCheckboxChange});
    }

    editInputChange = () => {
      this.setState({
        inputEditTrueFalse : !this.state.inputEditTrueFalse
      })
    }


    editTask =async (dispatch,e) => {

        e.preventDefault();
        const {gorev} = this.state;
        const {id} = this.props;
        
        
       if(gorev){

      
        const newEditTask = {
          id ,
          gorev
        }
        dispatch({
          type : "EDIT_TEXT", payload : newEditTask
      })  }
      
     


        
     

      this.setState({
        inputEditTrueFalse : !this.state.inputEditTrueFalse
      })
    }

     
 

  
  render() {
    const {isChecked,gorev} = this.state;
      return(
        <TodolistConsumer>
          {
                value=>{
                    const {dispatch} = value;
                   return (
                    <li className="list-group-item">
              
              
                      <div className=" form-check">
                        <div className="d-flex">
              
                          <input onClick ={this.checkboxChange.bind(this,dispatch)}  className="form-check-input checkBoxStyle" type="checkbox" value="" defaultChecked ={isChecked} />
                           
                        
                        {this.state.inputEditTrueFalse ===true?<input type="text" className="form-control editInputText" name="gorev" value={gorev}    onChange={this.inputDegistir}   />    
 :<label className="form-check-label"    style = {isChecked ===true ?{textDecoration:'line-through'}:{textDecoration:'none'}}>
                            {this.props.gorev}
                          </label>}
              
                        </div>
              
              
              
                        <div className="d-flex flex-row-reverse bd-highlight">
 
                          <FontAwesomeIcon className="icon" icon={faTimesCircle} onClick = { this.deleteTask.bind(this,dispatch)} />
                          <FontAwesomeIcon className="icon" icon={faPencilAlt} onClick = {this.editInputChange} />
                           {this.state.inputEditTrueFalse ===true?         <FontAwesomeIcon className="icon" icon={faCheck} onClick = { this.editTask.bind(this,dispatch)} />
                            :null}
                        </div>
                      </div>
              
                    </li>
              
              
                  );

                }

          }
        </TodolistConsumer>
      )


    
  }
}

 

export default Tasks;