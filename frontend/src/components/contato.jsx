import React, { useEffect, useState } from 'react'

const Contato = () => {
  const [contato, setContato] = useState(null)

  useEffect(() => {
    fetch('/contato.json')
      .then((res) => res.json())
      .then((data) => setContato(data))
      .catch((err) => console.log('Erro ao carregar contato:', err))
  }, [])

  if (!contato) return <p>Carregando informações de contato...</p>

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-3">Fale Conosco</h2>
      <p className="text-gray-700">{contato.endereco}</p>
      <p className="text-gray-700">📞 {contato.telefone}</p>
      <p className="text-gray-700">✉️ {contato.email}</p>
    </div>
  )
}

export default Contato
