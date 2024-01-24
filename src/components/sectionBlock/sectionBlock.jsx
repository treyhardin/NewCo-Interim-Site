import { Match, Switch } from "solid-js";
import HeroSection from "../sectionHero/sectionHero";
import ClientsSection from "../sectionClients/sectionClients";
import AboutSection from "../sectionAbout/sectionAbout";
import ServicesSection from "../sectionServices/sectionServices";
import ContactSection from "../sectionContact/sectionContact";
import PartnersSection from "../sectionPartners/sectionPartners";
import AgenciesSection from "../sectionAgencies/sectionAgencies";
import ProjectsSection from "../sectionProjects/sectionProjects";

export default function SectionBlock(props) {
  return (
    <>
      <Switch fallback={<p>Create Fallback</p>}>

        <Match when={props.block._type == "sectionHero"}>
          <HeroSection content={props.block} />
        </Match>

        <Match when={props.block._type == "sectionClients"}>
          <ClientsSection content={props.block} />
        </Match>

        <Match when={props.block._type == "sectionAbout"}>
          <AboutSection content={props.block} />
        </Match>

        <Match when={props.block._type == "sectionServices"}>
          <ServicesSection content={props.block} />
        </Match>

        <Match when={props.block._type == "sectionContact"}>
          <ContactSection content={props.block} />
        </Match>

        <Match when={props.block._type == "sectionWork"}>
          <ProjectsSection content={props.block} />
        </Match>

        <Match when={props.block._type == "sectionPartners"}>
          <PartnersSection content={props.block} />
        </Match>

        <Match when={props.block._type == "sectionAgencies"}>
          <AgenciesSection content={props.block} />
        </Match>

      </Switch>
    </>
  )
}