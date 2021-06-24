import React, { Component } from 'react';


const TodolistContext = React.createContext();




const reducer = (state , action) => { //reducer fonksiyonunu yazarız.
    switch(action.type){
     

        case "ADD_NEW_TASK":
            return {
                ...state,
                taskArray : [...state.taskArray , action.payload]
            }  
            
        case "DELETE_TASK":
            return {
                ...state,
                taskArray : state.taskArray.filter(task=>action.payload!==task.id)
            }

        case "EDIT_TEXT":
            return{
                ...state,
                taskArray: state.taskArray.map(task => task.id === action.payload.id ? action.payload : task)

            }
        case "DELETE_ALL":

            return {
                taskArray :[]
            }

        case "CHANGE_ISCHECKED":
            {
             return {
                ...state,
                taskArray: state.taskArray.map(task => task.id === action.payload.id ? action.payload : task)

             }
                
            }
        
        case "CHECKED_DELETE":
            {
                return{
            ...state,
 
            taskArray : state.taskArray.filter(task=>action.payload!==task.isChecked)


                }
            }


         
            default:
                return state
    }

}


export class Context extends Component {


    state = {
        taskArray : [
            {
                id : 1,
                gorev : "Notlar çıkartılacak.",
                isChecked : true
            } ,
            {
                id : 2,
                gorev : "Yeni kitap alınacak.",
                isChecked : true

            },
            {
                id : 3,
                gorev : "Hastane randevusu.",
                isChecked : true

            }
        ],
        dispatch : action => {   
            this.setState(state => reducer(state , action));
        } ,
        lengthValue : action => {
            return(            this.state.taskArray.filter(task=> task.isChecked === false).length
)
        }
       
    }
    render() {    

         return (

            <TodolistContext.Provider value={this.state}>

                {this.props.children}

            </TodolistContext.Provider>
            

        );
    }
}

const TodolistConsumer = TodolistContext.Consumer;
export default TodolistConsumer;