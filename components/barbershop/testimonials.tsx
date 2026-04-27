"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Ricardo Mendes",
    role: "Cliente há 3 anos",
    content: "A melhor barbearia que já frequentei. O atendimento é impecável e os profissionais são verdadeiros artistas. Não troco por nada!",
    rating: 5,
  },
  {
    name: "Fernando Costa",
    role: "Cliente há 2 anos",
    content: "Ambiente sofisticado e atendimento de primeira. O combo elite vale cada centavo. Saio sempre me sentindo renovado.",
    rating: 5,
  },
  {
    name: "André Silva",
    role: "Cliente há 1 ano",
    content: "Profissionalismo e qualidade em cada detalhe. O sistema de agendamento é prático e nunca precisei esperar. Recomendo demais!",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section id="depoimentos" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm uppercase tracking-[0.3em] mb-4 block">
            Depoimentos
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            A satisfação dos nossos clientes é nossa maior conquista. 
            Veja o que eles têm a dizer sobre a experiência na Barber Elite.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-secondary border-border h-full">
                <CardContent className="p-8">
                  <Quote className="h-10 w-10 text-primary/30 mb-6" />
                  <p className="text-foreground mb-6 leading-relaxed">
                    {testimonial.content}
                  </p>
                  <div className="flex items-center gap-1 mb-6">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                    ))}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
