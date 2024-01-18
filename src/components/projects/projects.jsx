import styles from './projects.module.css'
import { Match, Show, Switch, createEffect, createResource, createSignal } from "solid-js"
import { getProjectCategories, getProjectsData, urlFor } from "../../utilities/sanity-client"



export default function Projects() {


  const [ data ] = createResource(getProjectsData)
  const [ categoryData ] = createResource(getProjectCategories)

  const [ activeFilter, setActiveFilter ] = createSignal(null)

  createEffect(() => {
    console.log(data())
    console.log(categoryData())
  })

  const handleFilter = (e) => {
    console.log(e)
  }

  return (

    <section class={styles.projects}>

      
      <Show when={data()}>

        <div class={styles.sectionTitle}>
          <h3 class={styles.heading}>{data()[0].heading}</h3>
          <p class={styles.subheading}>{data()[0].subheading}</p>
        </div>

        <Show when={categoryData()}>
          <div class={styles.categories}>
            <For each={categoryData()}>{(category, i) =>
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
        </Show>


        <div class={styles.projectsGrid}>

          <For each={data()[0].projects}>{(project, i) =>
            // <Show when={(project.category && activeFilter() == project.category.current) || activeFilter() == null}>
              <div class={styles.projectCard} data-visible={(project.category && activeFilter() == project.category.current) || activeFilter() == null}>
                <div class={styles.projectMedia}>
                <Switch>
                  <Match when={project.showVideo && project.videoURL}>
                    {/* <div style="position:relative;padding-top:54.196%;" class={styles.projectVideo}>
                      <iframe 
                        src={`https://iframe.mediadelivery.net/embed/196075/${project.videoID}?autoplay=true&loop=true&muted=true&preload=true&responsive=true`}
                        loading="lazy" 
                        style="border:0;position:absolute;top:0;height:100%;width:100%;" 
                        allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" 
                        allowfullscreen="true"
                      ></iframe>
                    </div> */}
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
                      loading="lazy"
                      onloadedmetadata="this.muted = true"
                    />
                  </Match>
                  <Match when={(!project.videoURL || !project.showVideo) && project.image}>
                    <img
                      src={urlFor(project.image).width(1200).url()}
                      class={styles.projectImage}
                      width="30vw"
                      height="20vh"
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