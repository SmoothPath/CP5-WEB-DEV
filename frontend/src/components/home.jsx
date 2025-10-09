import React from 'react';
import Slideshow from './Slideshow'; // Componente de slideshow

const Home = () => {
  return (
    <div className="bg-white min-h-screen py-10 px-4 flex flex-col items-center">
      
      {/* Título e descrição - acima do slideshow */}
      <div className="text-center mb-10 max-w-3xl">
        <h2 className="text-4xl font-bold mb-4 text-[#FF8C42]">
          Bem-vindo ao PetShop SmoothPath
        </h2>
        <p className="text-gray-700 text-lg">
          Aqui você encontra os melhores produtos para seu pet, com qualidade, carinho e preço justo.
        </p>
      </div>

      {/* Slide Show */}
      <div className="w-full max-w-5xl mb-10">
        <Slideshow />
      </div>
      
    </div>
  );
};

export default Home;
