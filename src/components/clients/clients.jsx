import { For, Show, createEffect, createResource } from 'solid-js'
import styles from './clients.module.css'
import { getClients, urlFor } from '../../utilities/sanity-client'
import { navigationObserver, observer } from '../../utilities/intersectionObserver'


export default function Clients() {

    let scrollerRow = [];

    const [ data ] = createResource(getClients)

    const initScrollAnimation = (el) => {

        // Check for reduced motion preference
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

            scrollerRow.forEach((row, i) => {

                row.dataset.animateActive = true;

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
            console.log('init')
        }
    })
    
    return (
        <section class={styles.clients} id="clients" data-animated="false" ref={el => {
            navigationObserver.observe(el)
            setTimeout(() => {
                el.dataset.animated = true
            }, 1);
        }}>

            <div class={styles.clientCardRow} ref={scrollerRow[0]}>
                <For each={data()}>{(client, i) =>
                    <Show when={i() <= data().length / 3}>
                    <div class={styles.clientCard} key={i()}>
                        <img width="33vw" height="30vh" class={styles.clientImage} src={urlFor(client.image).width(1200)} />
                        <img width="70%" height="20%" class={styles.clientLogo} src={urlFor(client.logo).width(1000)} />
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