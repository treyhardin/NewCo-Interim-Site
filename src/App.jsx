import { createSignal } from 'solid-js'
import solidLogo from './assets/solid.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Hero from './components/hero/hero'
import Header from './components/header/header'
import Clients from './components/clients/clients'
import Services from './components/services/services'

function App() {
  const [count, setCount] = createSignal(0)

  return (
    <>
      <Header />
      <Hero />
      <Clients />
      <Services />
    </>
  )
}

export default App
