import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
    this.onAdoptPet = this.onAdoptPet.bind(this)
  }

  updateFilter = event => {
   this.setState({
     filters: {
       type: event.target.value,
     }
   });
}

  handleClick = (event) => {
    if(this.state.filters.type === "all"){
      fetch("/api/pets")
      .then(response => response.json())
      .then(data =>  this.setState({pets:data})
    )
    }
     else {
       fetch(`/api/pets?type=${this.state.filters.type}`)
         .then(response => response.json())
         .then(json => {
           this.setState({
             pets: json
           })
         })
      }
  }

  onAdoptPet = (petId) => {
    let newlyAdoptedPet = this.state.pets.find(pet => pet.id === petId)
    newlyAdoptedPet.isAdopted = true

  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.updateFilter} onFindPetsClick={this.handleClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
