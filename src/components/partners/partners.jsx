import { Show, createEffect, createResource } from 'solid-js'
import styles from './partners.module.css'
import { getPartnersSettings, urlFor } from '../../utilities/sanity-client'

export default function Partners() {

  const [data] = createResource(getPartnersSettings)

  return (
    <section class={styles.partners}>
      <Show when={data()}>
        <div class={styles.sectionTitle}>
          <h3>{data()[0].heading}</h3>
        </div>
        <div class={styles.partnerLogos}>
          <For each={data()[0].logos}>{(logo, i) => 
            <div class={styles.partnerLogo}>
              <img src={urlFor(logo)} />
            </div>
          }
          </For>
        </div>
      </Show>
    </section>
  )
}