import { For, Show, createResource } from 'solid-js'
import { blocksToText, getAboutContent, urlFor } from '../../utilities/sanity-client'
import styles from './about.module.css'
import { navigationObserver, observer } from '../../utilities/intersectionObserver'

export default function About() {

  const [ data ] = createResource(getAboutContent)
  

  return (
    <Show when={data()}>
      <section class={styles.about} id="about" ref={el => navigationObserver.observe(el)}>

        <div class={styles.sectionContent} data-animated="false" ref={el => {
          observer.observe(el)
        }}>
          <div class={styles.sectionTitle}>
            <h2>{data()[0].heading}</h2>
            <Show when={data()[0].subheading}>
              <h3 class="h6">{data()[0].subheading}</h3>
            </Show>
          </div>
          <div class={styles.stats}>
            <For each={data()[0].stats}>{(stat, i) => 
              <div class={styles.stat}>
                <h3 class="h5" ref={el => blocksToText(stat.content, el)}></h3>
              </div>
            }</For>
          </div>
        </div>

        <div class={styles.sectionMedia} data-animated="false" ref={el => {
          observer.observe(el)
        }}>
          <video 
            src={data()[0].videoURL}
            poster={urlFor(data()[0].image).width(800).url()}
            autoplay
            loop
            muted
            playsinline
            class={styles.video}
            onloadedmetadata="this.muted = true"
          />
        </div>
      </section>
    </Show>
  )
}