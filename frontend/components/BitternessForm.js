import React, { Component } from 'react'

export class BitternessForm extends Component {
  constructor() {
    super()
    this.state = {}
  }

  handleInputChange = ({ target: { name, value }}) => {
    this.setState({
      [name]: value
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
            value={this.state[name]}
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
            value={this.state[name]} 
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
            value={this.state[name]} 
            type="number" 
            min="1" 
            max="100" 
            step="0.01" 
            required />
          </div>
        </div>
        <div class="col s12 center-align">
          <button class="btn-flat">
            Вычислить горечь
            <i class="material-icons right">assignment</i>
          </button>
        </div>
      </form>
    )
  }
}