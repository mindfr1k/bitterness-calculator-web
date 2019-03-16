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
      ],
      answerIsActive: false
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
    fetch(`http://localhost:3502/calculator/beer-bitterness`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...this.state
        })
      })
      .then(res => res.json())
      .then(({ totalBitterness }) => {
        this.setState({
          totalBitterness,
          answerIsActive: true
        })
      })
      .catch(err => console.log(err))
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
            name="plannedBitterness"
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
        <h5 className="col s12 center-align infoParagraph">
          {this.state.answerIsActive ? 
            <div>
              Планируемая горечь: <strong>{this.state.plannedBitterness}
            </strong> &nbsp;IBU, <br /> Фактическая горечь: <strong>{this.state.totalBitterness}
            </strong> &nbsp;IBU
            </div> : ''}
        </h5>
      </form>
    )
  }
}