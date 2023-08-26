import { useState } from "react"
import { toast } from "react-toastify";



const Form = ({addItems}) => {

   const [newItemName, setNewItemName] = useState('');



    // function responsible for      
    let handleSubmit = (e) =>{

        e.preventDefault();

        // early return. if user submits an empty value
        if(!newItemName){
            toast.warning('please enter value! 😊')
            return
        };

        addItems(newItemName); //<<-- invoking function which constructs the object (from app component)

        setNewItemName(''); //<<-- clear input field
    
    }


  return (
    <form onSubmit={handleSubmit}>

        <h4>to do list</h4>

        <div className="form-control">

            {/* controlled input */}
            <input className="form-input" type="text" value={newItemName} onChange={(e)=>{(setNewItemName(e.target.value))}} />

            <button className="btn" type="submit">add item</button>

        </div>
    </form>
  )
}
export default Form