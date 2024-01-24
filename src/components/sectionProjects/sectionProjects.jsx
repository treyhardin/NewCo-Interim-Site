import styles from './sectionProjects.module.css'

import { Match, Show, Switch, createSignal } from "solid-js"
import { urlFor } from "../../utilities/sanity-client"
import { navigationObserver } from '../../utilities/intersectionObserver'

export default function ProjectsSection(props) {

  const [ activeFilter, setActiveFilter ] = createSignal("featured")

  return (

    <section class={styles.projects} id="work" ref={el => navigationObserver.observe(el)}>

        <div class={styles.sectionTitle}>
          <h3 class={styles.heading}>{props.content.heading}</h3>
          <p class={styles.subheading}>{props.content.subheading}</p>
        </div>

        <div class={styles.categories}>
          <For each={props.content.categories}>{(category, i) =>
            <button 
              data-active={activeFilter() == category.slug.current ? true : false}
              class={styles.tab}
              onClick={() => setActiveFilter(category.slug.current)}
            >
              {category.name}
            </button>
          }</For>
        </div>


        <div class={styles.projectsGrid}>

          <For each={props.content.projects}>{(project, i) =>
            <Show when={ project.categories && project.categories.includes(activeFilter()) }>
              <div class={styles.projectCard}>
                <div class={styles.projectMedia}>
                <Switch>
                  <Match when={project.showThumbnailVideo && project.videoURL}>
                    <video 
                      src={project.videoURL}
                      class={styles.projectVideo}
                      oncanplaythrough={(e) => e.target.dataset.canPlay = true}
                      poster={project.image ? urlFor(project.image).format("webp").width(800).url() : ''}
                      autoplay
                      loop
                      muted
                      playsinline
                      preload="none"
                      onloadedmetadata="this.muted = true"
                    />
                  </Match>
                  <Match when={(!project.videoURL || !project.showThumbnailVideo) && project.thumbnailImage}>
                    <img
                      srcset={`${urlFor(project.thumbnailImage).format("webp").width(300).url()} 300w, ${urlFor(project.thumbnailImage).format("webp").width(600).url()} 600w, ${urlFor(project.thumbnailImage).format("webp").width(960).url()} 960w`}
                      sizes="(max-width: 600px) 300px, (max-width: 1800px) 600px, 960px"
                      src={urlFor(project.thumbnailImage).format("webp").width(1000).url()}
                      class={styles.projectImage}
                      width="30vw"
                      height="20vh"
                      loading="lazy"
                      alt={`Case study image for our work with ${project.title}`}
                    />
                  </Match>
                </Switch>
                </div>
                <p class={styles.projectName}>{project.title}</p>
              </div>
            </Show>
          }</For>

        </div>
      
    </section>
  )
}