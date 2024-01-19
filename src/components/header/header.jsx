import { For, createEffect, createResource, createSignal, onMount } from 'solid-js'
import { getNavigationSettings } from '../../utilities/sanity-client'
import {toHTML} from '@portabletext/to-html'
import styles from './header.module.css'
import { arrowIcon, emailIcon, instagramIcon, linkedInIcon, longArrowIcon, twitterIcon } from '../../utilities/icons'
import { lenis } from '../../App'


export const [ activeNavigation, setActiveNavigation ] = createSignal(null)

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
                        <a href="#" class={styles.logo}>Domaine<sup>&#8482;</sup></a>

                        <div class={styles.navigationLinks}>
                            <button class={styles.navigationLink} data-active={activeNavigation() == "clients" ? true : false} onClick={() => lenis.scrollTo("#clients")}>Clients</button>
                            <button class={styles.navigationLink} data-active={activeNavigation() == "about" ? true : false} onClick={() => lenis.scrollTo("#about")}>About</button>
                            <button class={styles.navigationLink} data-active={activeNavigation() == "services" ? true : false} onClick={() => lenis.scrollTo("#services")}>Services</button>
                            <button class={styles.navigationLink} data-active={activeNavigation() == "work" ? true : false} onClick={() => lenis.scrollTo("#work")}>Work</button>
                            <button class={styles.navigationLink} data-active={activeNavigation() == "partners" ? true : false} onClick={() => lenis.scrollTo("#partners")}>Partners</button>
                        </div>
                    </div>
                    <div class={styles.utilityMenu}>
                        <Show when={data()[0].buttonText}>
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