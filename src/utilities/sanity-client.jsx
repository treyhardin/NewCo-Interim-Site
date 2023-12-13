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

export async function getNavigationSettings() {
  const navigationSettings = await client.fetch('*[_type == "navigationSettings"]{ showPromoBar, promoBarContent, links, instagramURL, linkedInURL, twitterURL, "logoURL": logo.asset -> url, showButton, buttonURL, buttonText}')
  return navigationSettings
}

export async function getHeroSettings() {
  const heroSettings = await client.fetch('*[_type == "heroSettings"]{ heading, subheading, "videoURL": video.asset -> url, "imageURL": image.asset -> url}')
  return heroSettings
}

export async function getClients() {
  const clients = await client.fetch('*[_type == "client"]')
  return clients
}