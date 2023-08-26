


const SingleItem = ({id, completed, name, removeItem, editItem}) => {

  

    return (
      <div className="single-item">

        {/* when the input is a checkbox, there is no value attribute for the controlled input but need to use checked as attribute */}
        <input type="checkbox" checked={completed} onChange={()=> editItem(id)} />

        {/* adding style based on conditional rendering */}
        <p style={{textDecoration: completed && 'line-through'}}>{name}</p>

        {/* invoking the removeItem function when the button remove is clicked */}
        <button onClick={()=>{removeItem(id)}} className="btn remove-btn" type="button">remove</button>

      </div>
    )


};


export default SingleItem