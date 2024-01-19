import styles from './projects.module.css'
import { Match, Show, Switch, createEffect, createResource, createSignal } from "solid-js"
import { getProjectCategories, getProjectsData, urlFor } from "../../utilities/sanity-client"
import { navigationObserver } from '../../utilities/intersectionObserver'



export default function Projects() {


  const [ data ] = createResource(getProjectsData)
  const [ activeFilter, setActiveFilter ] = createSignal("featured")

  const maxProjectCards = 9

  createEffect(() => {
    // console.log(data())
    // console.log(categoryData())
  })

  return (

    <section class={styles.projects} id="work" ref={el => navigationObserver.observe(el)}>

      
      <Show when={data()}>

        <div class={styles.sectionTitle}>
          <h3 class={styles.heading}>{data()[0].heading}</h3>
          <p class={styles.subheading}>{data()[0].subheading}</p>
        </div>

        <div class={styles.categories}>
          <For each={data()[0].categories}>{(category, i) =>
            <button 
              data-active={activeFilter() == category.slug.current ? true : false}
              class={styles.tab}
              onClick={() => {
                if (activeFilter() == category.slug.current) {
                  return setActiveFilter(null)
                }
                return setActiveFilter(category.slug.current)
                // console.log(activeFilter())
              }}
            >
              {category.name}
            </button>
          }</For>
        </div>


        <div class={styles.projectsGrid}>

          <For each={data()[0].projects}>{(project, i) =>
            // <Show when={(i() < maxProjectCards) && (activeFilter() == project.category.current || activeFilter() == null)}>
              <div class={styles.projectCard} data-visible={(project.categories && project.categories.includes(activeFilter()))}>
                <div class={styles.projectMedia}>
                <Switch>
                  <Match when={project.showVideo && project.videoURL}>
                    <video 
                      src={project.videoURL}
                      class={styles.projectVideo}
                      // oncanplaythrough={(e) => console.log(e.target)}
                      oncanplaythrough={(e) => e.target.dataset.canPlay = true}
                      poster={project.image ? urlFor(project.image).width(800).url() : ''}
                      autoplay
                      loop
                      muted
                      playsinline
                      preload="none"
                      // loading="lazy"
                      onloadedmetadata="this.muted = true"
                    />
                  </Match>
                  <Match when={(!project.videoURL || !project.showVideo) && project.image}>
                    <img
                      srcset={`${urlFor(project.image).width(300).url()} 300w, ${urlFor(project.image).width(600).url()} 600w, ${urlFor(project.image).width(960).url()} 960w`}
                      sizes="(max-width: 600px) 300px, (max-width: 1800px) 600px, 960px"
                      src={urlFor(project.image).width(1000).url()}
                      class={styles.projectImage}
                      width="30vw"
                      height="20vh"
                      alt={`Case study image for our work with ${project.name}`}
                    />
                  </Match>
                </Switch>
                </div>
                <p class={styles.projectName}>{project.name}</p>
              </div>
            // </Show>
          }</For>

        </div>

      </Show>

      
    </section>
  )
}