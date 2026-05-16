"use client";

import { useState } from "react";

export default function Home() {
  const [reactivoA, setReactivoA] = useState("");
  const [reactivoB, setReactivoB] = useState("");
  const [resultado, setResultado] = useState("");
  const [cargando, setCargando] = useState(false);

  // Nombres de los autores actualizados
  const autores = [
    "Danna Valentina García Antolinez",
    "Manuel Santiago Viancha Bautista",
    "Brayan Alejandro Espinel Guayacán"
  ];

  const ejecutarReaccion = async () => {
    setCargando(true);
    try {
      const url = `https://chemai-i3ed.onrender.com/reaction?reactivoA=${encodeURIComponent(reactivoA)}&reactivoB=${encodeURIComponent(reactivoB)}`;
      const res = await fetch(url);
      const data = await res.json();
      setResultado(data.resultado);
    } catch (error) {
      setResultado("Error al conectar con el servidor químico. Intenta de nuevo.");
    }
    setCargando(false);
  };

  return (
    <main className="min-h-screen bg-[#0a0f1e] text-white flex flex-col items-center p-6">
      
      {/* SECCIÓN: CABECERA Y RESUMEN */}
      <div className="w-full max-w-3xl mb-10 text-center animate-fade-in">
        <h1 className="text-6xl font-black text-emerald-400 mb-4 tracking-tighter drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">
          CHEMAI 🧪
        </h1>
        <div className="bg-[#161d2f] border border-emerald-500/20 p-6 rounded-2xl shadow-2xl">
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            <strong>ChemAI</strong> es una plataforma de inteligencia artificial desarrollada por estudiantes de 
            <strong> Ingeniería Química de la Universidad Industrial de Santander</strong>. 
            Nuestra aplicación transforma simples fórmulas químicas en informes técnicos exhaustivos, 
            facilitando el estudio de mecanismos, estructuras moleculares y aplicaciones industriales 
            de manera instantánea y precisa.
          </p>
        </div>
      </div>

      {/* SECCIÓN: SIMULADOR (EL FORMULARIO) */}
      <div className="bg-[#161d2f] p-8 rounded-3xl shadow-2xl w-full max-w-md border border-emerald-500/10 mb-12">
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-emerald-500 uppercase tracking-[0.2em] mb-2">Reactivo A</label>
            <input 
              type="text" 
              value={reactivoA}
              onChange={(e) => setReactivoA(e.target.value)}
              className="w-full bg-[#0a0f1e] border border-slate-700 rounded-xl p-4 focus:outline-none focus:border-emerald-500 transition-all placeholder:text-slate-600"
              placeholder="Ej: CH4"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-emerald-500 uppercase tracking-[0.2em] mb-2">Reactivo B</label>
            <input 
              type="text" 
              value={reactivoB}
              onChange={(e) => setReactivoB(e.target.value)}
              className="w-full bg-[#0a0f1e] border border-slate-700 rounded-xl p-4 focus:outline-none focus:border-emerald-500 transition-all placeholder:text-slate-600"
              placeholder="Ej: O2"
            />
          </div>

          <button 
            onClick={ejecutarReaccion}
            disabled={cargando}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-[#0a0f1e] font-black py-4 rounded-xl transition-all transform active:scale-95 shadow-lg shadow-emerald-500/30 uppercase tracking-widest"
          >
            {cargando ? "PROCESANDO INFORME..." : "EJECUTAR ANÁLISIS"}
          </button>
        </div>

        {resultado && (
          <div className="mt-10 p-5 rounded-xl bg-[#0a0f1e] border-l-4 border-emerald-500 animate-slide-up">
            <h3 className="text-emerald-400 text-xs font-bold mb-3 uppercase tracking-tighter">Resultado del Análisis:</h3>
            <p className="text-slate-200 leading-relaxed whitespace-pre-wrap text-sm font-light">
              {resultado}
            </p>
          </div>
        )}
      </div>

      {/* SECCIÓN: CRÉDITOS Y AUTORES */}
      <footer className="mt-auto pt-10 w-full max-w-4xl border-t border-slate-800/50 flex flex-col items-center">
        <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6">Autores del Proyecto:</p>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {autores.map((autor, index) => (
            <span key={index} className="text-slate-300 text-[11px] font-semibold bg-slate-800/80 px-4 py-2 rounded-lg border border-slate-700/50 hover:border-emerald-500/40 transition-colors">
              {autor}
            </span>
          ))}
        </div>
        <div className="text-center">
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.4em]">
            Universidad Industrial de Santander
          </p>
          <p className="text-slate-600 text-[9px] mt-1 font-mono">
            ESCUELA DE INGENIERÍA QUÍMICA | 2026
          </p>
        </div>
      </footer>

    </main>
  );
}