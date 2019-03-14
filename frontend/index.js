import React from 'react'
import reactDOM from 'react-dom'
import 'materialize-css/dist/css/materialize.min.css'
import './css/style.css'

import { BitternessForm } from './components/BitternessForm'

reactDOM.render(
  <BitternessForm />,
  document.querySelector('#app')
)