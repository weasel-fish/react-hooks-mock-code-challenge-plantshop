import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plants, updatePlantsList}) {
  return (
    <ul className="cards">{plants.map(plant => <PlantCard key={plant.id} plant={plant} updatePlantsList={updatePlantsList}/>)}</ul>
  );
}

export default PlantList;
