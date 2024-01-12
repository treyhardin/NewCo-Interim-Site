import { For, Show, createResource } from 'solid-js'
import { blocksToText, getAboutContent } from '../../utilities/sanity-client'
import styles from './about.module.css'

export default function About() {

  const [ data ] = createResource(getAboutContent)

  return (
    <Show when={data()}>
      <section class={styles.about} id="about">

        <div class={styles.sectionContent}>
          <div class={styles.sectionTitle}>
            <h2>{data()[0].heading}</h2>
            <h6>{data()[0].subheading}</h6>
          </div>
          <div class={styles.stats}>
            <For each={data()[0].stats}>{(stat, i) => 
              <div class={styles.stat}>
                <h4 ref={el => blocksToText(stat.content, el)}></h4>
              </div>
            }</For>
          </div>
        </div>

        <div class={styles.sectionMedia}>
          <video 
            src={data()[0].videoURL}
            poster={data()[0].image}
            autoplay
            loop
            muted
            class={styles.video}
          />
        </div>
      </section>
    </Show>
  )
}