import { For, Show, createEffect, createResource, onMount } from 'solid-js'
import styles from './clients.module.css'
import { getClients, urlFor } from '../../utilities/sanity-client'
import { observer } from '../../utilities/intersectionObserver'
import { lenis } from '../../App';



export default function Clients() {

    let cards;
    let scrollerRow = [];

    const [ data ] = createResource(getClients)

    const initScrollAnimation = (el) => {

        // Check for reduced motion preference
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

            scrollerRow.forEach((row, i) => {

                const scrollerChildren = Array.from(row.children)
    
                scrollerChildren.forEach((child, i) => {
                    // console.log(child)
                    const clonedElement = child.cloneNode(true)
                    clonedElement.setAttribute("aria-hidden", true)
                    row.appendChild(clonedElement)
                })
            })
        }
    }
    
    createEffect(() => {
        if (!data.loading && !data.error && scrollerRow.length > 0) {
            initScrollAnimation()
        }
    })
    
    return (
        <section class={styles.clients} ref={cards} id="clients">

            <div class={styles.clientCardRow} ref={scrollerRow[0]}>
                <For each={data()}>{(client, i) =>
                    <Show when={i() <= data().length / 3}>
                    <div class={styles.clientCard} key={i()}>
                        <img width="500" height="300" class={styles.clientImage} src={urlFor(client.image).width(1200)} />
                        <img width="500" height="500" class={styles.clientLogo} src={urlFor(client.logo).width(1000)} />
                    </div>
                    </Show>
                }</For>
            </div>

            <div class={styles.clientCardRow} ref={scrollerRow[1]}>
                <For each={data()}>{(client, i) =>
                    <Show when={i() > data().length / 3 && i() <= data().length / 3 * 2}>
                        <div class={styles.clientCard} key={i()}>
                            <img width="500" height="300" class={styles.clientImage} src={urlFor(client.image).width(1200)} />
                            <img width="500" height="500" class={styles.clientLogo} src={urlFor(client.logo).width(1000)} />
                        </div>
                    </Show>
                }</For>
            </div>

            <div class={styles.clientCardRow} ref={scrollerRow[2]}>
                <For each={data()}>{(client, i) =>
                    <Show when={i() > data().length / 3 * 2}>
                        <div class={styles.clientCard} key={i()}>
                            <img width="500" height="300" class={styles.clientImage} src={urlFor(client.image).width(1200)} />
                            <img width="500" height="500" class={styles.clientLogo} src={urlFor(client.logo).width(1000)} />
                        </div>
                    </Show>
                }</For>
            </div>

        </section>
    )
}