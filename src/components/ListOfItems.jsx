import SingleItem from "./SingleItem";



// getting the property name items from the prop object
const ListOfItems = ({items, removeItem, editItem}) => {

  return (
   <div className="items">

        {items.map((item)=>{ //<<-- each and every item present inside the items property
            return <SingleItem key={item.id} {...item} removeItem={removeItem} editItem={editItem}/> //<<-- passing down as prop to single component every property
        })}

   </div>
  );
  
};

export default ListOfItems