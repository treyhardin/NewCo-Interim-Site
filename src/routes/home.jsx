import { For, Show, createEffect, createResource } from "solid-js";
import Hero from "../components/sectionHero/sectionHero";
import { getHomePageContent } from "../utilities/sanity-client";
import SectionBlock from "../components/sectionBlock/sectionBlock";

const [ data ] = createResource(getHomePageContent)


export default function Home() {

  createEffect(() => {
    console.log(data())
  })

  
  return (
    <>
      <Show when={data()}>
        <For each={data()[0].content}>{(block, i) => 
          <SectionBlock block={block} />
        }</For>
      </Show>
    </>
  )
}