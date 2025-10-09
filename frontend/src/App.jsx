import React from 'react'
import Produto from './components/Produto'
import Home from './components/Home'
import Sobre from './components/Sobre'
import Contato from './components/Contato'
import './index.css'
import Logo from './assets/petshop.png' // caminho da sua logo

const App = () => {
  return (
    <div className="min-h-screen bg-[#fefaf6] text-gray-700">
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

      {/* Footer */}
      <footer className="bg-[#FF8C42] text-[#fdf6f0] text-center py-4 rounded-t-xl shadow-inner mt-12">
        © 2025 PetShop SmoothPath — Todos os direitos reservados.
      </footer>
    </div>
  )
}

export default App
