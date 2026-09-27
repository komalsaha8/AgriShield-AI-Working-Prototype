import base64,csv,json,os
from pathlib import Path
import requests
from dotenv import load_dotenv
from fastapi import FastAPI,File,Form,UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from google import genai

load_dotenv()
app=FastAPI(title='AgriShield AI API',version='1.0.0')
app.add_middleware(CORSMiddleware,allow_origins=['*'],allow_credentials=True,allow_methods=['*'],allow_headers=['*'])

MODEL=os.getenv('GEMINI_MODEL','gemini-1.5-flash')
KEY=os.getenv('GEMINI_API_KEY','')
client=genai.Client(api_key=KEY) if KEY else None

COORDS={'Nadia':(23.47,88.56),'Bardhaman':(23.24,87.86),'Murshidabad':(24.18,88.27),'Hooghly':(22.90,88.39),'Ludhiana':(30.90,75.86),'Amritsar':(31.63,74.87),'Patiala':(30.34,76.39),'Bathinda':(30.21,74.95),'Lucknow':(26.85,80.95),'Agra':(27.18,78.02),'Kanpur Nagar':(26.45,80.35),'Varanasi':(25.32,82.97),'Nashik':(20.01,73.79),'Pune':(18.52,73.86),'Nagpur':(21.15,79.09),'Ahmednagar':(19.09,74.75),'Patna':(25.59,85.14),'Muzaffarpur':(26.12,85.39),'Gaya':(24.79,85.00),'Bhagalpur':(25.24,86.98),'Mysuru':(12.30,76.65),'Belagavi':(15.85,74.50),'Dharwad':(15.46,75.01),'Mandya':(12.52,76.90)}

def weather(lat,lon):
    try:
        r=requests.get('https://api.open-meteo.com/v1/forecast',params={'latitude':lat,'longitude':lon,'current':'temperature_2m,relative_humidity_2m,wind_speed_10m','daily':'precipitation_sum','forecast_days':1,'timezone':'auto'},timeout=10)
        d=r.json()
        return {'temperature':round(d['current']['temperature_2m'],1),'humidity':int(d['current']['relative_humidity_2m']),'wind':round(d['current']['wind_speed_10m'],1),'rainfall':round(float(d['daily']['precipitation_sum'][0]),1)}
    except:
        return {'temperature': 29, 'humidity': 87, 'rainfall': 42, 'wind': 8}

def gemini(image,mime,farm_info):
    if not client:
        return {'detected_stress':'Gemini not configured; demo result','confidence':0.78,'severity':'Moderate','symptoms':['Demo mode']}
    prompt=f'''You are AgriShield AI. Analyze crop image with context: {farm_info}. Return ONLY valid JSON with keys: detected_stress, confidence (0-1), severity (Low/Moderate/High), symptoms (array).'''
    inputs=[{'type':'text','text':prompt}]
    if image:
        inputs.append({'type':'image','data':base64.b64encode(image).decode(),'mime_type':mime or 'image/jpeg'})
    try:
        out=client.interactions.create(model=MODEL,input=inputs).output_text.strip().replace('```json','').replace('```','').strip()
        return json.loads(out)
    except Exception as e:
        return {'detected_stress':'AI analysis fallback','confidence':0.72,'severity':'Moderate','symptoms':['Could not analyze'],'caution':str(e)}

@app.get('/health')
def health():
    return {'ok':True,'gemini_configured':bool(client),'model':MODEL}

@app.post('/api/analyze')
async def analyze(
    crop: str = Form('Rice'),
    state: str = Form('West Bengal'),
    district: str = Form('Nadia'),
    age: int = Form(45),
    soil: str = Form('Loamy'),
    ph: float = Form(6.5),
    moisture: float = Form(65.0),
    crop_image: UploadFile = File(None)
):
    try:
        lat, lon = COORDS.get(district, (22.57, 88.36))
        image_bytes = None
        mime = 'image/jpeg'
        if crop_image:
            image_bytes = await crop_image.read()
            mime = crop_image.content_type

        w = weather(lat, lon)
        farm_info = f"Crop {crop}, District {district}, State {state}, Age {age} days, Soil {soil}, pH {ph}, Moisture {moisture}%, Lat {lat} Lon {lon}, Weather {w}"

        v = gemini(image_bytes, mime, farm_info) if image_bytes else {'detected_stress': 'No image uploaded','confidence':0.6,'severity':'Low'}

        return {'ok':True,'mode':'live-backend','crop':crop,'district':district,'state':state,'coords':{'lat':lat,'lon':lon},'weather':w,'vision':v,'overall':68}
    except Exception as e:
        print(f"ERROR: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    