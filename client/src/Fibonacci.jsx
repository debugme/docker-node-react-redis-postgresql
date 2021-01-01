import React, { Component, Fragment } from 'react'

export class Fibonacci extends Component {
  state = {
    seenIndicies: [],
    values: {},
    index: '',
  }

  render() {
    return (
      <Fragment>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="index">Enter your index:</label>
            <input
              type="number"
              value={this.state.index}
              onChange={this.handleChange}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div>
          <h3>Indicies I have seen:</h3>
          <p>{this.renderIndicies()}</p>
        </div>
        <div>
          <h3>Calculated Values:</h3>
          {this.renderValues()}
        </div>
      </Fragment>
    )
  }

  handleChange = (event) => {
    const index = event.target.value.trim()
    this.setState({ index })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    await this.postIndex(this.state.index)
    this.setState(
      {
        index: '',
      },
      async () => {
        await this.fetchValues()
        await this.fetchIndicies()
      }
    )
  }

  renderIndicies() {
    return this.state.seenIndicies.map(({ number }) => number).join(', ')
  }

  renderValues() {
    return this.state.seenIndicies.map(({ number }) => {
      const value = this.state.values[number]
      const text = `For index ${number} I calculated ${value}`
      return <div key={number}>{text}</div>
    })
  }

  componentDidMount() {
    this.fetchValues()
    this.fetchIndicies()
  }

  async postIndex(index) {
    console.log('[client] posting ', index, typeof index)
    try {
      const url = '/api/values'
      const options = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index }),
      }
      await fetch(url, options)
    } catch (error) {
      console.error('[client] postIndex() failed with error ', error)
    }
  }

  async fetchIndicies() {
    try {
      const url = '/api/values/all'
      const options = { method: 'get' }
      const response = await fetch(url, options)
      if (response.ok) {
        const seenIndicies = await response.json()
        this.setState({ seenIndicies })
      }
    } catch (error) {
      console.error('[client] fetchIndicies() failed with error ', error)
    }
  }

  async fetchValues() {
    try {
      const url = '/api/values/current'
      const options = { method: 'get' }
      const response = await fetch(url, options)
      if (response.ok) {
        const values = await response.json()
        this.setState({ values })
      }
    } catch (error) {
      console.error('[client] fetchValues() failed with error ', error)
    }
  }
}
