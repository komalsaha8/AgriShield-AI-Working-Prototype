# AgriShield AI — Working Hackathon Prototype

A mobile-first agricultural intelligence prototype for **Build with AI: Code for Communities — 2nd Edition, Track 4: AgriN & Regenerative Agricultural Intelligence**.

## End-to-end flow
Farm profile → crop image → Gemini multimodal analysis → live weather → soil intelligence → predictive risk engine → satellite-health prototype adapter → localized regenerative advisory → English/Hindi/Bengali.

## Challenge technology mapping
- Generative AI: Google Gemini API
- Vision & multimodal: Gemini image understanding
- Predictive modelling: Python + scikit-learn Random Forest
- Language: Gemini-ready multilingual advisory
- Geospatial: state/district coordinates + weather; Earth Engine adapter ready
- Data/backend: FastAPI + Firebase-ready schema + Cloud Run-ready backend
- Public/realistic data: Open-Meteo live weather; synthetic ML training data clearly labelled
- India-first: state/district/crop profile and modular architecture

## Run frontend
Node.js 18+ recommended:

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL, normally http://localhost:5173.

The frontend works in **Demo Mode** without any API key, so you can practice the full judging flow immediately.

## Run backend for real Gemini analysis
Python 3.10+:

```bash
cd backend
python -m venv .venv
# Windows: .venv\\Scripts\\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
copy .env.example .env   # Windows
# or cp .env.example .env
```

Put your Gemini API key in `.env`:

```env
GEMINI_API_KEY=YOUR_KEY_HERE
GEMINI_MODEL=gemini-3.8-flash
```

Then:

```bash
uvicorn main:app --reload --port 8000
```

For the frontend to call it, create `frontend/.env`:

```env
VITE_API_URL=http://localhost:8000
```

Restart Vite after changing it.

## Important prototype honesty
The satellite card is a **prototype signal**, not a live Earth Engine measurement. `backend/earth_engine_adapter.py` is the connection seam for a real Google Earth Engine Sentinel-2/NDVI implementation.

The ML CSV is **synthetic/demo data**. Replace it with a properly licensed real dataset before making validation/performance claims.

## Gemini
The backend uses the official `google-genai` SDK and sends the uploaded image as multimodal input. Keep the API key in the backend only.

Official docs:
- https://ai.google.dev/gemini-api/docs/get-started
- https://ai.google.dev/gemini-api/docs/image-understanding

## Demo flow
1. Select Rice / West Bengal / Nadia.
2. Set crop age and soil values.
3. Upload a crop/leaf image.
4. Click Analyze Farm.
5. Show Gemini vision, weather, soil, ML risk and satellite-health cards.
6. Show the action plan.
7. Switch English → Hindi → Bengali.
8. Explain that Earth Engine, Firebase and Cloud Run are modular next integrations.

## Safety
This is decision support, not a definitive diagnosis. It does not prescribe pesticide doses. Local agricultural guidance should be used before field action.
