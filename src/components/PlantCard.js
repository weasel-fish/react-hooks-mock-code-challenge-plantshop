import React, { useState } from "react";

function PlantCard({plant, updatePlantsList}) {
  const {name, image, price, id, stock} = plant
  const [inStock, setStock] = useState(stock === undefined ? true : stock)
  const [inputPriceState, setInputPrice] = useState('')
  const [priceState, setPrice] = useState(price)
  const [deleted, setDeleted] = useState(false)
  
  function handleClick() {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({stock: false})
    })
    .then(resp => resp.json())
    .then(() => {
      setStock(false)
      updatePlantsList()
    })
  }

  function onChange(e) {
    setInputPrice(e.target.value)
  }

  function handleSubmit() {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({price: parseFloat(inputPriceState)})
    })
    .then(resp => resp.json())
    .then(() => {
      setPrice(inputPriceState)
      setInputPrice('')
      updatePlantsList()
    })
  }
  
  function handleDelete() {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(() => {
      setDeleted(true)
    })
  }
  
  return !deleted ? (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {priceState}</p>
      {inStock != false ? (
        <button onClick={handleClick} className="primary">In Stock</button>
      ) : (
        <button>Out of Stock</button>
      )}
      <form onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}>
        <label>Update Price:</label>
        <input value={inputPriceState} onChange={onChange} type='number' placeholder='New Price Here'></input>
        <input type='submit'></input>
      </form>
      <button onClick={handleDelete}>Delete Plant</button>
    </li>)
   : null
}

export default PlantCard;
