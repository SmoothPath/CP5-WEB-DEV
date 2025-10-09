import React, { useState, useEffect } from "react";

const imagens = [
  "/imagens/banner1.jpg",
  "/imagens/banner2.jpg",
  "/imagens/banner3.jpg",
];

const Slideshow = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagens.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setIndex((prev) => (prev + 1) % imagens.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + imagens.length) % imagens.length);

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-xl shadow-lg">
      {/* Imagem do slide */}
      <img
        src={imagens[index]}
        alt={`Slide ${index + 1}`}
        className="w-full h-[400px] md:h-[500px] lg:h-[550px] object-cover"
      />

      {/* Setas */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50"
      >
        ›
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {imagens.map((_, i) => (
          <span
            key={i}
            className={`w-4 h-4 rounded-full ${i === index ? "bg-[#FF8C42]" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
