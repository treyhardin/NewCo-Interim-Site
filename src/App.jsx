import './App.css'
// import Hero from './components/sections/hero/hero'
import Header from './components/header/header'
import Clients from './components/sectionClients/sectionClients'
import Services from './components/sectionServices/sectionServices'
import Lenis from '@studio-freight/lenis'
import Partners from './components/sectionPartners/sectionPartners'
import Agencies from './components/sectionAgencies/sectionAgencies'
import Footer from './components/footer/footer'
import Contact from './components/sectionContact/sectionContact'
import About from './components/sectionAbout/sectionAbout'
import Projects from './components/sectionProjects/sectionProjects'
import { Route, Router } from "@solidjs/router"
import Home from './routes/home'


export const lenis = new Lenis()

function App() {

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  return (
    <>
      <Header />
      <Router>
        <Route path="/" component={Home} />
      </Router>
      {/* <Hero />
      <Clients />
      <About />
      <Services />
      <Contact />
      <Projects />
      <Partners />
      <Agencies /> */}
      <Footer />
    </>
  )
}

export default App
