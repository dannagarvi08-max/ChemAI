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
    prompt = f"Analiza la reacción química entre {reactivoA} y {reactivoB}. Ecuación balanceada y estequiometría corta."
    
    try:
        r = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={"Authorization": f"Bearer {key}"},
            json={"model": "mixtral-8x7b-32768", "messages": [{"role": "user", "content": prompt}]}
        )
        data = r.json()
        # Aquí validamos que 'choices' exista para evitar el error
        if "choices" in data:
            return {"resultado": data["choices"][0]["message"]["content"]}
        else:
            return {"resultado": f"Error de la IA: {data.get('error', {}).get('message', 'Llave inválida')}"}
    except Exception as e:
        return {"resultado": f"Error: {str(e)}"}