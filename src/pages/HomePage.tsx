import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-800 text-white">
      {/* Placeholder for Image */}
      <div className="w-64 h-64 bg-purple-400 rounded-full flex items-center justify-center mb-8 shadow-lg">
        <span className="text-gray-700 text-xl font-semibold">Imagen</span>
      </div>

      <h1 className="text-5xl font-bold mb-12">FQuiz</h1>

      <div className="flex flex-row space-x-4 w-auto">
        <button className="bg-white text-purple-700 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-purple-100 transition duration-300">
          Ingresar código
        </button>
        <button className="bg-white text-purple-700 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-purple-100 transition duration-300">
          Crear mi quiz
        </button>
        <button className="bg-white text-purple-700 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-purple-100 transition duration-300">
          Ver quiz públicos
        </button>
      </div>
    </div>
  );
};

export default HomePage;