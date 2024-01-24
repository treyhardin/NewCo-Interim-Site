import styles from './sectionHero.module.css'

import { Show } from 'solid-js'
import { blocksToText } from '../../utilities/sanity-client'
import { star } from '../../utilities/icons'

export default function HeroSection(props) {

    return (
        <section class={styles.hero}>
            <div class={styles.heroContent} data-animated="false" ref={el => {
                setTimeout(() => {
                    el.dataset.animated = true
                }, 1);
            }}>
                <h1 class={styles.heroText} ref={el => blocksToText(props.content.heading, el) }></h1>
                <Show when={props.content.showBadge && props.content.badgeText}>
                    <div class={styles.badge}>
                        {star()}
                        <p>{props.content.badgeText}</p>
                    </div>
                </Show>
            </div>
            <Show when={props.content.showVideo && props.content.videoURL}>
                <div class={styles.heroBackground}>
                    <video class={styles.heroVideo} width="1920" height="1080" autoPlay loop muted playsInline>
                        <source src={props.content.videoURL} type="video/mp4" />
                        <image src={props.content.imageURL} width="100vw" height="100vh" />
                    </video>
                </div>
            </Show>
        </section>
    )
}