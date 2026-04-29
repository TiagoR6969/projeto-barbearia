"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=600&auto=format&fit=crop",
    alt: "Nosso Estúdio",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=600&auto=format&fit=crop",
    alt: "Corte Profissional",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=600&auto=format&fit=crop",
    alt: "Barba Perfeita",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=600&auto=format&fit=crop",
    alt: "Ambiente Premium",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?q=80&w=600&auto=format&fit=crop",
    alt: "Ferramentas Profissionais",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1621607512214-68297480165e?q=80&w=600&auto=format&fit=crop",
    alt: "Detalhes do Estúdio",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=600&auto=format&fit=crop",
    alt: "Corte Moderno",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=600&auto=format&fit=crop",
    alt: "Estilo Clássico",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1587776354726-5a0ead6d1ed5?q=80&w=600&auto=format&fit=crop",
    alt: "Navalha Profissional",
    span: "col-span-2 row-span-1",
  },
]

export function Gallery() {
  return (
    <section id="galeria" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm uppercase tracking-[0.3em] mb-4 block">
            Galeria
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Nossos Trabalhos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Confira alguns dos nossos cortes e estilos mais recentes. 
            Cada trabalho é uma obra de arte única.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-lg group ${image.span}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-foreground font-medium text-sm uppercase tracking-wider">
                  {image.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
