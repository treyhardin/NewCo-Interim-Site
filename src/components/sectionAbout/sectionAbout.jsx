import styles from './sectionAbout.module.css'

import { For, Show } from 'solid-js'
import { blocksToText, urlFor } from '../../utilities/sanity-client'
import { navigationObserver, observer } from '../../utilities/intersectionObserver'

export default function AboutSection(props) {

  return (
    <section class={styles.about} id="about" ref={el => navigationObserver.observe(el)}>

      <div class={styles.sectionContent} data-animated="false" ref={el => {
        observer.observe(el)
      }}>
        <div class={styles.sectionTitle}>
          <h2>{props.content.heading}</h2>
          <Show when={props.content.subheading}>
            <h3 class="h6">{props.content.subheading}</h3>
          </Show>
        </div>
        <div class={styles.stats}>
          <For each={props.content.stats}>{(stat, i) => 
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
          src={props.content.videoURL}
          poster={urlFor(props.content.image).format("webp").width(800).url()}
          autoplay
          loop
          muted
          playsinline
          class={styles.video}
          onloadedmetadata="this.muted = true"
        />
      </div>
    </section>
  )
}