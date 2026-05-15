"use client";

import { useState } from "react";

export default function Home() {
  const [reactivoA, setReactivoA] = useState("");
  const [reactivoB, setReactivoB] = useState("");
  const [resultado, setResultado] = useState("");
  const [cargando, setCargando] = useState(false);

  const ejecutarReaccion = async () => {
    setCargando(true);
    try {
      const url = `https://chemai-i3ed.onrender.com/reaction?reactivoA=${encodeURIComponent(reactivoA)}&reactivoB=${encodeURIComponent(reactivoB)}`;
      const res = await fetch(url);
      const data = await res.json();
      setResultado(data.resultado);
    } catch (error) {
      setResultado("Error al conectar con el servidor químico.");
    }
    setCargando(false);
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-4">
      <div className="bg-[#1e293b] p-8 rounded-2xl shadow-xl w-full max-w-md border border-emerald-500/30">
        <h1 className="text-3xl font-bold text-center text-emerald-400 mb-2">CHEMAI 🧪</h1>
        <p className="text-center text-slate-400 text-sm mb-8">Simulador UIS - Ing. Química</p>
        
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Reactivo A (ej: CH4)" 
            className="w-full p-3 rounded bg-[#0f172a] border border-slate-700 outline-none focus:border-emerald-500"
            onChange={(e) => setReactivoA(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Reactivo B (ej: O2)" 
            className="w-full p-3 rounded bg-[#0f172a] border border-slate-700 outline-none focus:border-emerald-500"
            onChange={(e) => setReactivoB(e.target.value)}
          />
          <button 
            onClick={ejecutarReaccion}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-3 rounded transition-colors"
          >
            {cargando ? "Analizando..." : "Ejecutar Reacción"}
          </button>
        </div>

        {resultado && (
          <div className="mt-6 p-4 bg-slate-800 rounded border-l-4 border-emerald-500">
            <p className="text-sm text-slate-200 whitespace-pre-wrap">{resultado}</p>
          </div>
        )}
      </div>
      <footer className="mt-8 text-slate-500 text-xs">UIS | 2026</footer>
    </main>
  );
}