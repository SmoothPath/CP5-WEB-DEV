import React, { useState, useEffect } from "react";

const imagens = [
  "/imagens/banner1.jpg",
  "/imagens/banner2.jpg",
  "/imagens/banner3.jpg",
];

const Slideshow = () => {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      iniciarTransicao();
    }, 4000);

    return () => clearInterval(interval);
  }, []); // 👈 roda só uma vez

  const iniciarTransicao = (novoIndex = null) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIndex((prev) =>
        novoIndex !== null ? novoIndex : (prev + 1) % imagens.length
      );
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <div className="relative w-full aspect-[16/7] overflow-hidden rounded-2xl shadow-md">
      {/* imagem atual */}
      <img
        src={imagens[index]}
        alt={`Banner ${index + 1}`}
        className={`w-full h-full object-cover transition-transform duration-500 ${
          isTransitioning ? "scale-105" : "scale-100"
        }`}
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* legenda + CTA */}
      <div className="absolute bottom-6 left-6 right-6 text-white">
        <h3 className="text-2xl sm:text-3xl font-bold drop-shadow">
          Cuidado que seu pet sente. Qualidade que você vê.
        </h3>
        <p className="mt-1 opacity-95 drop-shadow">
          Produtos selecionados e atendimento com carinho.
        </p>
        <a
          href="#produtos"
          className="inline-block mt-4 bg-white text-gray-900 font-semibold px-5 py-2 rounded-xl hover:bg-white/90 transition"
        >
          Ver Produtos
        </a>
      </div>

      {/* setas */}
      <button
        onClick={() =>
          iniciarTransicao((index - 1 + imagens.length) % imagens.length)
        }
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
        aria-label="Anterior"
      >
        ‹
      </button>
      <button
        onClick={() =>
          iniciarTransicao((index + 1) % imagens.length)
        }
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
        aria-label="Próximo"
      >
        ›
      </button>

      {/* indicadores */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {imagens.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full border border-white ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
