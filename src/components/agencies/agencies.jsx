import { Show, createResource } from 'solid-js'
import styles from './agencies.module.css'
import { getAgenciesSettings, urlFor } from '../../utilities/sanity-client'
import TextLink from '../textLink/textLink'

export default function Agencies() {

  const [data] = createResource(getAgenciesSettings)

  return (
    <section class={styles.agencies}>
      <Show when={data()}>
        <div class={styles.agenciesInner}>
          <div class={styles.sectionTitle}>
            <h3>{data()[0].heading}</h3>
          </div>
          <For each={data()[0].agencies}>{(agency, i) =>
            <div class={styles.agencyCard} key={i}>
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