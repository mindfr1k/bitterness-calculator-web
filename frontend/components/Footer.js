import React, { Component } from 'react'

export class Footer extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="copyright-footer">
        { this.props.text }
      </div>
    )
  }

}