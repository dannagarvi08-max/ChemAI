"use client";
import { useState } from "react";

export default function Home() {
  const [reactivoA, setReactivoA] = useState("");
  const [reactivoB, setReactivoB] = useState("");
  const [resultado, setResultado] = useState("");
  const [loading, setLoading] = useState(false);

  const ejecutar = async () => {
    setLoading(true);
    try {
      // URL de tu servidor en Render
      const url = `https://chemai-i3ed.onrender.com/reaction?reactivoA=${encodeURIComponent(reactivoA)}&reactivoB=${encodeURIComponent(reactivoB)}`;
      const res = await fetch(url);
      const data = await res.json();
      setResultado(data.resultado);
    } catch (e) {
      setResultado("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-4">
      <div className="bg-[#1e293b] p-8 rounded-2xl shadow-xl w-full max-w-md border border-emerald-500/30">
        <h1 className="text-3xl font-bold text-center text-emerald-400 mb-6">CHEMAI 🧪</h1>
        <div className="space-y-4">
          <input type="text" placeholder="Reactivo A" className="w-full p-3 rounded bg-[#0f172a] border border-slate-700" onChange={(e)=>setReactivoA(e.target.value)} />
          <input type="text" placeholder="Reactivo B" className="w-full p-3 rounded bg-[#0f172a] border border-slate-700" onChange={(e)=>setReactivoB(e.target.value)} />
          <button onClick={ejecutar} className="w-full bg-emerald-500 py-3 rounded font-bold text-slate-900 uppercase">
            {loading ? "Analizando..." : "Ejecutar Reacción"}
          </button>
        </div>
        {resultado && <div className="mt-6 p-4 bg-slate-800 rounded border-l-4 border-emerald-500 text-sm whitespace-pre-wrap">{resultado}</div>}
      </div>
      <footer className="mt-4 text-slate-500 text-xs">UIS | 2026</footer>
    </main>
  );
}