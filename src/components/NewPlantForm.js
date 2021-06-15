import React, { useState } from "react";

function NewPlantForm({addPlant}) {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    price: ''
  })
  
  function handleChange(prop, val) {
    const newData = {
      ...formData,
      [prop]: val
    }

    setFormData(newData)
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={(e) => {
        e.preventDefault()
        addPlant(formData)
      }}>
        <input value={formData.name} type="text" name="name" placeholder="Plant name" onChange={(e) => handleChange(e.target.name, e.target.value)} />
        <input value={formData.image} type="text" name="image" placeholder="Image URL" onChange={(e) => handleChange(e.target.name, e.target.value)}/>
        <input value={formData.price} type="number" name="price" step="0.01" placeholder="Price" onChange={(e) => handleChange(e.target.name, parseFloat(e.target.value))}/>
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
