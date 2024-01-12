import { Show, createEffect, createResource } from 'solid-js'
import styles from './partners.module.css'
import { getPartnersSettings, urlFor } from '../../utilities/sanity-client'

export default function Partners() {

  let logoContainer

  const [data] = createResource(getPartnersSettings)

  const maxLogos = 18
  const transitionDelay = 0.6 // Seconds
  const logoChangeDelay = 2 // Seconds

  const initLogoAnimation = () => {
    
    const logoElements = Array.from(logoContainer.children)
    const logoCount = logoElements.length

    let activeLogos = []
    let pendingLogos = []

    data()[0].logos.forEach((logo, i) => {

      const url = urlFor(logo).url()
      // console.log(url)

      if (i < maxLogos) {
        activeLogos.push(url)
      } else {
        pendingLogos.push(url)
      }
    })


    const pendingLogoCount = pendingLogos.length

    const cycleLogos = () => {

      setInterval(() => {

        const elementIndex = Math.floor(Math.random() * maxLogos)
        const randomElement = logoContainer.children[elementIndex]
        const activeImage = randomElement.querySelector('img')

        const randomPendingIndex = Math.floor(Math.random() * pendingLogoCount)
        const randomPendingLogo = pendingLogos[randomPendingIndex]

        // activeLogos[randomActiveIndex] = randomPendingLogo

        console.log(activeLogos)
        console.log(activeImage.src)

        activeLogos = activeLogos.filter((item, i) => item !== activeImage.src)
        activeLogos.push(randomPendingLogo)

        pendingLogos = pendingLogos.filter((item, i) => item !== randomPendingLogo)
        pendingLogos.push(activeImage.src)

        // pendingLogos[randomPendingIndex] = data()[0].logos[randomPendingIndex + maxLogos - 1]

        // console.log(activeLogos[randomActiveIndex])
        // console.log(pendingLogos[randomPendingIndex])

        // console.log(activeLogos)
        // console.log(pendingLogos)


        randomElement.dataset.activeAnimation = true

        setTimeout(() => {
          activeImage.src = randomPendingLogo
          randomElement.dataset.activeAnimation = false
        }, transitionDelay * 1000);


        // console.log(logoQueue)

      }, logoChangeDelay * 1000);

    }

    // cycleLogos()


  }

  createEffect(() => {
    if (data() && logoContainer) {
      initLogoAnimation()
    }
  })

  return (
    <section class={styles.partners} id="partners">
      <Show when={data()}>
        <div class={styles.sectionTitle}>
          <h3>{data()[0].heading}</h3>
        </div>
        <div class={styles.partnerLogos} ref={logoContainer}>
          <For each={data()[0].logos}>{(logo, i) => 
            <Show when={i() < maxLogos}>
              <div class={styles.partnerLogo}>
                <img src={urlFor(logo)} />
              </div>
            </Show>
          }
          </For>
        </div>
      </Show>
    </section>
  )
}