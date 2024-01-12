import './App.css'
import Hero from './components/hero/hero'
import Header from './components/header/header'
import Clients from './components/clients/clients'
import Services from './components/services/services'
import Lenis from '@studio-freight/lenis'
import Partners from './components/partners/partners'
import Agencies from './components/agencies/agencies'
import Footer from './components/footer/footer'
import Contact from './components/contact/contact'
import About from './components/about/about'


export const lenis = new Lenis()

function App() {


  lenis.on('scroll', (e) => {
    // console.log(e)
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  return (
    <>
      <Header />
      <Hero />
      <Clients />
      <About />
      <Services />
      <Partners />
      <Contact />
      <Agencies />
      <Footer />
    </>
  )
}

export default App
