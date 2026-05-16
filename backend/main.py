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
    
    # Hemos mejorado el prompt para que sea un informe profesional de la UIS
    prompt = (
        f"Actúa como un sistema experto en Ingeniería Química de la UIS. "
        f"Analiza la reacción entre {reactivoA} y {reactivoB}. "
        f"Tu respuesta DEBE seguir este formato estricto:\n\n"
        f"INFORME DE LABORATORIO VIRTUAL:\n"
        f"**Análisis de la reacción entre {reactivoA} y {reactivoB}**\n\n"
        f"**PRODUCTO:** (Ecuación química balanceada)\n\n"
        f"**MECANISMO:** (Pasos de la reacción)\n\n"
        f"**ESTRUCTURA:** (Descripción de enlaces y moléculas)\n\n"
        f"**USOS:** (Aplicaciones industriales)"
    )
    
    try:
        r = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={"Authorization": f"Bearer {key}"},
            json={
                "model": "llama-3.3-70b-versatile", # Corregido: ya no está duplicado
                "messages": [{"role": "user", "content": prompt}]
            }
        )
        data = r.json()
        
        if "choices" in data:
            return {"resultado": data["choices"][0]["message"]["content"]}
        else:
            # Esto te dirá exactamente qué dice Groq si algo falla
            return {"resultado": f"Error de la IA: {data.get('error', {}).get('message', 'Llave o modelo inválido')}"}
    except Exception as e:
        return {"resultado": f"Error del servidor: {str(e)}"}