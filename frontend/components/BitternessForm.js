import React, { Component } from 'react'

export class BitternessForm extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <form className="row">
        <p className="col s12"></p>
        <div className="col s12">
          <p className="col s2">Начальная плотность, %</p>
          <div className="col s10 input-field">
            <input type="number" min="1" step="0.01" required/>
          </div>
        </div>
      </form>
    )
  }
}