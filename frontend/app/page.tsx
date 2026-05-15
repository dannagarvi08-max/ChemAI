from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import requests
from dotenv import load_dotenv

# Cargamos las variables de entorno (como tu API Key)
load_dotenv()

app = FastAPI()

# --- CONFIGURACIÓN DE CORS (PERMISOS DE CONEXIÓN) ---
# Esto es lo que permite que tu página en Vercel hable con este servidor en Render
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite conexiones de cualquier origen
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos los encabezados
)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

@app.get("/")
def home():
    return {"mensaje": "Servidor Químico de ChemAI funcionando"}

@app.get("/reaction")
def get_reaction(reactivoA: str, reactivoB: str):
    if not GROQ_API_KEY:
        return {"resultado": "Error: No se configuró la API Key en Render."}

    # El "prompt" que le enviamos a la IA
    prompt = (
        f"Eres un experto en ingeniería química de la UIS. "
        f"Analiza la reacción química entre {reactivoA} y {reactivoB}. "
        f"Proporciona la ecuación balanceada, el tipo de reacción y una breve explicación estequiométrica."
    )

    try:
        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={"Authorization": f"Bearer {GROQ_API_KEY}"},
            json={
                "model": "mixtral-8x7b-32768",
                "messages": [{"role": "user", "content": prompt}]
            }
        )
        data = response.json()
        resultado_ia = data['choices'][0]['message']['content']
        return {"resultado": resultado_ia}
    except Exception as e:
        return {"resultado": f"Error al procesar con la IA: {str(e)}"}