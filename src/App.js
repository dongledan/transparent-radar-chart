import {useState, useCallback} from 'react'
import RadarChart from 'react-svg-radar-chart'
import toImg from 'react-svg-to-image'

import './App.css'

function App() {
  const initData = [
    {
      data: {
        food: 0,
        price: 0,
        environment: 0,
        service: 0,
      },
      meta: {color: '#add8e6'},
    },
  ]

  const captions = {
    // columns
    food: 'Food',
    service: 'Service',
    environment: 'Environment',
    price: 'Price',
  }

  const options = {
    scales: 5,
    dots: true,
  }

  const [dataState, setDataState] = useState(initData)

  const handleDataChange = useCallback(
    (e) => {
      const {name, value} = e.target

      if (dataState && dataState[0]?.data) {
        const newDataState = dataState.map((object) => {
          const updatedObject = (object.data[name] = Number(value) / 5)
          return {...object, updatedObject}
        })

        setDataState(newDataState)
      }
    },
    [dataState]
  )

  const onClick = () => toImg('svg', 'transparent-radar-chart')

  return (
    <div className="App">
      <header className="App-header">
        <h2>Radar Chart</h2>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <RadarChart
            id={'transparent-radar-chart-id'}
            captions={captions}
            data={dataState}
            options={options}
            size={450}
          />
          {dataState && (
            <div className="caption-list">
              <div className="caption-item">
                <label className="caption-label">Food:</label>
                <input
                  type="number"
                  onChange={handleDataChange}
                  name="food"
                  min="0"
                  step="1"
                  max="5"
                />
              </div>
              <div className="caption-item">
                <label className="caption-label">Price:</label>
                <input
                  type="number"
                  onChange={handleDataChange}
                  name="price"
                  min="0"
                  step="1"
                  max="5"
                />
              </div>
              <div className="caption-item">
                <label className="caption-label">Service:</label>
                <input
                  type="number"
                  onChange={handleDataChange}
                  name="service"
                  min="0"
                  step="1"
                  max="5"
                />
              </div>
              <div className="caption-item">
                <label className="caption-label">Environment:</label>
                <input
                  type="number"
                  onChange={handleDataChange}
                  name="environment"
                  min="0"
                  step="1"
                  max="5"
                />
              </div>
            </div>
          )}
          <div>
            <button className="btn striped-shadow dark" onClick={onClick}>
              <span>Save Image</span>
            </button>
          </div>
        </div>
      </header>
      <footer>
        Made by{' '}
        <span>
          <a
            className="effect-underline"
            href="https://dannyboy.dev/"
            rel="noreferrer noopener"
            target="_blank"
          >
            Danny
          </a>{' '}
        </span>
        ✌️
      </footer>
    </div>
  )
}

export default App
