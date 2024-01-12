import { Show, createEffect, createResource } from 'solid-js'
import styles from './partners.module.css'
import { getPartnersSettings, urlFor } from '../../utilities/sanity-client'
import { observer } from '../../utilities/intersectionObserver'

export default function Partners() {

  let logoContainer

  const [data] = createResource(getPartnersSettings)

  const maxLogos = 18
  const transitionDelay = 0.6 // Seconds
  const logoChangeDelay = 2 // Seconds
  
  const addInlineLogo = (el, string) => {

    // console.log(el.textContent)

    const splitString = string.split('$')

    if (data()[0].inlineLogo) {

      splitString.forEach((string, i) => {
        const node = document.createElement('span')
        node.textContent = string
        el.appendChild(node)
  
        if (i == 0) {
          const image = document.createElement('img')
          image.src = urlFor(data()[0].inlineLogo).width(800).url()
          image.dataset.inline = true
          el.appendChild(image)
  
        }
      })
    }

    



  }

  return (
    <section class={styles.partners} id="partners">
      <Show when={data()}>
        <div class={styles.sectionTitle} data-animated="false" ref={el => observer.observe(el)}>
          <h1 ref={el => addInlineLogo(el, data()[0].heading)}></h1>
        </div>
        <div class={styles.partnerLogos} ref={logoContainer}>
          <For each={data()[0].logos}>{(logo, i) => 
            <Show when={i() < maxLogos}>
              <div class={styles.partnerLogo} data-animated="false" data-animation-delay={i() * 20} ref={el => observer.observe(el)}>
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