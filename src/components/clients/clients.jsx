import { For, createEffect, createResource } from 'solid-js'
import styles from './clients.module.css'
import { getClients, urlFor } from '../../utilities/sanity-client'



export default function Clients() {

    const [ data ] = createResource(getClients)

    createEffect(() => {
        console.log(data())
    })
    
    return (
        <section class={styles.clients}>
            <For each={data()}>{(client, i) =>
                <div class={styles.clientCard}>
                    <img width="500" height="300" class={styles.clientImage} src={urlFor(client.image).width(1200)} />
                    <img width="500" height="500" class={styles.clientLogo} src={urlFor(client.logo).width(1000)} />
                </div>
            }</For>
        </section>
    )
}