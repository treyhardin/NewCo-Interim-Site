import styles from './hero.module.css'

export default function Hero() {
    return (
        <section class={styles.hero}>
            <div class={styles.heroContent}>
                <h1>Half Helix & Tomorrow are now NewCo.</h1>
                <p class={`h6`}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.</p>
            </div>
            <div class={styles.heroBackground}>
                <video class={styles.heroVideo} width="1920" height="1080" autoPlay loop muted playsInline>
                    <source src="/TMW_Sky_Greyscale_720.mov" type="video/mp4" />
                </video>
            </div>
            
        </section>
    )
}