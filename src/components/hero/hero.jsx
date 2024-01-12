import { Show, createEffect, createResource } from 'solid-js'
import styles from './hero.module.css'
import { getHeroSettings, urlFor } from '../../utilities/sanity-client'
import { longArrowIcon } from '../../utilities/icons'

export default function Hero() {

    const [data] = createResource(getHeroSettings)

    const blocksToText = (blocks, el) => {

        blocks.map(block => {
            block.children.map(child => {

                if (child.marks.length <= 0) {
                    const textNode = document.createTextNode(child.text)
                    el.appendChild(textNode)
                }

                if (child.marks[0] == "em") {
                    const emphasisElement = document.createElement("em")
                    const textNode = document.createTextNode(child.text)
                    emphasisElement.appendChild(textNode)
                    el.appendChild(emphasisElement)
                }
            })
        })
    }


    return (
        <section class={styles.hero}>
            <Show when={data()}>
                <div class={styles.heroContent}>
                    {/* <h1>{data()[0].heading}</h1> */}
                    <h1 ref={el => blocksToText(data()[0].title, el) }></h1>
                    {/* <p class={`h6`}>{data()[0].subheading}</p>
                    {longArrowIcon} */}
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