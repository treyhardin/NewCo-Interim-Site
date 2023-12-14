import { For, createEffect, createResource } from 'solid-js'
import { getNavigationSettings } from '../../utilities/sanity-client'
import {toHTML} from '@portabletext/to-html'
import styles from './header.module.css'
import { instagramIcon, linkedInIcon, twitterIcon } from '../../utilities/icons'

export default function Header() {

    let promoBarContent

    const [data] = createResource(getNavigationSettings)

    createEffect(() => {
        if (data() && data()[0] && promoBarContent && data()[0].showPromoBar) {
            promoBarContent.innerHTML = toHTML(data()[0].promoBarContent)
        }
    })

    return (
        <header class={styles.header}>
            <Show when={data()}>
                <Show when={data()[0].showPromoBar}>
                    <div class={`${styles.promoBar} caption`} ref={promoBarContent}></div>
                </Show>
                <div class={styles.headerMenu}>
                    <div class={styles.navigationMenu}>
                        <a href="#" class={styles.logo}>
                            <img src={data()[0].logoURL} />
                        </a>
                        <For each={data()[0].links}>{(link, i) =>
                            <a href={link.linkURL} class={styles.navigationLink}>{link.linkText}</a>
                        }
                        </For>
                    </div>
                    <div class={styles.utilityMenu}>
                        <Show when={data()[0].instagramURL}>
                            <a href={data()[0].instagramURL} class={styles.socialLink} target='_blank'>
                                {instagramIcon}
                            </a>
                        </Show>
                        <Show when={data()[0].twitterURL}>
                            <a href={data()[0].twitterURL} class={styles.socialLink} target='_blank'>
                                {twitterIcon}
                            </a>
                        </Show>
                        <Show when={data()[0].linkedInURL}>
                            <a href={data()[0].linkedInURL} class={styles.socialLink} target='_blank'>
                                {linkedInIcon}
                            </a>
                        </Show>
                        <Show when={data()[0].showButton && data()[0].buttonText && data()[0].buttonURL}>
                            <a href={data()[0].buttonURL} target='_blank'>
                                <button>{data()[0].buttonText}</button>
                            </a>
                        </Show>
                    </div>
                </div>
            </Show>
        </header>
    )
}