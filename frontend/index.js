import React from 'react'
import reactDOM from 'react-dom'
import 'materialize-css/dist/css/materialize.min.css'
import './css/style.css'

import { BitternessForm } from './components/BitternessForm'
import { AdditionalWaterForm } from './components/AdditionalWaterForm'
import { HopArray } from './components/HopArray'
import { Switcher } from './components/Switcher'
import { Footer } from './components/Footer'

reactDOM.render([
  <Switcher switchCaptions={ ['добавочной воды', 'пивной горечи'] }>
    <BitternessForm>
      <HopArray />
    </BitternessForm>
    <AdditionalWaterForm />
  </Switcher>,
  <Footer text={'&copy; 2019 Home Brewing. All rights reserved.'}></Footer> ],
  document.querySelector('#app')
)