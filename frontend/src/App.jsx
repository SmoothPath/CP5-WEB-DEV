import React from 'react'
import Produto from './components/Produto'
import Home from './components/home'       // <-- minúsculo
import Sobre from './components/sobre'     // <-- minúsculo
import Contato from './components/contato' // <-- minúsculo
import './index.css'
import Logo from './assets/petshop.png'
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa'

const App = () => {
  return (
    <div className="min-h-screen text-gray-700 flex flex-col pt-16 bg-[#fafafa]">
      {/* Navbar fixa */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#FF8C42]/95 backdrop-blur supports-[backdrop-filter]:bg-[#FF8C42]/85 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            {/* Logo + título */}
            <div className="flex items-center gap-3">
              <img
                src={Logo}
                alt="PetShop SmoothPath"
                className="h-10 w-10 rounded-full object-cover"
              />
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#fdf6f0]">
                PetShop SmoothPath
              </h1>
            </div>

            {/* Links */}
            <ul className="hidden sm:flex items-center gap-6">
              {[
                { href: '#home', label: 'Home' },
                { href: '#sobre', label: 'Sobre' },
                { href: '#produtos', label: 'Produtos' },
                { href: '#contato', label: 'Contato' },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[#fdf6f0]/90 hover:text-white transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Sociais */}
            <div className="flex items-center gap-2">
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="p-2 rounded-full bg-[#fdf6f0]/15 hover:bg-[#fdf6f0]/25 transition"
              >
                <FaInstagram className="text-[#fdf6f0]" />
              </a>
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="p-2 rounded-full bg-[#fdf6f0]/15 hover:bg-[#fdf6f0]/25 transition"
              >
                <FaFacebookF className="text-[#fdf6f0]" />
              </a>
              <a
                href="https://wa.me/5511999999999"
                aria-label="WhatsApp"
                className="p-2 rounded-full bg-[#fdf6f0]/15 hover:bg-[#fdf6f0]/25 transition"
              >
                <FaWhatsapp className="text-[#fdf6f0]" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <section id="home">
          <Home />
        </section>

        <section id="sobre">
          <Sobre />
        </section>

        <section id="produtos">
          <div className="max-w-6xl mx-auto px-4">
            <Produto />
          </div>
        </section>

        <section id="contato" className="pb-16">
          <Contato />
        </section>
      </main>

      <footer className="mt-auto bg-[#FF8C42] text-[#fdf6f0]">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid sm:grid-cols-2 gap-6 items-center">
            <p className="text-sm opacity-90">
              © 2025 PetShop SmoothPath — Todos os direitos reservados.
            </p>
            <div className="flex sm:justify-end gap-3">
              <a href="#home" className="underline hover:text-white">Voltar ao topo</a>
              <a href="#contato" className="underline hover:text-white">Contato</a>
            </div>
          </div>
        </div>

        {/* Políticas de privacidade */}
        <div className="text-xs text-center mt-2">
          © 2025 PetShop SmoothPath — Todos os direitos reservados. <br />
          <a href="#politicas" className="underline hover:text-white">Políticas de Privacidade</a>
        </div>
      </footer>
    </div>
  )
}

export default App
