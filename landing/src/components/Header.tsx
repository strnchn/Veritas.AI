import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container">
        <nav className="flex items-center justify-between py-6">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("hero");
            }}
            className="text-2xl font-serif text-display hover:opacity-70 transition-opacity" style={{color: '#ffccf6'}}
          >
            Veritas.AI®
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("features");
              }}
              className="text-sm hover:opacity-70 transition-opacity"
            >
              Funcionalidades
            </a>
            <a
              href="#technology"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("technology");
              }}
              className="text-sm hover:opacity-70 transition-opacity"
            >
              Tecnologia
            </a>
            <a
              href="#faq"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("faq");
              }}
              className="text-sm hover:opacity-70 transition-opacity"
            >
              FAQ
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="text-sm hover:opacity-70 transition-opacity"
            >
              Contato
            </a>
          </div>

          <Button
            variant="outline"
            className="bg-transparent border-foreground hover:bg-foreground hover:text-background transition-all"
            onClick={() => scrollToSection("contact")}
          >
            Preview
          </Button>
        </nav>
      </div>
    </header>
  );
}

