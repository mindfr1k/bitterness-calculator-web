import React, { Component } from 'react'

export class HopArray extends Component {
  constructor() {
    super()
  }

  handleInputChange = ({ target }) => {
    this.props.onInputChange(target)
  }

  handleAddClick = e => {
    e.preventDefault()
    this.props.onAddButtonClick(e)
  }

  handleRemoveClick = (e, i) => {
    e.preventDefault()
    this.props.onRemoveButtonClick(i)
  }

  handleKeyDown = e => {
    this.props.onHopKeyDown(e)
  }

  render() {
    const hops = this.props.hops.map((hop, i, hops) => {
      return (
        <div key={i} className="col s12">
          <p className="col s2 center-align">Хмель {i + 1}</p>
          <p className="col s3 center-align">Вес, гр</p>
          <p className="col s3 center-align">Горечь, %</p>
          <p className="col s3 center-align">Время варки, мин</p>
          <p className="col s1"></p>
          {i !== 0 ?
            <div className="col s2 center-align">
              <button className="btn-flat" onClick={e => this.handleRemoveClick(e, i)}>
                <i className="material-icons center">remove</i>
              </button>
            </div> : <p className="col s2"></p>
          }
          <div className="col s3 center-align input-field">
            <input 
            name={`weightInput-${i}`}
            onChange={this.handleInputChange}
            value={hop.weightInput}
            onKeyDown={this.handleKeyDown}
            type="number" 
            min="1" 
            max="100000"
            step="0.01" 
            required />
          </div>
          <div className="col s3 center-align input-field">
            <input 
            name={`bitternessInput-${i}`}
            onChange={this.handleInputChange}
            value={hop.bitternessInput}
            onKeyDown={this.handleKeyDown}
            type="number" 
            min="1" 
            max="100" 
            step="0.01" 
            required />
          </div>
          <div className="col s3 center-align input-field">
            <input 
            name={`brewingTime-${i}`}
            onChange={this.handleInputChange}
            value={hop.brewingTime}
            onKeyDown={this.handleKeyDown}
            type="number" 
            min="5" 
            max="120" 
            step="0.01" 
            required />
          </div>
          {i === hops.length - 1 ? 
            <div className="col s1 center-align">
              <button className="btn-flat" onClick={this.handleAddClick}>
                <i className="material-icons center">add</i>
              </button>
            </div> :
            <p className="col s1"></p>
          }
        </div>
      )
    })

    return (
      <div className="col s12 hopArray">
        <h5 className="col s12 center-align">Внесение хмеля</h5>
        {hops}
      </div>
    )
  }
}