import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

// --- Icons as React Components ---
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

const SearchIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const UserCircleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const WifiIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
  </svg>
);

const WifiOffIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M12 20h.01M8.111 16.404a5.5 5.5 0 012.518-1.108M13.348 15.33a5.5 5.5 0 012.541 1.074M4.929 12.929c1.974-1.974 4.68-2.924 7.365-2.834M15.636 10.26a10.025 10.025 0 013.435 2.67M1.394 9.393a15.016 15.016 0 014.567-3.142M10.965 5.758a14.992 14.992 0 017.078.968M19.747 7.96a15.006 15.006 0 012.86 1.433" />
  </svg>
);

// --- Types & Components ---

type BookCardProps = {
  title: string;
  author: string;
  coverColor: string;
};

const BookCard: React.FC<BookCardProps> = ({ title, author, coverColor }) => (
  <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 cursor-pointer">
    <div className={`flex-shrink-0 w-12 h-16 ${coverColor} rounded flex items-center justify-center`}>
      <SimpleBookIcon className="h-6 w-6 text-white/80" />
    </div>
    <div>
      <h4 className="font-bold text-gray-800">{title}</h4>
      <p className="text-sm text-gray-500">{author}</p>
    </div>
  </div>
);

type Recommendation = {
  title: string;
  author: string;
  reason: string;
};

// --- Mock Data (Fallback) ---
const MOCK_DONATED_BOOKS = [
  { id: 1, title: "O Pequeno Príncipe", author: "Antoine de Saint-Exupéry" },
  { id: 2, title: "A Menina que Roubava Livros", author: "Markus Zusak" },
  { id: 3, title: "Onde Vivem os Monstros", author: "Maurice Sendak" },
];

const MOCK_DELIVERED_BOOKS = [
  { id: 1, title: "Chapeuzinho Amarelo", author: "Chico Buarque" },
  { id: 2, title: "Marcelo, Marmelo, Martelo", author: "Ruth Rocha" },
  { id: 3, title: "A Turma da Mônica", author: "Mauricio de Sousa" },
];

// --- Main Application ---
const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Data State (Adaptable for API connection)
  const [recentDonations, setRecentDonations] = useState(MOCK_DONATED_BOOKS);
  const [deliveredBooks, setDeliveredBooks] = useState(MOCK_DELIVERED_BOOKS);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'demo'>('demo');

  // AI State
  const [aiPrompt, setAiPrompt] = useState('');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiError, setAiError] = useState('');

  // Effect to fetch data from backend if configured
  useEffect(() => {
    const connectToBackend = async () => {
      const backendUrl = process.env.REACT_APP_API_URL; 
      
      if (!backendUrl) {
        // No backend configured, staying in demo mode
        setConnectionStatus('demo');
        return; 
      }

      setIsConnecting(true);
      try {
        const [donationsRes, deliveredRes] = await Promise.all([
          fetch(`${backendUrl}/api/books/recent`),
          fetch(`${backendUrl}/api/books/delivered`)
        ]);

        if (donationsRes.ok && deliveredRes.ok) {
          const donationsData = await donationsRes.json();
          const deliveredData = await deliveredRes.json();
          setRecentDonations(donationsData);
          setDeliveredBooks(deliveredData);
          setConnectionStatus('connected');
        } else {
          throw new Error("Backend returned error");
        }
      } catch (error) {
        console.warn("Could not connect to backend, using local fallback data.", error);
        setConnectionStatus('demo');
      } finally {
        setIsConnecting(false);
      }
    };

    connectToBackend();
  }, []);

  const handleAiRecommendation = async () => {
    if (!aiPrompt.trim()) return;
    
    setLoadingAI(true);
    setAiError('');
    setRecommendations([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Você é um bibliotecário especializado em literatura infantil. O usuário vai descrever uma criança (idade, gostos, interesses). Recomende 3 livros em Português que seriam perfeitos para ela. Retorne apenas um JSON válido.
        
        Descrição do usuário: "${aiPrompt}"`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                author: { type: Type.STRING },
                reason: { type: Type.STRING, description: "Uma frase curta e envolvente explicando por que este livro é perfeito para essa criança." }
              }
            }
          }
        }
      });

      if (response.text) {
        const data = JSON.parse(response.text);
        setRecommendations(data);
      }
    } catch (err) {
      console.error("Erro ao buscar recomendações:", err);
      setAiError('Ops! Ocorreu um erro ao consultar nosso mago dos livros. Tente novamente.');
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-brand-pink-light/80 backdrop-blur-md sticky top-0 z-10 shadow-sm">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <SimpleBookIcon className="h-8 w-8 text-brand-purple" />
            <a href="#" className="font-display text-2xl font-bold text-gray-800">
              Pontes de Papel
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#ai-wizard" className="text-gray-600 hover:text-brand-purple transition-colors flex items-center gap-1">
               <SparklesIcon className="h-4 w-4" />
               <span>Mágico de Livros</span>
            </a>
            <a href="#mission" className="text-gray-600 hover:text-brand-purple transition-colors">Nossa Missão</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-brand-purple transition-colors">Como Funciona</a>
            <a href="#books-showcase" className="text-gray-600 hover:text-brand-purple transition-colors">Nossa Estante</a>
          </div>
          <div className="hidden md:flex items-center">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Procurar livros..."
                className="w-56 pl-10 pr-4 py-2 border rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple transition-all"
                aria-label="Procurar por livros"
              />
            </div>
          </div>
          <div className="flex items-center">
             <a href="#" className="flex items-center space-x-2 text-sm font-medium bg-brand-purple text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-all shadow-md">
                <UserCircleIcon className="h-5 w-5" />
                <span>Entrar / Cadastrar</span>
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-white relative overflow-hidden">
           {/* Decorative background blobs */}
           <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-teal/10 rounded-full blur-3xl"></div>
           <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-brand-purple/10 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-6 text-center relative z-0">
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-4">
              Construindo futuros, <span className="gradient-text">uma página de cada vez.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Promovendo o acesso à leitura e à educação para crianças em situação de vulnerabilidade social através da doação e empréstimo de livros.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="#ai-wizard" className="bg-brand-purple text-white font-bold py-3 px-8 rounded-full text-lg hover:scale-105 transition-transform shadow-lg flex items-center justify-center gap-2">
                  <SparklesIcon className="h-5 w-5" />
                  Descobrir Livros
                </a>
                <a href="#how-it-works" className="bg-white text-brand-purple border-2 border-brand-purple font-bold py-3 px-8 rounded-full text-lg hover:bg-brand-purple/5 transition-colors shadow-md">
                  Como Funciona
                </a>
            </div>
          </div>
        </section>

        {/* AI Book Wizard Section */}
        <section id="ai-wizard" className="py-20 bg-gradient-to-b from-brand-pink-light/30 to-white">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <div className="inline-block p-3 rounded-full bg-brand-yellow/20 mb-4">
                <SparklesIcon className="h-8 w-8 text-brand-yellow" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Mágico de Livros</h2>
              <p className="text-gray-600 text-lg">
                Não sabe qual livro doar ou escolher? Conte-nos sobre a criança (idade, interesses, sonhos) e nossa IA sugerirá as histórias perfeitas.
              </p>
            </div>

            <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex flex-col gap-4">
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Ex: Menino de 10 anos que gosta de robôs e aventuras no espaço..."
                  className="w-full p-4 rounded-xl border border-gray-200 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 outline-none resize-none h-32 text-gray-700 transition-all"
                />
                <button
                  onClick={handleAiRecommendation}
                  disabled={loadingAI || !aiPrompt.trim()}
                  className={`w-full py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
                    loadingAI || !aiPrompt.trim() 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : 'bg-brand-teal hover:bg-teal-400 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                  }`}
                >
                  {loadingAI ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Consultando o Oráculo...
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="h-5 w-5" />
                      Receber Sugestões Mágicas
                    </>
                  )}
                </button>
              </div>

              {aiError && (
                <div className="mt-4 p-4 bg-red-50 text-red-500 rounded-lg text-center text-sm">
                  {aiError}
                </div>
              )}
            </div>

            {/* Recommendations Grid */}
            {recommendations.length > 0 && (
              <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto animate-fade-in">
                {recommendations.map((book, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                    <div className="h-12 w-12 bg-brand-purple/10 rounded-lg flex items-center justify-center mb-4 text-brand-purple">
                      <SimpleBookIcon />
                    </div>
                    <h3 className="font-bold text-xl text-gray-800 mb-1">{book.title}</h3>
                    <p className="text-sm font-medium text-brand-purple mb-4">{book.author}</p>
                    <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                      "{book.reason}"
                    </p>
                    <button className="mt-4 w-full py-2 border border-brand-purple text-brand-purple rounded-lg hover:bg-brand-purple hover:text-white transition-colors text-sm font-medium">
                      Buscar para Doar
                    </button>
                  </div>
                ))}
              </div>
            )}
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

        {/* Books Showcase Section */}
        <section id="books-showcase" className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-display">Nossa Estante Virtual</h2>
              <p className="text-gray-600 mt-2">Veja os livros que estão construindo nossas pontes.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div>
                <h3 className="text-2xl font-bold font-display text-center mb-6 text-brand-green">Últimas Doações</h3>
                <div className="space-y-4">
                  {isConnecting && recentDonations === MOCK_DONATED_BOOKS ? (
                    <div className="text-center py-4 text-gray-400 text-sm animate-pulse">Sincronizando...</div>
                  ) : null}
                  {recentDonations.map((book: any) => (
                    <BookCard key={book.id || book.title} title={book.title} author={book.author} coverColor="bg-brand-green" />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold font-display text-center mb-6 text-brand-yellow">Entregues com Carinho</h3>
                <div className="space-y-4">
                  {isConnecting && deliveredBooks === MOCK_DELIVERED_BOOKS ? (
                    <div className="text-center py-4 text-gray-400 text-sm animate-pulse">Sincronizando...</div>
                  ) : null}
                  {deliveredBooks.map((book: any) => (
                    <BookCard key={book.id || book.title} title={book.title} author={book.author} coverColor="bg-brand-yellow" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} Pontes de Papel. Todos os direitos reservados.</p>
            <p className="text-sm text-gray-400 mt-2">Construindo um futuro melhor através da leitura.</p>
          </div>
          
          {/* System Status Indicator */}
          <div className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-full text-xs font-medium">
            {connectionStatus === 'connected' ? (
               <>
                 <WifiIcon className="h-4 w-4 text-green-400" />
                 <span className="text-green-400">Sistema Online</span>
               </>
            ) : (
               <>
                 <WifiOffIcon className="h-4 w-4 text-brand-yellow" />
                 <span className="text-brand-yellow">Modo Demonstração</span>
               </>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;