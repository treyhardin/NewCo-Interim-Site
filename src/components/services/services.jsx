import { For, Show, createEffect, createResource, createSignal } from 'solid-js'
import styles from './services.module.css'
import { getServicesContent, urlFor } from '../../utilities/sanity-client'

export default function Services() {

  const [ data ] = createResource(getServicesContent)
  const [ activeServiceIndex, setActiveServiceIndex ] = createSignal(0)

  let options = {
    root: document.querySelector("#scrollArea"),
    rootMargin: "0%",
    threshold: 0.5,
  };

  let callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = entry.target.dataset.index
        setActiveServiceIndex(index)
      }
    });
  };
  
  let observer = new IntersectionObserver(callback, options);

  return (
    <section class={styles.services} id="services">

        <Show when={data()}>
          <div class={styles.servicesInfo}>

            <div class={styles.sectionTitle}>
              <h2>{data()[0].heading}</h2>
              <Show when={data()[0].subheading}>
                <h6>{data()[0].subheading}</h6>
              </Show>
            </div>

            <div class={styles.sectionMedia}>
              <For each={data()[0].services}>{(service, i) =>
                <img class={styles.serviceImage} data-active={i() == activeServiceIndex()} src={urlFor(service.image).width(1280).url()} />
              }</For>
            </div>

          </div>

          <div class={styles.servicesCategories}>
            <For each={data()[0].services}>{(service, i) =>
            
              <div class={styles.serviceCategory} key={i} data-active={i() == activeServiceIndex()} data-index={i()} ref={el => observer.observe(el)}>
                
                <img class={styles.serviceImage} src={urlFor(service.image).width(1280).url()} />
                <p class={styles.serviceNumber}>{`0${i() + 1}.`}</p>
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