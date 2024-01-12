import { For, createEffect, createResource, onMount } from 'solid-js'
import { getNavigationSettings } from '../../utilities/sanity-client'
import {toHTML} from '@portabletext/to-html'
import styles from './header.module.css'
import { arrowIcon, emailIcon, instagramIcon, linkedInIcon, longArrowIcon, twitterIcon } from '../../utilities/icons'
import { lenis } from '../../App'

export default function Header() {

    let promoBarContent

    const [data] = createResource(getNavigationSettings)

    createEffect(() => {
        if (data() && data()[0] && promoBarContent && data()[0].showPromoBar) {
            promoBarContent.innerHTML = toHTML(data()[0].promoBarContent)
        }
    })

    return (
        <header class={styles.header} data-animated="false" ref={el => {
            setTimeout(() => {
                el.dataset.animated = true
            }, 1)
        }} >
            <Show when={data()}>
                <Show when={data()[0].showPromoBar}>
                    <div class={`${styles.promoBar} caption`} ref={promoBarContent}></div>
                </Show>
                <div class={styles.headerMenu}>
                    <div class={styles.navigationMenu}>
                        <a href="#" class={styles.logo}>Domaine<sup>&#174;</sup></a>

                        <div class={styles.navigationLinks}>
                            {/* <For each={data()[0].links}>{(link, i) =>
                                <a href={link.linkURL} class={styles.navigationLink}>{link.linkText}</a>
                            }
                            </For> */}
                            <button class={styles.navigationLink} onClick={() => lenis.scrollTo("#clients")}>Clients</button>
                            <button class={styles.navigationLink} onClick={() => lenis.scrollTo("#about")}>About</button>
                            <button class={styles.navigationLink} onClick={() => lenis.scrollTo("#services")}>Services</button>
                            <button class={styles.navigationLink} onClick={() => lenis.scrollTo("#partners")}>Partners</button>
                        </div>
                    </div>
                    <div class={styles.utilityMenu}>
                        {/* <Show when={data()[0].instagramURL}>
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
                        </Show> */}
                        <Show when={data()[0].showButton && data()[0].buttonText && data()[0].buttonURL}>
                            <button class={styles.headerButton} onClick={() => lenis.scrollTo("#contact")}>
                                {data()[0].buttonText}
                                <div class={styles.buttonIcon}>{emailIcon()}</div>
                            </button>
                        </Show>
                    </div>
                </div>
            </Show>
        </header>
    )
}