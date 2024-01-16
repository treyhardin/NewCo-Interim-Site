import { arrowIcon } from '../../utilities/icons'
import styles from './textLink.module.css'

export default function TextLink(props) {
  return (
    <a href={props.url} class={styles.textLink} aria-label={props.alt} target="_blank">
      <p class={`${styles.text} caption`}>{props.text}</p>
      {arrowIcon()}
    </a>
  )
}