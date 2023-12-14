import { arrow } from '../../utilities/icons'
import styles from './textLink.module.css'

export default function TextLink(props) {
  return (
    <a href={props.url} class={styles.textLink} target="_blank">
      <p class={`${styles.text} caption`}>{props.text}</p>
      {arrow()}
    </a>
  )
}