import { Show, createEffect, createResource } from 'solid-js'
import styles from './hero.module.css'
import { getHeroSettings, urlFor } from '../../utilities/sanity-client'
import { longArrowIcon } from '../../utilities/icons'

export default function Hero() {

    const [data] = createResource(getHeroSettings)

    return (
        <section class={styles.hero}>
            <Show when={data()}>
                <div class={styles.heroContent}>
                    <h1>{data()[0].heading}</h1>
                    <p class={`h6`}>{data()[0].subheading}</p>
                    {longArrowIcon}
                </div>
                <div class={styles.heroBackground}>
                    <video class={styles.heroVideo} width="1920" height="1080" autoPlay loop muted playsInline>
                        <source src={data()[0].videoURL} type="video/mp4" />
                        <image src={data()[0].imageURL} width="100vw" height="100vh" />
                    </video>
                </div>
            </Show>
        </section>
    )
}