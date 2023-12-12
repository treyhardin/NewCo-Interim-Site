import styles from './header.module.css'

export default function Header() {
    return (
        <header class={styles.header}>
            <div class={styles.promoBar}>
                Tomorrow & Half Helix Announce Merger. <a href="#">Learn More</a>
            </div>
            <div class={styles.headerMenu}>
                <div class={styles.navigationMenu}>
                    <p>Newco</p>
                    <a href="#" class={styles.navigationLink}>Clients</a>
                    <a href="#" class={styles.navigationLink}>Services</a>
                    <a href="#" class={styles.navigationLink}>Partners</a>
                </div>
                <div class={styles.utilityMenu}>
                    <a href="#" class={styles.navigationLink}>Instagram</a>
                    <a href="#" class={styles.navigationLink}>LinkedIn</a>
                    <button>Get in Touch</button>
                </div>
            </div>
        </header>
    )
}