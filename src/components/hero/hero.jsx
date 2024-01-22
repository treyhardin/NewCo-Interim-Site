import { Show, createEffect, createResource } from 'solid-js'
import styles from './hero.module.css'
import { getHeroSettings, urlFor, blocksToText } from '../../utilities/sanity-client'
import { longArrowIcon, star } from '../../utilities/icons'

export default function Hero() {

    const [data] = createResource(getHeroSettings)

    return (
        <section class={styles.hero}>
            <Show when={data()}>
                <div class={styles.heroContent} data-animated="false" ref={el => {
                    setTimeout(() => {
                        el.dataset.animated = true
                    }, 1);
                }}>
                    <h1 class={styles.heroText} ref={el => blocksToText(data()[0].heading, el) }></h1>
                    <Show when={data()[0].showBadge && data()[0].badgeText}>
                    <div class={styles.badge}>
                        {star()}
                        <p>{data()[0].badgeText}</p>
                    </div>
                    </Show>
                </div>
                <Show when={data()[0].showVideo && data()[0].videoURL}>
                    <div class={styles.heroBackground}>
                        <video class={styles.heroVideo} width="1920" height="1080" autoPlay loop muted playsInline>
                            <source src={data()[0].videoURL} type="video/mp4" />
                            <image src={data()[0].imageURL} width="100vw" height="100vh" />
                        </video>
                    </div>
                </Show>
            </Show>
        </section>
    )
}