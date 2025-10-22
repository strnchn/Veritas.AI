import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url(/veritas_hero_image.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="container relative z-10 text-center">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-6xl md:text-8xl lg:text-9xl text-display mb-8 animate-fade-in" style={{color: '#ffccf6'}}>
              Veritas.AI®
            </h1>
            <p className="text-2xl md:text-4xl text-display text-white/90 mb-4">
              Sistema de Avaliacao de TCC com IA
            </p>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-12">
              Uma banca avaliadora virtual composta por tres especialistas que analisam trabalhos
              academicos de forma rigorosa e estruturada
            </p>
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 text-lg px-8 py-6"
              onClick={() => {
                const element = document.getElementById("features");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Conheca o Sistema
            </Button>
          </div>
        </div>
      </section>

      {/* Copyright Badge */}
      <section className="bg-white text-black py-4">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="border-2 border-black px-3 py-1 text-xs font-mono">OPS DEV</div>
              <span className="text-sm">©2025</span>
            </div>
            <a
              href="https://github.com/strnchn/Veritas.AI"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:opacity-70 transition-opacity"
            >
              Ver no GitHub →
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding color-block-pink">
        <div className="container">
          <h2 className="text-5xl md:text-7xl lg:text-8xl text-display text-black mb-20 text-center">
            Avaliadores Virtuais
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="space-y-4">
              <div className="text-6xl text-display text-black">01</div>
              <h3 className="text-3xl text-display text-black">Metodologia</h3>
              <p className="text-black/80 text-lg leading-relaxed">
                Avalia coerencia metodologica, clareza dos objetivos e adequacao dos metodos
                aplicados. Pontuacao de 0 a 3 pontos.
              </p>
            </div>

            <div className="space-y-4">
              <div className="text-6xl text-display text-black">02</div>
              <h3 className="text-3xl text-display text-black">Escrita Academica</h3>
              <p className="text-black/80 text-lg leading-relaxed">
                Verifica conformidade com normas ABNT, qualidade redacional e formatacao de
                citacoes e referencias. Pontuacao de 0 a 2 pontos.
              </p>
            </div>

            <div className="space-y-4">
              <div className="text-6xl text-display text-black">03</div>
              <h3 className="text-3xl text-display text-black">Originalidade</h3>
              <p className="text-black/80 text-lg leading-relaxed">
                Detecta possiveis indicios de plagio, avalia originalidade da contribuicao e
                verifica coerencia cientifica. Pontuacao de 0 a 2 pontos.
              </p>
            </div>
          </div>

          <div className="mt-20 max-w-4xl mx-auto">
            <div className="space-y-4 text-center">
              <h3 className="text-4xl text-display text-black">Coerencia Cientifica Geral</h3>
              <p className="text-black/80 text-lg leading-relaxed">
                Avalia a qualidade da base teorica, sustentacao das conclusoes e relevancia
                cientifica do trabalho. Pontuacao de 0 a 3 pontos.
              </p>
              <p className="text-2xl text-display text-black mt-8">
                Nota Final: Soma das pontuacoes (maximo 10.0)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <p className="text-4xl md:text-5xl lg:text-6xl text-display text-black leading-tight mb-12">
              O Veritas.AI simula uma banca avaliadora composta por tres especialistas virtuais que
              analisam trabalhos academicos de forma rigorosa e estruturada, utilizando
              inteligencia artificial avancada.
            </p>
            <div className="grid md:grid-cols-2 gap-12 mt-20">
              <div>
                <h3 className="text-2xl text-display text-black mb-4">Upload Flexivel</h3>
                <p className="text-black/70 leading-relaxed">
                  Aceita arquivos PDF, DOCX e TXT, alem de permitir input de texto direto para
                  maxima flexibilidade.
                </p>
              </div>
              <div>
                <h3 className="text-2xl text-display text-black mb-4">Analise Completa</h3>
                <p className="text-black/70 leading-relaxed">
                  Utiliza a API do Perplexity para analise profunda com modelo de linguagem
                  avancado e prompt engineering especializado.
                </p>
              </div>
              <div>
                <h3 className="text-2xl text-display text-black mb-4">Resultados Detalhados</h3>
                <p className="text-black/70 leading-relaxed">
                  Apresenta resultados em modal interativo com opcao de download de relatorio
                  completo em formato TXT.
                </p>
              </div>
              <div>
                <h3 className="text-2xl text-display text-black mb-4">Interface Moderna</h3>
                <p className="text-black/70 leading-relaxed">
                  Design responsivo e intuitivo, compativel com dispositivos moveis e desktop para
                  acesso em qualquer lugar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section
        id="technology"
        className="section-padding relative"
        style={{
          backgroundImage: "url(/veritas_technology.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="container relative z-10">
          <h2 className="text-5xl md:text-7xl lg:text-8xl text-display text-white mb-20 text-center">
            Tecnologias Utilizadas
          </h2>

          <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl text-display text-white mb-6">Backend</h3>
                <ul className="space-y-3 text-white/80 text-lg">
                  <li>• FastAPI - Framework web moderno e rapido</li>
                  <li>• Python 3.11 - Linguagem de programacao</li>
                  <li>• Pydantic - Validacao de dados</li>
                  <li>• python-docx - Processamento de arquivos Word</li>
                  <li>• PyPDF2/pdfplumber - Processamento de PDFs</li>
                  <li>• httpx - Cliente HTTP assincrono</li>
                  <li>• Uvicorn - Servidor ASGI</li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-3xl text-display text-white mb-6">Frontend</h3>
                <ul className="space-y-3 text-white/80 text-lg">
                  <li>• HTML5/CSS3/JavaScript - Interface web</li>
                  <li>• Fetch API - Requisicoes HTTP</li>
                  <li>• Design Responsivo - Compativel com dispositivos moveis</li>
                </ul>
              </div>

              <div>
                <h3 className="text-3xl text-display text-white mb-6">Inteligencia Artificial</h3>
                <ul className="space-y-3 text-white/80 text-lg">
                  <li>• Perplexity API - Modelo de linguagem avancado</li>
                  <li>• Prompt Engineering - Sistema de tres avaliadores</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding color-block-mint">
        <div className="container">
          <h2 className="text-5xl md:text-7xl lg:text-8xl text-display text-black mb-20 text-center">
            Como Funciona
          </h2>

          <div className="max-w-4xl mx-auto space-y-12">
            <div className="flex gap-8 items-start">
              <div className="text-5xl text-display text-black flex-shrink-0">1</div>
              <div>
                <h3 className="text-3xl text-display text-black mb-3">Envie seu Trabalho</h3>
                <p className="text-black/70 text-lg leading-relaxed">
                  Faca upload do arquivo PDF, DOCX ou TXT, ou cole o texto diretamente na
                  interface.
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-start">
              <div className="text-5xl text-display text-black flex-shrink-0">2</div>
              <div>
                <h3 className="text-3xl text-display text-black mb-3">Analise Automatica</h3>
                <p className="text-black/70 text-lg leading-relaxed">
                  O sistema processa o documento e envia para analise dos tres avaliadores virtuais
                  especializados.
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-start">
              <div className="text-5xl text-display text-black flex-shrink-0">3</div>
              <div>
                <h3 className="text-3xl text-display text-black mb-3">Receba o Resultado</h3>
                <p className="text-black/70 text-lg leading-relaxed">
                  Visualize as avaliacoes detalhadas de cada criterio e a nota final, com
                  recomendacoes especificas para melhoria.
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-start">
              <div className="text-5xl text-display text-black flex-shrink-0">4</div>
              <div>
                <h3 className="text-3xl text-display text-black mb-3">Baixe o Relatorio</h3>
                <p className="text-black/70 text-lg leading-relaxed">
                  Faca download do relatorio completo em formato TXT para consulta futura e
                  implementacao das melhorias sugeridas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-padding bg-white">
        <div className="container">
          <h2 className="text-5xl md:text-7xl lg:text-8xl text-display text-black mb-20 text-center">
            Perguntas Frequentes
          </h2>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border-b border-black/20">
                <AccordionTrigger className="text-xl text-display text-black hover:no-underline">
                  O que e o Veritas.AI?
                </AccordionTrigger>
                <AccordionContent className="text-black/70 text-lg leading-relaxed">
                  O Veritas.AI e um sistema completo de avaliacao de Trabalhos de Conclusao de
                  Curso (TCC) que utiliza Inteligencia Artificial. Ele simula uma banca avaliadora
                  composta por tres especialistas virtuais que analisam trabalhos academicos de
                  forma rigorosa e estruturada.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-b border-black/20">
                <AccordionTrigger className="text-xl text-display text-black hover:no-underline">
                  Quais formatos de arquivo sao aceitos?
                </AccordionTrigger>
                <AccordionContent className="text-black/70 text-lg leading-relaxed">
                  O sistema aceita arquivos nos formatos PDF, DOCX (Microsoft Word) e TXT (texto
                  simples). Alem disso, voce pode colar o texto diretamente na interface sem
                  necessidade de upload de arquivo.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-b border-black/20">
                <AccordionTrigger className="text-xl text-display text-black hover:no-underline">
                  Como funciona o sistema de pontuacao?
                </AccordionTrigger>
                <AccordionContent className="text-black/70 text-lg leading-relaxed">
                  O sistema avalia o trabalho em quatro criterios: Metodologia (0-3 pontos),
                  Escrita Academica e ABNT (0-2 pontos), Originalidade e Coerencia Cientifica (0-2
                  pontos), e Coerencia Cientifica Geral (0-3 pontos). A nota final e a soma de
                  todas as pontuacoes, com maximo de 10.0 pontos.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-b border-black/20">
                <AccordionTrigger className="text-xl text-display text-black hover:no-underline">
                  Quanto tempo leva a analise?
                </AccordionTrigger>
                <AccordionContent className="text-black/70 text-lg leading-relaxed">
                  O tempo de analise varia de acordo com o tamanho do documento, mas geralmente
                  leva entre 30 e 60 segundos. O sistema utiliza modelos de IA avancados que
                  processam o conteudo de forma rapida e eficiente.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-b border-black/20">
                <AccordionTrigger className="text-xl text-display text-black hover:no-underline">
                  O sistema detecta plagio?
                </AccordionTrigger>
                <AccordionContent className="text-black/70 text-lg leading-relaxed">
                  O sistema fornece uma analise indicativa de originalidade e pode identificar
                  possiveis indicios de plagio, mas nao substitui ferramentas especializadas de
                  deteccao de plagio. Recomendamos o uso de ferramentas complementares para uma
                  verificacao completa.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-b border-black/20">
                <AccordionTrigger className="text-xl text-display text-black hover:no-underline">
                  Como instalar e usar o sistema?
                </AccordionTrigger>
                <AccordionContent className="text-black/70 text-lg leading-relaxed">
                  O sistema requer Python 3.11 ou superior e uma chave de API do Perplexity. Apos
                  clonar o repositorio do GitHub, instale as dependencias com pip, configure a API
                  key no arquivo .env e inicie o servidor com o script run.sh. Instrucoes
                  detalhadas estao disponiveis no repositorio.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding color-block-coral">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl lg:text-8xl text-display text-white mb-8">
              Pronto para avaliar seu TCC?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
              Acesse o repositorio no GitHub e comece a usar o Veritas.AI hoje mesmo. Sistema
              completo, open source e pronto para uso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90 text-lg px-8 py-6"
                asChild
              >
                <a
                  href="https://github.com/strnchn/Veritas.AI"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver no GitHub
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6"
                onClick={() => {
                  const element = document.getElementById("contact");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Entre em Contato
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-white">
        <div className="container">
          <h2 className="text-5xl md:text-7xl lg:text-8xl text-display text-black mb-20 text-center">
            Entre em Contato
          </h2>

          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-lg text-black mb-2">
                  Nome
                </label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white border-black text-black"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-lg text-black mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white border-black text-black"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-lg text-black mb-2">
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-white border-black text-black min-h-[150px]"
                  placeholder="Como podemos ajudar?"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-black text-white hover:bg-black/90 text-lg py-6"
              >
                Enviar Mensagem
              </Button>
            </form>

            <div className="mt-12 text-center">
              <p className="text-black/70 mb-4">Ou entre em contato diretamente:</p>
              <a
                href="https://github.com/strnchn/Veritas.AI"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:opacity-70 transition-opacity text-lg"
              >
                github.com/strnchn/Veritas.AI
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <p className="text-2xl text-display mb-2">Veritas.AI®</p>
              <p className="text-white/60">Sistema de Avaliacao de TCC com IA</p>
            </div>

            <div className="flex gap-8">
              <a
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-white/80 hover:text-white transition-colors"
              >
                Funcionalidades
              </a>
              <a
                href="#technology"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("technology")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-white/80 hover:text-white transition-colors"
              >
                Tecnologia
              </a>
              <a
                href="#faq"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-white/80 hover:text-white transition-colors"
              >
                FAQ
              </a>
              <a
                href="https://github.com/strnchn/Veritas.AI"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/20 text-center text-white/60">
            <p>© 2025 Veritas.AI. Desenvolvido 100% em Python com FastAPI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

