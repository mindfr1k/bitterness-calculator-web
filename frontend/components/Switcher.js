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
  }

  render() {
    const children = React.Children.toArray(this.props.children).map(node => {
      return React.cloneElement(node, {
        onSwitch: this.handleSwitch
      })
    })

    return (
      <div>
        {children[this.state.position]}
      </div>
    )
  }
}