"use client";

import { useState } from "react";

export default function Home() {
  const [reactivoA, setReactivoA] = useState("");
  const [reactivoB, setReactivoB] = useState("");
  const [resultado, setResultado] = useState("");
  const [loading, setLoading] = useState(false);

  const ejecutarReaccion = async () => {
    if (!reactivoA || !reactivoB) {
      setResultado("Por favor, ingresa ambos reactivos (ej: CH4 y O2).");
      return;
    }

    setLoading(true);
    setResultado("");

    try {
      // Esta es la URL de tu backend en Render que ya está "Live"
      const url = `https://chemai-i3ed.onrender.com/reaction?reactivoA=${encodeURIComponent(reactivoA)}&reactivoB=${encodeURIComponent(reactivoB)}`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.resultado) {
        setResultado(data.resultado);
      } else {
        setResultado("No se pudo procesar la reacción.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResultado("Error de conexión con el servidor químico. Verifica que Render esté activo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-4">
      <div className="bg-[#1e293b] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-emerald-500/30">
        <h1 className="text-3xl font-bold text-center mb-2 text-emerald-400 tracking-tight">
          CHEMAI 🧪
        </h1>
        <p className="text-slate-400 text-center text-sm mb-8 italic">
          Simulador de Reacciones UIS - Ing. Química
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-2 ml-1">
              Reactivo A
            </label>
            <input
              type="text"
              placeholder="Ej: CH4"
              value={reactivoA}
              onChange={(e) => setReactivoA(e.target.value)}
              className="w-full p-4 rounded-xl bg-[#0f172a] border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-2 ml-1">
              Reactivo B
            </label>
            <input
              type="text"
              placeholder="Ej: O2"
              value={reactivoB}
              onChange={(e) => setReactivoB(e.target.value)}
              className="w-full p-4 rounded-xl bg-[#0f172a] border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-600"
            />
          </div>

          <button
            onClick={ejecutarReaccion}
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all duration-300 ${
              loading 
                ? "bg-slate-700 text-slate-400 cursor-not-allowed" 
                : "bg-emerald-500 hover:bg-emerald-400 text-[#0f172a] shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-[#0f172a]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analizando...
              </span>
            ) : "Ejecutar Reacción"}
          </button>
        </div>

        {resultado && (
          <div className="mt-8 p-5 rounded-xl bg-[#0f172a]/50 border border-emerald-500/20 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-emerald-500 font-bold text-xs mb-3 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Resultado del Análisis:
            </h2>
            <p className="text-slate-200 leading-relaxed text-sm whitespace-pre-wrap">
              {resultado}
            </p>
          </div>
        )}
      </div>
      
      <footer className="mt-8 text-slate-500 text-[10px] uppercase tracking-[0.2em]">
        Universidad Industrial de Santander | 2026
      </footer>
    </main>
  );
}