import {useState, useCallback, useEffect} from 'react'
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
  const [captionsState, setCaptions] = useState(captions)

  const captionsArray = Object.values(captionsState)

  useEffect(() => {
    console.log(captionsState)
  }, [captionsState])

  const handleDataNumberChange = useCallback(
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

  const handleDataCaptionChange = useCallback(
    (e) =>
      setTimeout(() => {
        const {name, value} = e.target
        let newDataState, newCaptionsState

        if (dataState && dataState[0]?.data) {
          newDataState = [...dataState]
          newDataState[0].data[value.toLowerCase()] = 0
          if (captionsState) {
            newCaptionsState = {...captionsState}
            newCaptionsState[value.toLowerCase()] =
              value[0].toUpperCase() + value.slice(1)
          }
          delete newDataState[0].data[name]
          delete newCaptionsState[name]

          setCaptions(newCaptionsState)
          setDataState(newDataState)
        }
      }, 3000),
    [dataState, captionsState]
  )

  const handleDelete = useCallback(
    (e) => {
      const {name, value} = e.target
      let newDataState = [...dataState]
      let newCaptionsState = {...captionsState}

      delete newDataState[0].data[value.toLowerCase()]
      delete newCaptionsState[value.toLowerCase()]
      console.log(newCaptionsState, newDataState)
      setCaptions(newCaptionsState)
      setDataState(newDataState)
    },
    [dataState, captionsState]
  )
  const onClick = () =>
    toImg('svg', 'transparent-radar-chart', {scale: 3, quality: 1})

  return (
    <div className="App">
      <header className="App-header">
        <h2>Radar Chart</h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <RadarChart
            id={'transparent-radar-chart-id'}
            captions={captionsState}
            data={dataState}
            options={options}
            size={450}
          />
          <div className="caption-list">
            {dataState &&
              captionsArray.length > 0 &&
              captionsArray.map((caption, index) => (
                <div className="caption-item" key={`${caption}-${index}`}>
                  <input
                    className="caption-label"
                    defaultValue={caption}
                    onChange={handleDataCaptionChange}
                    name={caption.toLowerCase()}
                  />
                  <span>:</span>
                  <input
                    type="number"
                    onChange={handleDataNumberChange}
                    name={caption.toLowerCase()}
                    min="0"
                    step="1"
                    max="5"
                  />
                  <button
                    className="delete-button"
                    onClick={handleDelete}
                    value={caption}
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>

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
