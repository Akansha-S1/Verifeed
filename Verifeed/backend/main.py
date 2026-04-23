from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from utils.risk_scoring import calculate_risk

import base64
import requests

app = FastAPI()


app.add_middleware(       # CORS (REQUIRED for Chrome Extension)
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class URLRequest(BaseModel):
    url: str

@app.post("/predict")
def predict(data: URLRequest):
    score, status = calculate_risk(data.url)

    return {
        "url": data.url,
        "score": score,
        "status": status
    }

class ImageRequest(BaseModel):
    image: str


@app.post("/predict_image")
def predict_image(data: ImageRequest):

    try:
        print("📡 Sending image to Sightengine API...")

      
        if "," in data.image:
            image_data = data.image.split(",")[1]
        else:
            image_data = data.image

        image_bytes = base64.b64decode(image_data)

      
        response = requests.post(
            "https://api.sightengine.com/1.0/check.json",
            data={
                'models': 'genai',
                'api_user': '1092970033',
                'api_secret': 'VawKcPiucdk5fVNZYrYhBAAT7yFkVsor'
            },
            files={
                'media': ('image.jpg', image_bytes)
            }
        )

        result = response.json()

        print("🔍 FULL API RESPONSE:", result)

        ai_score = 0

        # Try structured response
        if "type" in result:
            ai_score = (
                result["type"].get("deepfake", 0)
                or result["type"].get("ai_generated", 0)
            )

       
        if ai_score == 0:
            ai_score = result.get("deepfake", 0)

        print("🧠 Extracted AI score:", ai_score)

 
        if ai_score > 0.6:
            return {
                "label": "FAKE",
                "confidence": float(ai_score)
            }
        else:
            return {
                "label": "REAL",
                "confidence": float(ai_score)
            }

    except Exception as e:
        print("❌ API ERROR:", e)

        return {
            "label": "REAL",
            "confidence": 0.0
        }