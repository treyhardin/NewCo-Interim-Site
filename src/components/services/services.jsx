import { For, Show, createEffect, createResource, createSignal } from 'solid-js'
import styles from './services.module.css'
import { getServicesContent, urlFor } from '../../utilities/sanity-client'
import { navigationObserver, observer } from '../../utilities/intersectionObserver'

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
  
  let activeServiceObserver = new IntersectionObserver(callback, options);

  return (
    <section class={styles.services} id="services" ref={el => navigationObserver.observe(el)}>

        <Show when={data()}>
          <div class={styles.servicesInfo} data-animated="false" ref={el => observer.observe(el)}>

            <div class={styles.sectionTitle}>
              <h2 class="h1">{data()[0].heading}</h2>
              <Show when={data()[0].subheading}>
                <h2 class="h5">{data()[0].subheading}</h2>
              </Show>
            </div>

            <div class={styles.sectionMedia}>
              <For each={data()[0].services}>{(service, i) =>
                <img class={styles.serviceImage} data-active={i() == activeServiceIndex()} src={urlFor(service.image).width(1280).url()} alt={`Supporting image for ${service.title} service.`} />
              }</For>
            </div>

          </div>

          <div class={styles.servicesCategories}>
            <For each={data()[0].services}>{(service, i) =>
            
              <div class={styles.serviceCategory} key={i} data-active={i() == activeServiceIndex()} data-index={i()} ref={el => activeServiceObserver.observe(el)}>
                
                <img class={styles.serviceImageInline} src={urlFor(service.image).width(800).url()} alt={`Supporting image for ${service.title} service.`}/>

                <div class={styles.serviceText}>

                  <div class={styles.serviceTitle}>
                    <p class={styles.serviceNumber}>{`0${i() + 1}.`}</p>
                    <p class={styles.serviceName}>{service.title}</p>
                  </div>

                  <ul class={styles.serviceDeliverables}>
                    <For each={service.deliverables}>{(deliverable, j) =>
                      <li class={styles.deliverable} key={j}>{deliverable}</li>
                    }
                    </For>
                  </ul>
                </div>

              </div>
            }
            </For>
            
          </div>
        </Show>

    </section>
  )
}