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
      isLoading: false,
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

  scrollToElement = element => {
    element.scrollIntoView({ behavior: 'smooth' })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { answerIsActive, isLoading, invalidChars, ...rest } = this.state
    this.setState({
      isLoading: true
    })
    fetch(`https://beer-helper.herokuapp.com/calculator/additional-water`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rest)
      })
      .then(res => res.json())
      .then(({ additionalWater }) => {
        this.scrollToElement(this.bottom)
        this.setState({
          additionalWater,
          isLoading: false,
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
          <p className="col s4 offset-s4 l2 center-align">Объем сусла после промывки, л</p>
          <div className="col s4 offset-s4 l10 input-field">
            <input 
            name="wortVolume"
            onChange={this.handleInputChange}
            value={this.state.wortVolume}
            onKeyDown={this.handleKeyDown}
            type="number" 
            min="1"
            max="100000"
            step="0.01"
            required />
          </div>
        </div>
        <div className="col s12">
          <p className="col s4 offset-s4 l2 center-align">Температура сусла после промывки, &#8451;</p>
          <div className="col s4 offset-s4 l10 input-field">
            <input 
            name="wortTemperature"
            onChange={this.handleInputChange}
            value={this.state.wortTemperature}
            onKeyDown={this.handleKeyDown}
            type="number" 
            min="20" 
            max="200"
            step="0.01"
            required />
          </div>
        </div>
        <div className="col s12">
          <p className="col s4 offset-s4 l2 center-align">Плотность после промывки, %</p>
          <div className="col s4 offset-s4 l10 input-field">
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
          <p className="col s4 offset-s4 l2 center-align">Плотность по рецепту, %</p>
          <div className="col s4 offset-s4 l10 input-field">
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
          <p className="col s4 offset-s4 l2 center-align">Время варки, мин</p>
          <div className="col s4 offset-s4 l10 input-field">
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
        <h5 className="col s12 center-align infoParagraph" ref={el => this.bottom = el}>
          {this.state.isLoading ?
            <div className="preloader-wrapper big active">
              <div className="spinner-layer spinner-yellow-only">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div><div className="gap-patch">
                  <div className="circle"></div>
                </div><div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div> : ''
          }
          {this.state.answerIsActive && !this.state.isLoading ?
            <div>
              Количество добавочной воды: <strong>{this.state.additionalWater}
              </strong> л
            </div> : ''
          }
        </h5>
      </form>
    )
  }
}