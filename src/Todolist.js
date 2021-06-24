import React, { Component } from 'react';
 import './Todolist.css'
import TaskList from './TaskList';
import ProgressBar from 'react-bootstrap/ProgressBar'
import Button from 'react-bootstrap/Button'
import TodolistConsumer from './Context';
import OverflowScrolling from 'react-overflow-scrolling';

var uniqid = require('uniqid');

class Todolist extends Component {

  

  state = {
    id : uniqid(),
    gorev : "",
    error: false
  }


  validateForm = () => {
    const {gorev} = this.state;
    if(gorev == null || gorev.trim() === '')
    {return false};
    return true;

  }

  addTask =async (dispatch,e) => {
    e.preventDefault();
    const{gorev} = this.state;

    const newTask = {
      id : uniqid(),
      gorev,
      isChecked :true
    }
    if(!this.validateForm())
    {
      this.setState({
        error : true
      });

      return;
    }
    else this.setState({error : false})

    this.setState({gorev : ""})


    dispatch({type : "ADD_NEW_TASK" , payload : newTask})


     

     

  }

  inputChange = (e) =>{
    this.setState({

        [e.target.name] : e.target.value

    })

}

removeAll =async(dispatch,e) => {
  const {id} = this.props;

  dispatch({type : "DELETE_ALL" , payload : id});
}


checkedDelete = async(dispatch , e) =>{
  const {id} = this.props;

  dispatch({type : "CHECKED_DELETE" , payload : false});

}

    render() {
    
        const {gorev , error} = this.state;
      
        return(
            <TodolistConsumer>

            {
              value=>{
              const {dispatch,taskArray,lengthValue} = value;
            
                 return(

 <div>
<div className="d-flex justify-content-md-center align-items-center vh-90 todoTable ">
<div className="card bg-light title2 overflow-scrolling" style={{width: 38+"rem"}}>
<div className = "card-body">

{
  error ? <div className = "alert alert-danger">Fill in the blanks
  </div>
  : null

}

</div>
   <div className="card-body">
    <h5 className="d-flex justify-content-md-center card-title title">    <img src="https://icons.iconarchive.com/icons/designcontest/ecommerce-business/128/notes-icon.png" className="  images" alt="Responsive image"/>
TODOLIST</h5>
   </div>
   
    
   <div className="card-body">

<form onSubmit ={this.addTask.bind(this,dispatch)}>
   <div className="input-group mb-3">
  <input type="text" className="form-control inputText" value={gorev} name="gorev" onChange={this.inputChange} placeholder="Write something to do" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
  <div className="input-group-append">
    <button className="btn btn-outline-secondary buttonText" type="submit">+</button>
  </div>
</div>
</form>
</div>
      {taskArray.length === 0 ? <div className = "alert alert-success">Enter a task
</div> : <TaskList className="overflow-scrolling"/>}
           

  <div className="card-body">
  <ProgressBar now={100/(taskArray.length/lengthValue())
  } label={lengthValue()} />
  
       
     <div className="d-flex flex-row-reverse bd-highlight">
  
  <Button  className="buttonPosition" variant="primary" onClick = {this.checkedDelete.bind(this,dispatch)}>Remove Checked</Button>
  <Button  className="buttonPosition" variant="primary" onClick={this.removeAll.bind(this,dispatch)}>Remove All</Button>

</div>
  </div>
</div>
 
</div>
 <div className="  floatRight"><a href="https://github.com/burakc3tin/react-todolist">Go to Github page
</a></div>
</div>
                )
              }
            }

            </TodolistConsumer>

        )



        
     
    }
}

export default Todolist;