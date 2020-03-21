import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { ThemeProvider, greyVest } from 'contexture-react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import Navbar from './Navbar'
import Map from './Map'
import Cases from './Cases'
import Notify from './Notify'
import Contribute from './Contribute'
import About from './About'

import s from '../assets/css/app.css'

let state = observable({
  viewport: { center: [0, 0], zoom: 0 }
})

const updateViewport = (viewport) => {
  state.viewport = viewport
}

const App = observer(() => 
  <ThemeProvider theme={ greyVest }>
    <BrowserRouter>
      <div className={s.main}>
        <Navbar />
        <div className={s.container}>
          <div className={s.row}>
            <Switch>
              <Route path='/cases' component={() => <Cases viewport={state.viewport} />} />
              <Route path='/notify' component={Notify} />
              <Route path='/contribute' component={Contribute} />
              <Route path='/about' component={About} />
              
              <Route path='/' component={() => <Map updateViewport={updateViewport} />} />
              <Route render={() => <h3>No Match</h3>} />
            </Switch>
         </div>
       </div>
      </div>
    </BrowserRouter>
  </ThemeProvider>
)

export default App
