import React, { Component } from 'react'

import { HopArray } from './HopArray'

export class BitternessForm extends Component {
  constructor() {
    super()
    this.state = {
      hops: [
        {
          weightInput: '',
          bitternessInput: '',
          brewingTime: ''
        }
      ]
    }
  }

  handleInputChange = ({ target: { name, value }}) => {
    this.setState({
      [name]: value
    })
  }

  handleHopInput = ({ name, value }) => {
    const [ field, i ] = name.split('-')
    this.setState(({ hops }) => {
      hops[i][field] = value
      return {
        hops
      }
    })
  }

  handleAddClick = () => {
    this.setState(({ hops }) => {
      hops.push({
        weightInput: '',
        bitternessInput: '',
        brewingTime: ''
      })
      return {
        hops
      }
    })
  }

  handleRemoveClick = () => {
    this.setState(({ hops }) => {
      hops.pop()
      return {
        hops
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log(this.state)
  }

  render() {
    return (
      <form className="row" onSubmit={this.handleSubmit}>
        <p className="col s12"></p>
        <div className="col s12">
          <p className="col s2">Начальная плотность, %</p>
          <div className="col s10 input-field">
            <input 
            name="initDensity"
            onChange={this.handleInputChange}
            type="number" 
            min="1" 
            max="100" 
            step="0.01"
            required />
          </div>
        </div>
        <div className="col s12">
          <p className="col s2">Объем сусла перед варкой, л</p>
          <div className="col s10 input-field">
            <input 
            name="wortVolume"
            onChange={this.handleInputChange}
            type="number" 
            min="10" 
            step="0.01" 
            required />
          </div>
        </div>
        <div className="col s12">
          <p className="col s2">Планируемая горечь, %</p>
          <div className="col s10 input-field">
            <input 
            name="plannedDensity"
            onChange={this.handleInputChange}
            type="number" 
            min="1" 
            max="100" 
            step="0.01" 
            required />
          </div>
        </div>
        <HopArray 
        hops={this.state.hops}
        onInputChange={this.handleHopInput}
        onAddButtonClick={this.handleAddClick}
        onRemoveButtonClick={this.handleRemoveClick} />
        <div className="col s12 center-align">
          <button className="btn-flat">
            Вычислить горечь
            <i className="material-icons right">assignment</i>
          </button>
        </div>
      </form>
    )
  }
}