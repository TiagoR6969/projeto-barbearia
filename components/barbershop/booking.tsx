"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar as CalendarIcon, Clock, Scissors, Check, RotateCcw, MessageCircle, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import Image from "next/image"

const services = [
  { id: "classico", name: "Corte Clássico", price: "R$ 60" },
  { id: "premium", name: "Corte Premium", price: "R$ 90" },
  { id: "barba", name: "Barba Completa", price: "R$ 50" },
  { id: "combo", name: "Combo Elite", price: "R$ 150" },
]

const barbers = [
  { 
    id: "joao", 
    name: "João Silva",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  { 
    id: "pedro", 
    name: "Pedro Santos",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
  { 
    id: "marcos", 
    name: "Marcos Oliveira",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
  },
]

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
]

// Número do WhatsApp da barbearia (substitua pelo número real)
const WHATSAPP_NUMBER = "5511999999999"

interface BookingData {
  service: string
  barber: string
  date: Date | undefined
  time: string
  name: string
  phone: string
}

export function Booking() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState("")
  const [selectedBarber, setSelectedBarber] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [bookings, setBookings] = useState<BookingData[]>([])

  const generateWhatsAppMessage = (booking: BookingData) => {
    const serviceName = services.find(s => s.id === booking.service)?.name || ""
    const servicePrice = services.find(s => s.id === booking.service)?.price || ""
    const barberName = barbers.find(b => b.id === booking.barber)?.name || ""
    const dateFormatted = formatDate(booking.date)

    const message = `Olá! Gostaria de confirmar meu agendamento na Barber Elite.

*Dados do Agendamento:*
- Nome: ${booking.name}
- Telefone: ${booking.phone}
- Serviço: ${serviceName} (${servicePrice})
- Barbeiro: ${barberName}
- Data: ${dateFormatted}
- Horário: ${booking.time}

Aguardo a confirmação. Obrigado!`

    return encodeURIComponent(message)
  }

  const openWhatsApp = (booking: BookingData) => {
    const message = generateWhatsAppMessage(booking)
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newBooking: BookingData = {
      service: selectedService,
      barber: selectedBarber,
      date: selectedDate,
      time: selectedTime,
      name,
      phone,
    }
    setBookings([...bookings, newBooking])
    setIsSubmitted(true)
    
    // Abre o WhatsApp automaticamente com a mensagem
    openWhatsApp(newBooking)
  }

  const handleNewBooking = () => {
    setStep(1)
    setSelectedService("")
    setSelectedBarber("")
    setSelectedDate(undefined)
    setSelectedTime("")
    setName("")
    setPhone("")
    setIsSubmitted(false)
  }

  const canProceed = () => {
    switch (step) {
      case 1: return selectedService !== ""
      case 2: return selectedBarber !== ""
      case 3: return selectedDate !== undefined && selectedTime !== ""
      case 4: return name !== "" && phone !== ""
      default: return false
    }
  }

  const formatDate = (date: Date | undefined) => {
    if (!date) return ""
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  if (isSubmitted) {
    const lastBooking = bookings[bookings.length - 1]
    return (
      <section id="agendamento" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center"
          >
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-primary" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
              Agendamento Confirmado!
            </h2>
            <p className="text-muted-foreground mb-8">
              Seu horário foi reservado com sucesso. Você receberá uma confirmação por WhatsApp em breve.
            </p>
            <Card className="bg-card border-border mb-6">
              <CardContent className="p-6 text-left">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cliente:</span>
                    <span className="text-foreground font-medium">{lastBooking.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Serviço:</span>
                    <span className="text-foreground font-medium">
                      {services.find(s => s.id === lastBooking.service)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Barbeiro:</span>
                    <span className="text-foreground font-medium">
                      {barbers.find(b => b.id === lastBooking.barber)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Data:</span>
                    <span className="text-foreground font-medium">{formatDate(lastBooking.date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Horário:</span>
                    <span className="text-foreground font-medium">{lastBooking.time}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {bookings.length > 1 && (
              <div className="mb-6">
                <h3 className="text-foreground font-semibold mb-3 text-left">Agendamentos anteriores:</h3>
                <div className="space-y-3">
                  {bookings.slice(0, -1).map((booking, index) => (
                    <Card key={index} className="bg-secondary border-border">
                      <CardContent className="p-4 text-left">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-foreground font-medium">{booking.name}</p>
                            <p className="text-muted-foreground text-sm">
                              {services.find(s => s.id === booking.service)?.name} - {formatDate(booking.date)} às {booking.time}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => openWhatsApp(lastBooking)}
                className="bg-green-600 text-white hover:bg-green-700 gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                Enviar pelo WhatsApp
              </Button>
              <Button
                onClick={handleNewBooking}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Agendar para Outra Pessoa
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="agendamento" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm uppercase tracking-[0.3em] mb-4 block">
            Agendamento
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Reserve Seu Horário
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Agende seu atendimento em poucos passos. Escolha o serviço, 
            barbeiro e horário de sua preferência.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-12">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    s <= step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {s}
                </div>
                {s < 4 && (
                  <div className={`w-12 h-0.5 transition-colors ${s < step ? "bg-primary" : "bg-secondary"}`} />
                )}
              </div>
            ))}
          </div>

          <Card className="bg-card border-border">
            <CardContent className="p-8">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Scissors className="h-6 w-6 text-primary" />
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      Escolha o Serviço
                    </h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => setSelectedService(service.id)}
                        className={`p-4 rounded-lg border text-left transition-all ${
                          selectedService === service.id
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <p className="font-semibold text-foreground">{service.name}</p>
                        <p className="text-primary font-bold">{service.price}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <User className="h-6 w-6 text-primary" />
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      Escolha o Barbeiro
                    </h3>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {barbers.map((barber) => (
                      <button
                        key={barber.id}
                        onClick={() => setSelectedBarber(barber.id)}
                        className={`p-4 rounded-lg border text-center transition-all ${
                          selectedBarber === barber.id
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden relative">
                          <Image
                            src={barber.image}
                            alt={barber.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <p className="font-semibold text-foreground">{barber.name}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <CalendarIcon className="h-6 w-6 text-primary" />
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      Escolha a Data e Horário
                    </h3>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <Label className="text-foreground mb-3 block">Selecione a Data</Label>
                      <div className="flex justify-center">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date() || date.getDay() === 0}
                          className="rounded-lg border border-border"
                        />
                      </div>
                      {selectedDate && (
                        <p className="text-center text-primary mt-3 font-medium">
                          Data selecionada: {formatDate(selectedDate)}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label className="text-foreground mb-2 block">Horário</Label>
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`py-2 px-3 rounded-lg border text-sm transition-all ${
                              selectedTime === time
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border text-foreground hover:border-primary/50"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Clock className="h-6 w-6 text-primary" />
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      Seus Dados
                    </h3>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-foreground mb-2 block">Nome Completo</Label>
                      <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-secondary border-border text-foreground"
                        placeholder="Seu nome"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-foreground mb-2 block">WhatsApp</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="bg-secondary border-border text-foreground"
                        placeholder="(11) 99999-9999"
                        required
                      />
                    </div>
                  </form>
                </motion.div>
              )}

              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  disabled={step === 1}
                  className="border-border text-foreground"
                >
                  Voltar
                </Button>
                {step < 4 ? (
                  <Button
                    onClick={() => setStep(step + 1)}
                    disabled={!canProceed()}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Continuar
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!canProceed()}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Confirmar Agendamento
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
