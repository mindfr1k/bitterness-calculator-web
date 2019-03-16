import React from 'react'
import reactDOM from 'react-dom'
import 'materialize-css/dist/css/materialize.min.css'
import './css/style.css'

import { BitternessForm } from './components/BitternessForm'
import { AdditionalWaterForm } from './components/AdditionalWaterForm'
import { HopArray } from './components/HopArray'
import { Switcher } from './components/Switcher'

reactDOM.render(
  <Switcher>
    <BitternessForm>
      <HopArray />
    </BitternessForm>
    <AdditionalWaterForm />
  </Switcher>,
  document.querySelector('#app')
)