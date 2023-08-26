import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Form from "./components/Form";
import { nanoid } from "nanoid";
import ListOfItems from "./components/ListOfItems";
import Breadcrumbs from "./components/Breadcrumbs";



// FUNCTION = if the user who is using this app, exit the browser and comes back, he won't find the list of items he set earlier in the day. in order to save that list even when he exist or refresh the browser, we need to add those items to local storage. THIS FUNCTION is responsible for adding the array of constructed objects to local storage. adding this function to addItem function and removeItem function. this is to add to local storage the most updated value of the list of items

const getLocalStorage = () =>{

    let list = localStorage.getItem('list');

    if(list){

      list = JSON.parse(localStorage.getItem('list'));

    }else{

      list = [];

    };

    return list;
};


// const defaultList = JSON.parse(localStorage.getItem('list') || []); <<-- one liner for the getLocalStorage

const addToLocalStorage = (items) =>{
    localStorage.setItem('list', JSON.stringify(items));
};




const App = () => {

  /* this state includes an array of objects which will be iterated over and displayed: 

    - each object represent each item which is added by the user;
    - 3 properties per each object: completed, id and name
    - property name is going to arrive from the controlled input in the form component
    - the object is contructed inside a function which is invoked when the form is submitted by the user:
      - user write a task into the form field
      - user submits
      - function addItem is invoked
      - object is constructed
      - object is added into the items state value (which is an array of objects)
      - then it is passed down to list of item and single item components to be iterated and  displayed

  */

  // THIS RUNS FIRST OF ALL -  This line of code uses the useState hook to initialize the state variable items with an initial value obtained from the getLocalStorage() function. The useState hook is a special React function that allows you to add state to functional components.
  const [items, setItems] = useState(getLocalStorage());



  // FUNCTION =  when the user submits the form, this function is invoked <<-- it construct the object (an item) and it finally add it to the state variable
  const addItems = (itemName) =>{

    // construction of object
    const newItemAddedByUser = {
      id: nanoid(),
      name: itemName,
      completed: false,
    };

    // add to already existing items
    const newListOfItems = [...items, newItemAddedByUser];

    // updating the array
    setItems(newListOfItems);

    // adding to local storage
    addToLocalStorage(newListOfItems);

    toast.success('item added 👏')
  
  };


  // FUNCTION = responsible for removing task

  const removeItem = (nameID) =>{

    const newListOfItems = items.filter((item)=>{ //<<-- each and every object present into the items array of object constructed
      
      return item.id !== nameID;

    });

    setItems(newListOfItems);
    addToLocalStorage(newListOfItems);
    toast.success('item removed 😄')

  };


  /* 

    1.
  
  */

  const editItem = (itemId)=>{

  const newListOfItems = items.map((item)=>{

      if(item.id === itemId){
        const newItem = {...item, completed: !item.completed };
        return newItem;
      }else{
        return item
      };
    });

    setItems(newListOfItems)
    addToLocalStorage(newListOfItems);
  };
  

  return (
    <main>
      
      <Breadcrumbs title='To Do List'/>

      <section className="section-center">
        <ToastContainer position="bottom-center" autoClose={1500}/>
        <Form addItems={addItems}/>
        <ListOfItems items={items} removeItem={removeItem} editItem={editItem}/>
      </section>
      
    </main>
  )
}
export default App