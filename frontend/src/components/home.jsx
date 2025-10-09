import React from 'react'

const Home = () => {
  return (
    <div className="bg-white min-h-screen text-center py-10">
      <h2 className="text-3xl font-bold mb-3 text-gray-700">
        Bem-vindo ao PetShop SmoothPath
      </h2>
      <p className="text-gray-700 text-lg mb-6">
        Aqui você encontra os melhores produtos com qualidade e preço justo.
      </p>
      <img
        src="https://t3.ftcdn.net/jpg/04/81/32/08/360_F_481320874_0ySypkY4mZYl4jEmCOGXMbPgVhocmw2t.jpg"
        alt="Loja"
        className="mt-4 mx-auto rounded-lg shadow-md w-3/4"
      />
    </div>
  )
}

export default Home
