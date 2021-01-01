import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { OtherPage } from './OtherPage'
import { Fibonacci } from './Fibonacci'

function App() {
  return (
    <Fragment>
      <div>
        <Router>
          <div>
            <Link to="/">Home</Link>
            <Link to="/otherpage">Other Page</Link>
          </div>
          <Route exact path="/">
            <Fibonacci />
          </Route>
          <Route path="/otherpage">
            <OtherPage />
          </Route>
        </Router>
      </div>
    </Fragment>
  )
}

export default App
