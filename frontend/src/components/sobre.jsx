import React from 'react'
import { FaPaw, FaHeart, FaLeaf } from 'react-icons/fa'

const Sobre = () => {
  return (
    <div className="max-w-4xl mx-auto my-16 p-10 bg-white rounded-2xl shadow-lg text-center">
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-2 text-[#FF8C42] tracking-tight">Sobre Nós</h2>
      <div className="w-24 h-1 bg-[#FF8C42] mx-auto mb-6 rounded-full"></div>

      <p className="text-gray-700 mb-4 text-lg leading-relaxed">
        Somos uma equipe apaixonada por pets e pelo bem-estar deles. Selecionamos os melhores produtos com atendimento de qualidade e carinho.
      </p>
      <p className="text-gray-600 italic text-md mb-8">
        Nosso compromisso é com a satisfação do cliente, a saúde dos pets e a melhoria contínua dos nossos serviços.
      </p>

      <div className="grid sm:grid-cols-3 gap-6 text-[#FF8C42]">
        <div className="bg-[#FF8C42]/10 rounded-xl p-6">
          <FaPaw className="text-3xl mx-auto" />
          <p className="mt-3 font-semibold text-gray-800">Cuidado</p>
          <p className="text-gray-600 text-sm">Atenção e carinho em cada detalhe.</p>
        </div>
        <div className="bg-[#FF8C42]/10 rounded-xl p-6">
          <FaHeart className="text-3xl mx-auto" />
          <p className="mt-3 font-semibold text-gray-800">Amor</p>
          <p className="text-gray-600 text-sm">Tratamos seu pet como família.</p>
        </div>
        <div className="bg-[#FF8C42]/10 rounded-xl p-6">
          <FaLeaf className="text-3xl mx-auto" />
          <p className="mt-3 font-semibold text-gray-800">Qualidade</p>
          <p className="text-gray-600 text-sm">Produtos selecionados e confiáveis.</p>
        </div>
      </div>
    </div>
  )
}

export default Sobre
