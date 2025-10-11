import React, { useState, useEffect } from "react";

const imagens = [
  "/imagens/banner1.jpg",
  "/imagens/banner2.jpg",
  "/imagens/banner3.jpg",
];

const Slideshow = () => {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      iniciarTransicao((index + 1) % imagens.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [index]);

  const iniciarTransicao = (novoIndex) => {
    setPrevIndex(index);
    setIsTransitioning(true);
    setTimeout(() => {
      setIndex(novoIndex);
      setIsTransitioning(false);
    }, 500); // duração da transição
  };

  const nextSlide = () => iniciarTransicao((index + 1) % imagens.length);
  const prevSlide = () => iniciarTransicao((index - 1 + imagens.length) % imagens.length);

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-xl shadow-lg h-[400px] md:h-[500px] lg:h-[550px]">
      {/* Imagem anterior (fade-out) */}
      {isTransitioning && prevIndex !== null && (
        <img
          src={imagens[prevIndex]}
          alt={`Slide ${prevIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover opacity-100 transition-opacity duration-500"
        />
      )}

      {/* Imagem atual (fade-in) */}
      <img
        src={imagens[index]}
        alt={`Slide ${index + 1}`}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Setas */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 z-10"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 z-10"
      >
        ›
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {imagens.map((_, i) => (
          <span
            key={i}
            className={`w-4 h-4 rounded-full transition-colors duration-300 ${
              i === index ? "bg-[#FF8C42]" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
