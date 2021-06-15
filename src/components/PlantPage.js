import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([])
  const [filteredPlants, setFiltered] = useState([])
  const [searchStr, setSearchStr] = useState('')

  useEffect(() => {
    fetch('http://localhost:6001/plants')
    .then(resp => resp.json())
    .then(plantArray => {
      setPlants(plantArray)
    })
  }, [])

  useEffect(() => {
    setFiltered(plants)
  }, [plants])

  function addPlant(newPlant) {
    fetch('http://localhost:6001/plants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPlant)
    })
    .then(resp => resp.json())
    .then((plant) => {
      const newArray = [...plants]
      newArray.push(plant)
      setPlants(newArray)
    })
  }

  function handleSearch(string) {
    setSearchStr(string)
    const test = string.toLowerCase()
    const newArray = plants.filter(plant => {
      const name = plant.name.toLowerCase()
      return name.includes(test)
    })
    setFiltered(newArray)
  }

  function updatePlantsList() {
    fetch('http://localhost:6001/plants')
    .then(resp => resp.json())
    .then(plantArray => {
      setPlants(plantArray)
      handleSearch(searchStr)
    })
  }

  return (
    <main>
      <NewPlantForm addPlant={addPlant}/>
      <Search handleSearch={handleSearch}/>
      <PlantList plants={filteredPlants} updatePlantsList={updatePlantsList}/>
    </main>
  );
}

export default PlantPage;
