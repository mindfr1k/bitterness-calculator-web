import React, { Component } from 'react'

export class AdditionalWaterForm extends Component {
  constructor() {
    super()
    this.state = {
      wortVolume: '',
      wortTemperature: '',
      boilDensity: '',
      plannedDensity: '',
      brewingTime: '',
      answerIsActive: false,
      invalidChars: [ '-', '+', 'e', 'E' ]
    }
  }

  handleInputChange = ({ target: { name, value }}) => {
    this.setState({
      [name]: value
    })
  }

  handleKeyDown = e => {
    this.state.invalidChars.includes(e.key)
    ? e.preventDefault()
    : ''
  }

  handleSwitch = e => {
    e.preventDefault()
    this.props.onSwitch(e)
  }

  handleSubmit = e => {
    e.preventDefault()
    const { answerIsActive, ...rest } = this.state
    fetch(`http://localhost:3502/calculator/additional-water`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rest)
      })
      .then(res => res.json())
      .then(({ additionalWater }) => {
        this.setState({
          additionalWater,
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
          <p className="col s2">Объем сусла перед кипячением, л</p>
          <div className="col s10 input-field">
            <input 
            name="wortVolume"
            onChange={this.handleInputChange}
            value={this.state.wortVolume}
            onKeyDown={this.handleKeyDown}
            type="number" 
            min="1" 
            step="0.01"
            required />
          </div>
        </div>
        <div className="col s12">
          <p className="col s2">Температура сусла, &#8451;</p>
          <div className="col s10 input-field">
            <input 
            name="wortTemperature"
            onChange={this.handleInputChange}
            value={this.state.wortTemperature}
            onKeyDown={this.handleKeyDown}
            type="number" 
            min="20" 
            step="0.01"
            required />
          </div>
        </div>
        <div className="col s12">
          <p className="col s2">Плотность перед кипячением, %</p>
          <div className="col s10 input-field">
            <input 
            name="boilDensity"
            onChange={this.handleInputChange}
            value={this.state.boilDensity}
            onKeyDown={this.handleKeyDown}
            type="number" 
            min="1"
            max="100" 
            step="0.01"
            required />
          </div>
        </div>
        <div className="col s12">
          <p className="col s2">Плотность по рецепту, %</p>
          <div className="col s10 input-field">
            <input 
            name="plannedDensity"
            onChange={this.handleInputChange}
            value={this.state.plannedDensity}
            onKeyDown={this.handleKeyDown}
            type="number" 
            min="1"
            max="100" 
            step="0.01"
            required />
          </div>
        </div>
        <div className="col s12">
          <p className="col s2">Время варки, мин</p>
          <div className="col s10 input-field">
            <input 
            name="brewingTime"
            onChange={this.handleInputChange}
            value={this.state.brewingTime}
            onKeyDown={this.handleKeyDown}
            type="number" 
            min="60"
            max="120" 
            step="0.01"
            required />
          </div>
        </div>
        <div className="col s12 center-align">
          <button className="btn-flat">
            Вычислить количество добавочной воды
            <i className="material-icons right">assignment</i>
          </button>
        </div>
        <h5 className="col s12 center-align infoParagraph">
          {this.state.answerIsActive ?
            <div>
              Количество добавочной воды: <strong>{this.state.additionalWater}
              </strong> л
            </div> : ''
          }
        </h5>
        <div className="col s12 center-align">
          <button className="btn-flat" onClick={this.handleSwitch}>
            Перейти к расчету добавочной воды
            <i className="material-icons right">arrow_forward</i>
          </button>
        </div>
      </form>
    )
  }
}