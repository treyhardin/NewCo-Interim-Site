import { Show, createResource } from 'solid-js'
import styles from './agencies.module.css'
import { getAgenciesSettings, urlFor } from '../../utilities/sanity-client'
import TextLink from '../textLink/textLink'
import { observer } from '../../utilities/intersectionObserver'

export default function Agencies() {

  const [data] = createResource(getAgenciesSettings)

  return (
    <section class={styles.agencies}>
      <Show when={data()}>
          <div class={styles.sectionTitle}>
            <h2>{data()[0].heading}</h2>
          </div>
          <div class={styles.agencyCards}>
            <For each={data()[0].agencies}>{(agency, i) =>
              <div class={styles.agencyCard} key={i} data-animated="false" data-animation-delay={i() * 100} ref={el => observer.observe(el)}>
                <img class={styles.agencyLogo} src={urlFor(agency.logo)} />
                <p class={`${styles.agencyDescription} caption`}>{agency.description}</p>
                <Show when={agency.linkText && agency.linkURL}>
                  <TextLink 
                    text={agency.linkText}
                    url={agency.linkURL}
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