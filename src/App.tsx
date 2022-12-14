import React from 'react'
import Notification from './components/notification'
import notfContext from './context/notifContext'
import Layout from './components/layout'
// eslint-disable-next-line no-unused-vars
import { register } from './swRegisteration'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/app'
import X from './components/x'

function App() {
  // eslint-disable-next-line no-unused-vars
  const [update, setUpdate] = React.useState(false)
  /*   React.useEffect(() => {
    register({
      onUpdate: (registration: any) => {
        if (registration && registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' })
        }
        setUpdate(true)
      },
    })
  }) */
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/x" element={<X />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <notfContext.Provider value={{ update, close: () => window.location.reload() }}>
        {update && <Notification />}
      </notfContext.Provider>
    </>
  )
}

export default App
