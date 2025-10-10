import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Contato = () => {
  const [contato, setContato] = useState(null);

  useEffect(() => {
    fetch('/contato.json')
      .then((res) => res.json())
      .then((data) => setContato(data))
      .catch((err) => console.log('Erro ao carregar contato:', err));
  }, []);

  if (!contato)
    return (
      <p className="text-center text-orange-400 font-semibold">
        Carregando informações de contato...
      </p>
    );

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-[#FF8C42] rounded-2xl text-center">
      <h2 className="text-3xl font-bold mb-6 text-[#FF8C42]">Fale Conosco</h2>
      
      <div className="space-y-4 text-gray-700 text-lg">
        <p className="flex items-center justify-center gap-3 hover:text-[#FF8C42] transition cursor-pointer">
          <FaMapMarkerAlt className="text-[#FF8C42] text-xl" />
          {contato.endereco}
        </p>
        <p className="flex items-center justify-center gap-3 hover:text-[#FF8C42] transition cursor-pointer">
          <FaPhoneAlt className="text-[#FF8C42] text-xl" />
          {contato.telefone}
        </p>
        <p className="flex items-center justify-center gap-3 hover:text-[#FF8C42] transition cursor-pointer">
          <FaEnvelope className="text-[#FF8C42] text-xl" />
          {contato.email}
        </p>
      </div>

      <button className="mt-6 bg-[#FF8C42] hover:bg-[#e76f24] text-white font-semibold px-6 py-2 rounded-xl  transition duration-200">
        <a href="mailto:marianaegito2007@gmail.com">

          Enviar Mensagem
        </a>
      </button>
    </div>
  );
};

export default Contato;
