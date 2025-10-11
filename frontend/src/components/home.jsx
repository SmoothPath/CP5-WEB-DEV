import React from 'react';
import Slideshow from './Slideshow';

const Home = () => {
  return (
    <div className="bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-3 text-[#FF8C42] tracking-tight">
            Bem-vindo ao PetShop SmoothPath
          </h2>
          <p className="text-gray-600 text-lg">
            Aqui você encontra os melhores produtos para seu pet, com qualidade, carinho e preço justo.
          </p>
        </div>

        <div className="w-full mb-10">
          <Slideshow />
        </div>

        {/* Destaques rápidos */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Higiene & Beleza", desc: "Shampoos, escovas e cuidados para um pet saudável." },
            { title: "Alimentação", desc: "Rações e petiscos cuidadosamente selecionados." },
            { title: "Acessórios", desc: "Camas, coleiras e brinquedos que fazem a diferença." },
          ].map((c) => (
            <div key={c.title} className="rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition bg-white p-6">
              <h3 className="text-xl font-bold text-gray-800">{c.title}</h3>
              <p className="text-gray-600 mt-2">{c.desc}</p>
              <a href="#produtos" className="inline-block mt-4 text-[#FF8C42] font-semibold hover:underline">Ver mais →</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
