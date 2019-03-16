import React, { Component } from 'react'

export class AdditionalWaterForm extends Component {
  constructor() {
    super()
    this.state = {
      answerIsActive: false
    }
  }

  handleInputChange = ({ target: { name, value }}) => {
    this.setState({
      [name]: value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    fetch(`http://localhost:3502/calculator/additional-water`,
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
          <p className="col s2">Объем сусла перед кипячением, л</p>
          <div className="col s10 input-field">
            <input 
            name="wortVolume"
            onChange={this.handleInputChange}
            type="number" 
            min="1" 
            step="0.01"
            required />
          </div>
        </div>
      </form>
    )
  }
}