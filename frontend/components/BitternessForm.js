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

  handleHopInput = ({ name, value }) => {
    const [ field, i ] = name.split('-')
    this.setState(({ hops }) => {
      return {
        hops: hops.map((item, index) => {
          if (index == i)
            item[field] = value
          return item
        })
      }
    })
  }

  handleAddClick = () => {
    this.setState(({ hops }) => {
      return {
        hops: [ ...hops, {
          weightInput: '',
          bitternessInput: '',
          brewingTime: ''
        }]
      }
    })
  }

  handleRemoveClick = index => {
    this.setState(({ hops }) => {
      return {
        hops: hops.filter((_, i) => i !== index)
      }
    })
  }

  scrollToElement = elem => {
    elem.scrollIntoView({ 
      behavior: 'smooth'
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { answerIsActive, isLoading, invalidChars, ...rest } = this.state
    this.setState({
      isLoading: true
    })
    fetch(`https://beer-helper.herokuapp.com/calculator/beer-bitterness`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rest)
      })
      .then(res => res.json())
      .then(({ totalBitterness }) => {
        this.scrollToElement(this.bottom)
        this.setState({
          totalBitterness,
          isLoading: false,
          answerIsActive: true
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    const hopArray = React.Children.toArray(this.props.children).map(node =>
      React.cloneElement(node, {
        hops: this.state.hops,
        onInputChange: this.handleHopInput,
        onAddButtonClick: this.handleAddClick,
        onRemoveButtonClick: this.handleRemoveClick,
        onHopKeyDown: this.handleKeyDown
      })
    )
    
    return (
      <form className="row" onSubmit={this.handleSubmit}>
        <p className="col s12"></p>
        <div className="col s12">
          <p className="col s4 offset-s4 l2 center-align">Начальная плотность по рецепту, %</p>
          <div className="col s4 offset-s4 l10 input-field">
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
          <p className="col s4 offset-s4 l2 center-align">Объем сусла перед варкой, л</p>
          <div className="col s4 offset-s4 l10 input-field">
            <input 
            name="wortVolume"
            onChange={this.handleInputChange}
            value={this.state.wortVolume}
            onKeyDown={this.handleKeyDown}
            type="number" 
            min="10" 
            max="100000"
            step="0.01" 
            required />
          </div>
        </div>
        <div className="col s12">
          <p className="col s4 offset-s4 l2 center-align">Планируемая горечь, IBU</p>
          <div className="col s4 offset-s4 l10 input-field">
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
              Планируемая горечь: <strong>{this.state.plannedBitterness}
            </strong> &nbsp;IBU, <br /> Фактическая горечь: <strong>{this.state.totalBitterness}
            </strong> &nbsp;IBU
            </div> : ''
          }
        </h5>
      </form>
    )
  }
}