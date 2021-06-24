import React, { Component } from 'react';
import Tasks from './Tasks';
import TodolistConsumer from './Context';
import OverflowScrolling from 'react-overflow-scrolling';

class TaskList extends Component {
    render() {
        // return (

        return(
            
            
            <TodolistConsumer>

                    {
                        value => {
                    const {taskArray} = value;

                    return(


                    <ul className="list-group list-group-flush overflow-scrolling">
                         
                         
                         {
                             taskArray.map(task=>{
                                 return(
                                    <Tasks
                                    key = {task.id}
                                    id = {task.id}
                                    gorev = {task.gorev}
                                    isChecked = {task.isChecked}
                                    
                                    />
  
                                 )
                             })
                         }
                         
                        

                        </ul>

                    );

                        }
                    }

        </TodolistConsumer>
        
        
        )
       

        //     <ul className="list-group list-group-flush">
        //     <Tasks/>
          

        //   </ul>
             
        // );
    }
}

export default TaskList;