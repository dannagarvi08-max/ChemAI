from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os, requests
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/reaction")
def get_reaction(reactivoA: str, reactivoB: str):
    key = os.getenv("GROQ_API_KEY")
    
    # PROMPT REFORZADO: Aquí le obligamos a seguir el formato UIS
    prompt = (
        f"Eres un sistema experto en Ingeniería Química de la UIS. "
        f"Analiza la reacción entre {reactivoA} y {reactivoB}. "
        f"REGLA CRÍTICA: No des respuestas cortas. Debes generar un INFORME DE LABORATORIO VIRTUAL "
        f"con las siguientes secciones marcadas en negrita:\n\n"
        f"1. **INFORME DE LABORATORIO VIRTUAL**\n"
        f"2. **Análisis de la reacción entre {reactivoA} y {reactivoB}**\n"
        f"3. **PRODUCTO:** Muestra la ecuación química balanceada detallada.\n"
        f"4. **MECANISMO:** Explica paso a paso cómo se rompen y forman los enlaces.\n"
        f"5. **ESTRUCTURA:** Describe la geometría molecular y los tipos de enlaces de los reactivos y productos.\n"
        f"6. **USOS:** Explica al menos 2 aplicaciones industriales importantes de esta reacción.\n\n"
        f"Usa un tono técnico y profesional."
    )
    
    try:
        r = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={"Authorization": f"Bearer {key}"},
            json={
                "model": "llama-3.3-70b-versatile",
                "messages": [
                    {"role": "system", "content": "Eres un asistente que solo genera informes técnicos de laboratorio detallados para ingenieros químicos."},
                    {"role": "user", "content": prompt}
                ],
                "temperature": 0.7 # Añadimos temperatura para que sea más creativo y detallado
            }
        )
        data = r.json()
        
        if "choices" in data:
            return {"resultado": data["choices"][0]["message"]["content"]}
        else:
            return {"resultado": f"Error de la IA: {data.get('error', {}).get('message', 'Error desconocido')}"}
    except Exception as e:
        return {"resultado": f"Error del servidor: {str(e)}"}