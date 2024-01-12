import { Show, createResource } from 'solid-js'
import styles from './footer.module.css'
import { getFooterSettings } from '../../utilities/sanity-client'

export default function Footer() {

  const [ data ] = createResource(getFooterSettings)

  return (
    <footer class={styles.footer}>
      <Show when={data()}>
        <div class={styles.footerInfo}>
          <p>{data()[0].copyright}</p>
        </div>
        <div class={styles.footerLinks}>
          <For each={data()[0].links}>{(link, i) =>
            <a class={styles.footerLink} href={link.linkURL} key={i}>{link.linkText}</a>
          }
          </For>
        </div>
      </Show>
    </footer>
  )
}