import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { OtherPage } from './OtherPage'
import { Fibonacci } from './Fibonacci'

function App() {
  return (
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
  )
}

export default App
