import styles from './sectionPartners.module.css'

import { Show } from 'solid-js'
import { urlFor } from '../../utilities/sanity-client'
import { navigationObserver, observer } from '../../utilities/intersectionObserver'

export default function PartnersSection(props) {

  let logoContainer

  const maxLogos = 18
  
  const addInlineLogo = (el, string) => {

    const splitString = string.split('$')

    if (props.content.inlineLogo) {

      splitString.forEach((string, i) => {
        const node = document.createElement('span')
        node.textContent = string
        el.appendChild(node)
  
        if (i == 0) {
          const image = document.createElement('img')
          image.src = urlFor(props.content.inlineLogo).format("webp").width(800).url()
          // image.width = "110"
          // image.height = "110"
          image.alt = "Shopify logo"
          image.dataset.inline = true
          el.appendChild(image)
        }
      })
    }
  }

  return (
    <section class={styles.partners} id="partners" ref={el => navigationObserver.observe(el)}>
      <div class={styles.sectionTitle} data-animated="false" ref={el => observer.observe(el)}>
        <h1 ref={el => addInlineLogo(el, props.content.heading)}></h1>
        <p class={styles.subheading}>{props.content.subheading}</p>
      </div>
      <div class={styles.partnerLogos} ref={logoContainer}>
        <For each={props.content.logos}>{(logo, i) => 
          <Show when={i() < maxLogos}>
            <div class={styles.partnerLogo} data-animated="false" data-animation-delay={i() * 20} ref={el => observer.observe(el)}>
              <img src={urlFor(logo.partnerLogo).format("webp").width(600)} alt={`Partner logo for ${logo.name}`} />
            </div>
          </Show>
        }</For>
      </div>
    </section>
  )
}