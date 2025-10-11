import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Contato = () => {
  const [contato, setContato] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/contato.json")
      .then((res) => res.json())
      .then((data) => setContato(data))
      .catch((err) => console.log("Erro ao carregar contato:", err));
  }, []);

  const enviarMensagem = async () => {
    if (!nome || !mensagem) return alert("Preencha todos os campos!");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/mensagem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, mensagem }),
      });
      if (res.ok) {
        alert("Mensagem enviada com sucesso!");
        setNome("");
        setMensagem("");
        setModalOpen(false);
      } else {
        alert("Erro ao enviar mensagem.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar mensagem.");
    } finally {
      setLoading(false);
    }
  };

  if (!contato)
    return (
      <p className="text-center text-[#FF8C42] font-semibold py-12">
        Carregando informações de contato...
      </p>
    );

  return (
    <div
      className="max-w-3xl mx-auto my-16 p-8 bg-white rounded-2xl shadow-lg"
      id="contato"
    >
      <h2 className="text-3xl font-extrabold text-[#FF8C42] mb-6 text-center">
        Fale Conosco
      </h2>
      <div className="space-y-3 text-gray-700">
        <p className="flex items-center gap-2">
          <FaMapMarkerAlt /> {contato.endereco}
        </p>
        <p className="flex items-center gap-2">
          <FaPhoneAlt /> {contato.telefone}
        </p>
        <p className="flex items-center gap-2">
          <FaEnvelope /> {contato.email}
        </p>
      </div>

      {/* Botão que abre modal */}
      <button
        onClick={() => setModalOpen(true)}
        className="mt-6 inline-block bg-[#FF8C42] hover:bg-[#e76f24] text-white font-semibold px-6 py-2 rounded-xl transition duration-200"
      >
        Enviar Mensagem
      </button>

      {/* Modal inline */}
{modalOpen && (
  <div className="mt-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
    <h3 className="text-2xl font-bold text-[#FF8C42] mb-4 text-center">
      Enviar Mensagem
    </h3>
    <input
      type="text"
      placeholder="Seu nome"
      className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#FF8C42]"
      value={nome}
      onChange={(e) => setNome(e.target.value)}
    />
    <textarea
      placeholder="Sua mensagem"
      className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#FF8C42]"
      value={mensagem}
      onChange={(e) => setMensagem(e.target.value)}
      rows={4}
    ></textarea>
    <div className="flex justify-end gap-3">
      <button
        onClick={() => setModalOpen(false)}
        className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
      >
        Cancelar
      </button>
      <button
        onClick={enviarMensagem}
        className={`px-4 py-2 rounded-lg text-white bg-[#FF8C42] hover:bg-[#e76f24] transition ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Enviando..." : "Enviar"}
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default Contato;
