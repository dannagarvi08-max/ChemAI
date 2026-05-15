import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# PEGA TU LLAVE DE GROQ AQUÍ
GROQ_API_KEY = "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"
URL = "https://api.groq.com/openai/v1/chat/completions"

@app.get("/reaction")
async def get_reaction(mol1: str, mol2: str):
    prompt = f"""
    Actúa como un ingeniero químico experto. Analiza la reacción entre {mol1} y {mol2}.
    Responde con este formato exacto:
    PRODUCTO: (Ecuación balanceada)
    MECANISMO: (Paso a paso breve)
    ESTRUCTURA: (Carbonos, Hidrógenos y Grupo Funcional de cada una)
    USOS: (2 usos industriales)
    """
    
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "llama-3.3-70b-versatile",
        "messages": [{"role": "user", "content": prompt}]
    }
    
    try:
        response = requests.post(URL, headers=headers, json=payload)
        data = response.json()
        
        if "choices" in data:
            return {"result": data["choices"][0]["message"]["content"]}
        else:
            return {"result": f"Error de Groq: {data.get('error', {}).get('message', 'Error desconocido')}"}
            
    except Exception as e:
        return {"result": f"Error de conexión: {str(e)}"}