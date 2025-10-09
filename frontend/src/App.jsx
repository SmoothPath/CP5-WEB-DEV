import React from 'react'
import Produto from './components/Produto'
import Home from './components/Home'
import Sobre from './components/Sobre'
import Contato from './components/Contato'
import './index.css'
import Logo from './assets/petshop.png'
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa'

const App = () => {
  return (
    <div className="min-h-screen bg-[#fefaf6] text-gray-700 flex flex-col">
      {/* Navbar */}
      <nav className="bg-[#FF8C42] flex justify-between items-center shadow-md px-6 py-4 rounded-b-xl">
        <div className="flex items-center gap-3">
          <img src={Logo} alt="PetShop SmoothPath" className="h-12 w-12 rounded-full object-cover" />
          <h1 className="text-2xl font-bold text-[#fdf6f0]">PetShop SmoothPath</h1>
        </div>
        <ul className="flex gap-6">
          <li><a href="#home" className="text-[#fdf6f0] hover:text-white transition-colors duration-300 cursor-pointer">Home</a></li>
          <li><a href="#sobre" className="text-[#fdf6f0] hover:text-white transition-colors duration-300 cursor-pointer">Sobre</a></li>
          <li><a href="#produtos" className="text-[#fdf6f0] hover:text-white transition-colors duration-300 cursor-pointer">Produtos</a></li>
          <li><a href="#contato" className="text-[#fdf6f0] hover:text-white transition-colors duration-300 cursor-pointer">Contato</a></li>
        </ul>
      </nav>

      {/* Seções */}
      <section id="home" className="p-8">
        <Home />
      </section>

      <section id="sobre" className="p-8 bg-white rounded-xl shadow-md my-8">
        <Sobre />
      </section>

      <section id="produtos" className="p-8 bg-white rounded-xl shadow-md my-8">
        <Produto />
      </section>

      <section id="contato" className="p-8 bg-white rounded-xl shadow-md my-8">
        <Contato />
      </section>

      {/* Footer reorganizado em camadas verticais */}
      <footer className="bg-[#FF8C42] text-[#fdf6f0] mt-auto py-8 flex flex-col items-center gap-4">
        
        {/* Logo e nome */}
        <div className="flex flex-col items-center gap-2">
          <img src={Logo} alt="PetShop SmoothPath" className="h-16 w-16 rounded-full" />
          <span className="font-bold text-2xl">PetShop SmoothPath</span>
        </div>

        {/* Frase da empresa */}
        <p className="text-center max-w-xs text-sm">
          Cuidando do seu pet com carinho e qualidade. Atendimento personalizado e produtos de confiança.
        </p>

        {/* Redes sociais */}
        <div className="flex gap-6 text-2xl">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#fdf6f0] transition">
            <FaInstagram />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#fdf6f0] transition">
            <FaFacebookF />
          </a>
          <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="hover:text-[#fdf6f0] transition">
            <FaWhatsapp />
          </a>
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
