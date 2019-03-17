import React, { Component } from 'react'

export class BitternessForm extends Component {
  constructor() {
    super()
    this.state = {
      initDensity: '',
      wortVolume: '',
      plannedBitterness: '',
      hops: [
        {
          weightInput: '',
          bitternessInput: '',
          brewingTime: ''
        }
      ],
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

  handleSwitch = e => {
    e.preventDefault()
    this.props.onSwitch(e)
    this.scrollToElement(this.top)
  }

  scrollToElement = elem => {
    elem.scrollIntoView({ behavior: 'smooth' })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { answerIsActive, invalidChars, ...rest } = this.state
    fetch(`https://pure-plateau-92383.herokuapp.com/calculator/beer-bitterness`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rest)
      })
      .then(res => res.json())
      .then(({ totalBitterness }) => {
        this.setState({
          totalBitterness,
          answerIsActive: true
        })
      })
      .catch(err => console.log(err))
    this.scrollToElement(this.bottom)
  }

  render() {
    const hopArray = React.Children.toArray(this.props.children).map(node =>
      React.cloneElement(node, {
        hops: this.state.hops,
        onInputChange: this.handleHopInput,
        onAddButtonClick: this.handleAddClick,
        onRemoveButtonClick: this.handleRemoveClick
      })
    )
    
    return (
      <form className="row" onSubmit={this.handleSubmit}>
        <p className="col s12" ref={el => this.top = el}></p>
        <div className="col s12">
          <p className="col s2">Начальная плотность, %</p>
          <div className="col s10 input-field">
            <input 
            name="initDensity"
            onChange={this.handleInputChange}
            value={this.state.initDensity}
            onKeyDown={this.handleKeyDown}
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
            value={this.state.wortVolume}
            onKeyDown={this.handleKeyDown}
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
            value={this.state.plannedBitterness}
            onKeyDown={this.handleKeyDown}
            type="number" 
            min="1" 
            max="100" 
            step="0.01" 
            required />
          </div>
        </div>
        {hopArray}
        <div className="col s12 center-align">
          <button className="btn-flat">
            Вычислить горечь
            <i className="material-icons right">assignment</i>
          </button>
        </div>
        <h5 className="col s12 center-align infoParagraph" ref={el => this.bottom = el}>
          {this.state.answerIsActive ? 
            <div>
              Планируемая горечь: <strong>{this.state.plannedBitterness}
            </strong> &nbsp;IBU, <br /> Фактическая горечь: <strong>{this.state.totalBitterness}
            </strong> &nbsp;IBU
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