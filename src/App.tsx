import React, { useState } from 'react'
import { useCoinData } from './hooks/useCoinData'
import ethContext from './context/ethContext'
import FetchButton from './components/fetchButton'
import Notification from './components/notification'
import notfContext from './context/notifContext'
import Menu from './components/menu'
import { register } from './swRegisteration'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const {
    data: ethDara,
    status: ethStatus,
    fetch: ethFetch,
    error: ethError,
  } = useCoinData('ethereum')
  const {
    data: btcData,
    status: btcStatus,
    fetch: btcFetch,
    error: btcError,
  } = useCoinData('bitcoin')
  const [update, setUpdate] = useState(false)
  const [activeTab, setActiveTab] = useState(1)
  const ethPrice = ethDara?.market_price_usd || ethStatus
  const btcPrice = btcData?.market_price_usd || btcStatus
  React.useEffect(() => {
    console.log('app rendered')
  })
  React.useEffect(() => {
    register({
      onSuccess: (registration: any) => console.log('success'),
      onUpdate: (registration: any) => {
        if (registration && registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' })
        }
        setUpdate(true)
      },
    })
  })
  React.useEffect(() => {
    const alert = setTimeout(() => console.log(`activetab: ${activeTab}`), 1000)
    return () => clearTimeout(alert)
  }, [activeTab])
  return (
    <>
      <div className="App">
        <div className={`${update && 'blur'}`}>
          <div className="logos">
            <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
              <img src="/vite.svg" className="logo" alt="Vite logo" />
            </a>
            <a href="https://reactjs.org" target="_blank" rel="noreferrer">
              <img src="/react.svg" className="logo react" alt="React logo" />
            </a>
          </div>
          <h1 className="header">reactVite v0.0.4</h1>
          <div className="box">
            <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
          </div>
          <div className="box">
            {ethPrice && `ethereum price: ${ethPrice}`} {ethError}
            <ethContext.Provider value={{ status, fetch: ethFetch }}>
              <FetchButton />
            </ethContext.Provider>
          </div>
          <div className="box">
            {btcPrice && `bitcoin price: ${btcPrice}`} {btcError}
            <ethContext.Provider value={{ status, fetch: btcFetch }}>
              <FetchButton />
            </ethContext.Provider>
          </div>
          <div className="box">
            <div className="btns">
              <button onClick={() => setActiveTab(1)}>tab1</button>
              <button onClick={() => setActiveTab(2)}>tab2</button>
            </div>
            <div className="tab">{`active: ${activeTab}`}</div>
          </div>
        </div>
        <notfContext.Provider value={{ update, close: () => window.location.reload() }}>
          {update && <Notification />}
        </notfContext.Provider>
      </div>
      <Menu />
    </>
  )
}

export default App
