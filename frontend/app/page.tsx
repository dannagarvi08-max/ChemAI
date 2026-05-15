"use client";
import { useState } from "react";

export default function ChemAI() {
  const [mol1, setMol1] = useState("");
  const [mol2, setMol2] = useState("");
  const [resultado, setResultado] = useState("");
  const [loading, setLoading] = useState(false);

  const analizarReaccion = async () => {
    setLoading(true);
    setResultado("");
    try {
      const res = await fetch(`http://127.0.0.1:8000/reaction?mol1=${mol1}&mol2=${mol2}`);
      const data = await res.json();
      setResultado(data.result);
    } catch (err) {
      setResultado("❌ Error de conexión. Revisa que el backend esté corriendo.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-6 flex flex-col items-center">
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-black text-emerald-400 drop-shadow-md">CHEMAI ⚗️</h1>
        <p className="text-slate-400 mt-2 italic">Simulador de Reacciones UIS - Ing. Química</p>
      </header>
      
      <div className="bg-[#1e293b] p-8 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-2xl">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-emerald-500 mb-2">Reactivo A</label>
            <input value={mol1} onChange={(e)=>setMol1(e.target.value)} className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 focus:border-emerald-500 outline-none transition-all" placeholder="Ej: CH4" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-emerald-500 mb-2">Reactivo B</label>
            <input value={mol2} onChange={(e)=>setMol2(e.target.value)} className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 focus:border-emerald-500 outline-none transition-all" placeholder="Ej: O2" />
          </div>
        </div>

        <button onClick={analizarReaccion} disabled={loading} className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black py-4 rounded-xl transition-all uppercase tracking-widest disabled:opacity-50">
          {loading ? "Procesando Mecanismo..." : "Ejecutar Reacción"}
        </button>

        {resultado && (
          <div className="mt-8 p-6 bg-slate-900 rounded-xl border-l-4 border-emerald-500">
            <h3 className="text-emerald-400 font-bold mb-4 uppercase text-sm tracking-widest">Informe de Laboratorio Virtual:</h3>
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-300">
              {resultado}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}