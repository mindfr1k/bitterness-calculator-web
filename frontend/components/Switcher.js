import React, { Component } from 'react'

export class Switcher extends Component {
  constructor() {
    super()
    this.state = {
      position: 0
    }
  }

  handleSwitch = () => {
    this.setState(({ position }) => {
      return {
        position: 1 - position
      }
    })
    this.scrollToElement(this.top)
  }

  scrollToElement = elem => {
    elem.scrollIntoView({ behavior: 'smooth' })
  }

  render() {
    const children = React.Children.toArray(this.props.children).map(node => {
      return React.cloneElement(node, {
        onSubmit: this.handleSubmit
      })
    })

    return (
      <div ref={el => this.top = el}>
        {children[this.state.position]}
        <div className="col s12 center-align switch-button">
          <button className="btn-flat" onClick={this.handleSwitch}>
            Перейти к расчету { this.props.switchCaptions[this.state.position] }
            <i className="material-icons right">arrow_forward</i>
          </button>
        </div>
      </div>
    )
  }
}