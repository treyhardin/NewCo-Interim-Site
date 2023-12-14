import { For, Show, createEffect, createResource } from 'solid-js'
import styles from './services.module.css'
import { getServicesSettings } from '../../utilities/sanity-client'

export default function Services() {

  const [ data ] = createResource(getServicesSettings)

  return (
    <section class={styles.services}>
      <div class={styles.servicesInner}>

        <Show when={data()}>
          <div class={styles.servicesInfo}>
            <h2>{data()[0].heading}</h2>
            <p>{data()[0].subheading}</p>
            <div class={styles.stats}>
              <For each={data()[0].stats}>{(stat, i) =>
                <div class={styles.stat} key={i}>
                  <p class={`${styles.statValue} h5`}>{stat.value}</p>
                  <p class={styles.statLabel}>{stat.label}</p>
                </div>
              }
              </For>
            </div>
          </div>

          <div class={styles.servicesCategories}>
            <For each={data()[0].services}>{(service, i) =>
              <div class={styles.serviceCategory} key={i}>
                <p class={`${styles.serviceTitle} h5`}>{service.title}</p>
                <ul class={styles.serviceDeliverables}>
                  <For each={service.deliverables}>{(deliverable, j) =>
                    <li class="caption" key={j}>{deliverable}</li>
                  }
                  </For>
                </ul>
              </div>
            }
            </For>
            
          </div>
        </Show>

      </div>
    </section>
  )
}