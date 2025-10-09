import React from 'react'
import { FaPaw } from 'react-icons/fa' // ícone de patinha para decorar

const Sobre = () => {
  return (
    <div className="max-w-4xl mx-auto my-12 p-8 bg-white rounded-xl shadow-lg text-center">
      {/* Título */}
      <h2 className="text-3xl font-bold mb-2 text-[#FF8C42]">Sobre Nós</h2>
      <div className="w-20 h-1 bg-[#FF8C42] mx-auto mb-6 rounded-full"></div>

      {/* Parágrafos */}
      <p className="text-gray-700 mb-4 text-lg leading-relaxed">
        Somos uma equipe apaixonada por pets e pelo bem-estar deles, oferecendo os melhores produtos com atendimento de qualidade e carinho.
      </p>
      <p className="text-gray-600 italic text-md mb-6">
        Nosso compromisso é com a satisfação do cliente, a saúde dos pets e a melhoria contínua de nossos serviços.
      </p>

      {/* Ícones decorativos - seis patinhas */}
      <div className="flex justify-center gap-6 text-[#FF8C42] text-2xl">
        <FaPaw />
        <FaPaw />
        <FaPaw />
        <FaPaw />
        <FaPaw />
        <FaPaw />
      </div>
    </div>
  )
}

export default Sobre
