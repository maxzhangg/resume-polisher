import React from 'react';
import PromptGenerator from './components/PromptGenerator';
import { ScrollText, Github } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Decorative background elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="pt-12 pb-8 px-6 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm mb-6 border border-slate-100">
                <ScrollText className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            Resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Architect</span>
            </h1>
            <p className="text-slate-500 max-w-xl mx-auto text-base md:text-lg">
                Generates a precision-engineered prompt to transform your master LaTeX resume into a 1-page masterpiece tailored for your dream job.
            </p>
        </header>

        {/* Main Content */}
        <main className="flex-grow px-4 md:px-6">
            <PromptGenerator />
        </main>

        {/* Footer */}
        <footer className="py-8 text-center text-slate-400 text-sm">
            <div className="flex items-center justify-center gap-2 mb-2">
                <span>Built by Max Zhang</span>
            </div>
            <p>© {new Date().getFullYear()} Resume Architect. Private Tool.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
