import { For, Show, createEffect, createResource } from 'solid-js'
import styles from './services.module.css'
import { getServicesSettings } from '../../utilities/sanity-client'

export default function Services() {

  const [ data ] = createResource(getServicesSettings)

  return (
    <section class={styles.services} id="services">

        <Show when={data()}>
          <div class={styles.servicesInfo}>

            <div class={styles.sectionTitle}>
              <h2>{data()[0].heading}</h2>
              <h6>{data()[0].subheading}</h6>
            </div>

            <div class={styles.sectionMedia}>

            </div>

          </div>

          <div class={styles.servicesCategories}>
            <For each={data()[0].services}>{(service, i) =>
              <div class={styles.serviceCategory} key={i}>
                <div class={styles.serviceTitle}>
                  <p class={styles.sectionNumber}>{i() + 1}</p>
                </div>
                <ul class={styles.serviceDeliverables}>
                  <p class={styles.serviceName}>{service.title}</p>
                  <For each={service.deliverables}>{(deliverable, j) =>
                    <li class={styles.deliverable} key={j}>{deliverable}</li>
                  }
                  </For>
                </ul>
              </div>
            }
            </For>
            
          </div>
        </Show>

    </section>
  )
}