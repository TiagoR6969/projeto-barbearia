import { Header } from "@/components/barbershop/header"
import { Hero } from "@/components/barbershop/hero"
import { Services } from "@/components/barbershop/services"
import { Gallery } from "@/components/barbershop/gallery"
import { Testimonials } from "@/components/barbershop/testimonials"
import { Booking } from "@/components/barbershop/booking"
import { Contact } from "@/components/barbershop/contact"
import { Footer } from "@/components/barbershop/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Gallery />
      <Testimonials />
      <Booking />
      <Contact />
      <Footer />
    </main>
  )
}
