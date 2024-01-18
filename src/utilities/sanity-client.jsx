import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: '87sa1ng7',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2023-12-12', // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

export const blocksToText = (blocks, el) => {

  blocks.map(block => {
      block.children.map(child => {

          if (child.marks.length <= 0) {
              const textNode = document.createTextNode(child.text)
              el.appendChild(textNode)
          }

          if (child.marks[0] == "em") {
              const emphasisElement = document.createElement("em")
              const textNode = document.createTextNode(child.text)
              emphasisElement.appendChild(textNode)
              el.appendChild(emphasisElement)
          }
      })
  })
}

export async function getNavigationSettings() {
  const navigationSettings = await client.fetch('*[_type == "navigationSettings"]{ showPromoBar, promoBarContent, links, instagramURL, linkedInURL, twitterURL, "logoURL": logo.asset -> url, showButton, buttonURL, buttonText}')
  return navigationSettings
}

export async function getHeroSettings() {
  const heroSettings = await client.fetch('*[_type == "heroSettings"]{ heading, subheading, showVideo, "videoURL": video.asset -> url, "imageURL": image.asset -> url}')
  return heroSettings
}

export async function getClients() {
  const clients = await client.fetch('*[_type == "client"]')
  return clients
}

export async function getAboutContent() {
  const clients = await client.fetch('*[_type == "about"]{ heading, subheading, stats, "videoURL": video.asset -> url, image}')
  return clients
}

export async function getServicesContent() {
  const servicesSettings = await client.fetch('*[_type == "services"]')
  return servicesSettings
}

export async function getPartnersSettings() {
  const partnersSettings = await client.fetch('*[_type == "partnersSettings"]')
  return partnersSettings
}

export async function getAgenciesSettings() {
  const agenciesSettings = await client.fetch('*[_type == "agenciesSettings"]')
  return agenciesSettings
}

export async function getFooterSettings() {
  const footerSettings = await client.fetch('*[_type == "footerSettings"]')
  return footerSettings
}

export async function getProjectsData() {
  const projectsData = await client.fetch('*[_type == "project"]{heading, subheading, projects[]{name, image, videoURL, "category": category->slug }}')
  return projectsData
}

export async function getProjectCategories() {
  const projectCategories = await client.fetch('*[_type == "projectCategory"]{name, slug}')
  return projectCategories
}