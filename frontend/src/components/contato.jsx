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
      <p className="text-center text-[#FF8C42] font-semibold py-12">
        Carregando informações de contato...
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto my-16 p-8 bg-white rounded-2xl shadow-lg" id="contato">
      <h2 className="text-3xl font-extrabold text-[#FF8C42] mb-6 text-center">Fale Conosco</h2>
      <div className="space-y-3 text-gray-700">
        <p className="flex items-center gap-2"><FaMapMarkerAlt /> {contato.endereco}</p>
        <p className="flex items-center gap-2"><FaPhoneAlt /> {contato.telefone}</p>
        <p className="flex items-center gap-2"><FaEnvelope /> {contato.email}</p>
      </div>
      <a
        href={`mailto:${contato.email}`}
        className="mt-6 inline-block bg-[#FF8C42] hover:bg-[#e76f24] text-white font-semibold px-6 py-2 rounded-xl transition duration-200"
      >
        Enviar Mensagem
      </a>
    </div>
  );
};

export default Contato;
