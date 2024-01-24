import styles from './sectionAgencies.module.css'

import { Show } from 'solid-js'
import { urlFor } from '../../utilities/sanity-client'
import TextLink from '../textLink/textLink'
import { observer } from '../../utilities/intersectionObserver'

export default function AgenciesSection(props) {

  return (
    <section class={styles.agencies}>
      <Show when={props.content}>
          <div class={styles.sectionTitle}>
            <h2>{props.content.heading}</h2>
          </div>
          <div class={styles.agencyCards}>
            <For each={props.content.agencies}>{(agency, i) =>
              <div class={styles.agencyCard} key={i} data-animated="false" data-animation-delay={i() * 100} ref={el => observer.observe(el)}>
                <img class={styles.agencyLogo} width="150" height="30" src={urlFor(agency.logo).format("webp").width(300)} alt={`Agency logo for ${agency.name}`} />
                <p class={`${styles.agencyDescription} caption`}>{agency.description}</p>
                <Show when={agency.linkText && agency.linkURL}>
                  <TextLink 
                    text={agency.linkText}
                    url={agency.linkURL}
                    alt={`Link to agency site for ${agency.name}`}
                  />
                </Show>
              </div>
            }
            </For>
          </div>

      </Show>
    </section>
  )
}