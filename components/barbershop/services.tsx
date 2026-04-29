"use client"

import { motion } from "framer-motion"
import { Scissors, Star, Award, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    icon: Scissors,
    name: "Corte Clássico",
    description: "Corte tradicional com técnicas refinadas e acabamento impecável.",
    price: "R$ 60",
    duration: "45 min",
  },
  {
    icon: Award,
    name: "Corte Premium",
    description: "Corte personalizado com lavagem, massagem e finalização especial.",
    price: "R$ 90",
    duration: "60 min",
  },
  {
    icon: Zap,
    name: "Barba Completa",
    description: "Modelagem e aparação da barba com toalha quente e hidratação.",
    price: "R$ 50",
    duration: "30 min",
  },
  {
    icon: Star,
    name: "Combo Elite",
    description: "Corte premium + barba completa + tratamento capilar exclusivo.",
    price: "R$ 150",
    duration: "90 min",
  },
]

export function Services() {
  return (
    <section id="servicos" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm uppercase tracking-[0.3em] mb-4 block">
            Nossos Serviços
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Excelência em Cada Corte
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Oferecemos uma experiência completa de cuidados masculinos com técnicas 
            tradicionais e modernas para realçar seu estilo único.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-secondary border-border hover:border-primary/50 transition-all duration-300 h-full group">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                    {service.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-primary font-bold text-lg">{service.price}</span>
                    <span className="text-muted-foreground text-sm">{service.duration}</span>
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
