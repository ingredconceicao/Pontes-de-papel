import React from 'react';

// Icons as React Components
const SimpleBookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v11.5m-8-11.5h16M4 6.253c0-1.518 1.23-2.753 2.75-2.753S9.5 4.735 9.5 6.253m5 0c0-1.518 1.23-2.753 2.75-2.753S20 4.735 20 6.253M4 17.753h16" />
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-salmon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.318a4.5 4.5 0 010-6.364z" />
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H9v-2.625A4 4 0 0113 16h-2a4 4 0 01-4-4V9a4 4 0 014-4h2a4 4 0 014 4v1.375A4 4 0 0115 18.375V21z" />
  </svg>
);


const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 shadow-sm">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <SimpleBookIcon className="h-8 w-8 text-brand-purple" />
            <a href="#" className="font-display text-2xl font-bold text-gray-800">
              Pontes de Papel
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#mission" className="text-gray-600 hover:text-brand-purple transition-colors">Nossa Missão</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-brand-purple transition-colors">Como Funciona</a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-sm font-medium text-brand-purple hover:text-brand-teal transition-colors">Login Aluno</a>
            <a href="#" className="text-sm font-medium bg-brand-yellow text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-all shadow-md">
              Login Doador
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-4">
              Construindo futuros, <span className="gradient-text">uma página de cada vez.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Promovendo o acesso à leitura e à educação para crianças em situação de vulnerabilidade social através da doação e empréstimo de livros.
            </p>
            <a href="#" className="bg-brand-purple text-white font-bold py-3 px-8 rounded-full text-lg hover:scale-105 transition-transform shadow-lg">
              Quero Doar Livros
            </a>
          </div>
        </section>

        {/* Mission Section */}
        <section id="mission" className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-display">Nossa Missão</h2>
              <p className="text-gray-600 mt-2">Incentivo à leitura infantil e inclusão educacional.</p>
            </div>
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <p className="text-lg text-gray-700 leading-relaxed">
                O projeto <strong>Pontes de Papel</strong> tem como objetivo central conectar doadores de livros com crianças que precisam de acesso à leitura. Nossa plataforma digital gerencia o empréstimo e a doação de livros, criando um ecossistema de solidariedade e conhecimento.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mt-4">
                Acreditamos que cada livro doado é uma semente de oportunidade plantada no futuro de uma criança. Facilitamos essa conexão de forma segura e eficiente, garantindo que mais histórias cheguem às mãos certas.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-display">Como Funciona</h2>
              <p className="text-gray-600 mt-2">Um processo simples para conectar corações e mentes.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div className="flex flex-col items-center">
                <div className="bg-brand-salmon/20 p-4 rounded-full mb-4">
                  <HeartIcon />
                </div>
                <h3 className="text-xl font-bold mb-2">1. Doe um Livro</h3>
                <p className="text-gray-600">Doadores se cadastram e listam os livros que desejam compartilhar, sejam eles novos ou usados em bom estado.</p>
              </div>
              <div className="flex flex-col items-center">
                 <div className="bg-brand-teal/20 p-4 rounded-full mb-4">
                  <UsersIcon />
                </div>
                <h3 className="text-xl font-bold mb-2">2. Conecte-se</h3>
                <p className="text-gray-600">Nossa plataforma conecta a doação com uma criança ou instituição parceira que precisa daquele livro.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-brand-purple/20 p-4 rounded-full mb-4">
                  <SimpleBookIcon className="h-12 w-12 text-brand-purple" />
                </div>
                <h3 className="text-xl font-bold mb-2">3. Transforme uma Vida</h3>
                <p className="text-gray-600">A criança recebe o livro e embarca em uma nova jornada de imaginação, aprendizado e esperança.</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; {new Date().getFullYear()} Pontes de Papel. Todos os direitos reservados.</p>
          <p className="text-sm text-gray-400 mt-2">Construindo um futuro melhor através da leitura.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
