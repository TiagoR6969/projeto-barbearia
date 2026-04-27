import { Scissors } from "lucide-react"

const navLinks = [
  { name: "Início", href: "#inicio" },
  { name: "Serviços", href: "#servicos" },
  { name: "Galeria", href: "#galeria" },
  { name: "Depoimentos", href: "#depoimentos" },
  { name: "Contato", href: "#contato" },
]

export function Footer() {
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <a href="#inicio" className="flex items-center gap-2">
            <Scissors className="h-6 w-6 text-primary" />
            <span className="font-serif text-xl font-bold text-foreground">
              Barber<span className="text-primary">Elite</span>
            </span>
          </a>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <p className="text-muted-foreground text-sm">
            2024 @TechWebNew. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
