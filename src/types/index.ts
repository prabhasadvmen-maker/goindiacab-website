export interface Service {
  id: string
  title: string
  slug: string
  description: string
  image: string
  icon?: string
  features?: string[]
}

export interface Route {
  id: string
  slug: string
  from: string
  to: string
  distance: string
  duration: string
  fare: string
  image: string
  description: string
  faqs?: FAQ[]
}

export interface Package {
  id: string
  slug: string
  title: string
  destination: string
  duration: string
  image: string
  description: string
  inclusions: string[]
  exclusions: string[]
  vehicles: string[]
  fare: string
  faqs?: FAQ[]
}

export interface Locality {
  slug: string
  area: string
  city: string
  title: string
  metaTitle: string
  metaDescription: string
  description: string
  services: string[]
  nearbyAreas: string[]
  faqs?: FAQ[]
}

export interface Vehicle {
  id: string
  name: string
  slug: string
  image: string
  capacity: number
  luggage: string
  ac: boolean
  pricePerKm: string
  features: string[]
  idealFor: string[]
}

export interface Blog {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  date: string
  category: string
  tags: string[]
  faqs?: FAQ[]
}

export interface FAQ {
  question: string
  answer: string
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface Review {
  id: string
  name: string
  rating: number
  comment: string
  date: string
  location?: string
}
