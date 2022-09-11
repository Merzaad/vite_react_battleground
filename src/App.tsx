import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import { useEthData } from './hooks/useEthData'
import ethContext from './context/ethContext'
import FetchButton from './components/fetchButton'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const { data, status, fetch, error } = useEthData()
  const [activeTab, setActiveTab] = useState(1)
  const price = data?.market_price_usd || status
  React.useEffect(() => {
    console.log('app rendered')
  })
  React.useEffect(() => {
    const alert = setTimeout(() => window.alert(activeTab), 1000)
    return () => clearTimeout(alert)
  }, [activeTab])
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="box">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      </div>
      <div className="box">
        {price && `ethereum price: ${price}`} {error}
        <ethContext.Provider value={{ status, fetch }}>
          <FetchButton />
        </ethContext.Provider>
      </div>
      <div className="box">
        <div className="btns">
          <button onClick={() => setActiveTab(1)}>tab1</button>
          <button onClick={() => setActiveTab(2)}>tab2</button>
        </div>
        <div className="tab">
          {`active: ${activeTab}`}
        </div>
      </div>
    </div>
  )
}

export default App
