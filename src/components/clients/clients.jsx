import { For, createEffect, createResource } from 'solid-js'
import styles from './clients.module.css'
import { getClients, urlFor } from '../../utilities/sanity-client'
import { observer } from '../../utilities/intersectionObserver'
import { lenis } from '../../App';



export default function Clients() {

    let cards;

    let boundingBox


    lenis.on('scroll', (e) => {
    // console.log(e)
        // console.log(cards)
        // boundingBox = cards.getBoundingClientRect()
        // const scrollOffset = boundingBox.top / window.innerHeight
        // const scrollOffset = window.scrollY / window.innerHeight
        // const scrollOffset = 1 - boundingBox.bottom / window.innerHeight
        // const scrollOffset = 1 - Math.max(0, Math.min(boundingBox.bottom, window.innerHeight)) / window.innerHeight
        // console.log(1 / scrollOffset)
        // console.log(scrollOffset)
        // console.log(cards.clientWidth)
        // console.log(window.getComputedStyle(cards, null).getPropertyValue("width"))
        // console.log(boundingBox.top / window.innerHeight)
        // cards.style.translate = `${scrollOffset * (boundingBox.width - window.innerWidth)}px 0`;
    })

    const [ data ] = createResource(getClients)

    // createEffect(() => {
    //     // console.log(data())
    //     // observer.observe(clients)
    //     console.log(cards)

    // })

    const minScale = 0.5
    
    return (
        <section class={styles.clients} ref={cards}>
            <For each={data()}>{(client, i) =>
                <div class={styles.clientCard} key={i()} style={`--index: ${i() + 1}; --random: ${Math.random() * minScale + minScale}`}>
                    <img width="500" height="300" class={styles.clientImage} src={urlFor(client.image).width(1200)} />
                    <img width="500" height="500" class={styles.clientLogo} src={urlFor(client.logo).width(1000)} />
                </div>
            }</For>
        </section>
    )
}