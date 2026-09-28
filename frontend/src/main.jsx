//force-rebuild-v2
import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

const API = import.meta.env.VITE_API_URL || "https://agrishield-ai-working-prototype.onrender.com";

const crops = ["Rice", "Wheat", "Maize", "Tomato", "Potato", "Cotton"];

const states = [
  "West Bengal",
  "Punjab",
  "Uttar Pradesh",
  "Maharashtra",
  "Bihar",
  "Karnataka",
];

const districts = {
  "West Bengal": ["Nadia", "Bardhaman", "Murshidabad", "Hooghly"],
  Punjab: ["Ludhiana", "Amritsar", "Patiala", "Bathinda"],
  "Uttar Pradesh": ["Lucknow", "Agra", "Kanpur Nagar", "Varanasi"],
  Maharashtra: ["Nashik", "Pune", "Nagpur", "Ahmednagar"],
  Bihar: ["Patna", "Muzaffarpur", "Gaya", "Bhagalpur"],
  Karnataka: ["Mysuru", "Belagavi", "Dharwad", "Mandya"],
};

const translations = {
  English: {
    analyze: "Analyze Farm",
    dashboard: "Intelligence Dashboard",
    risk: "Overall Crop Risk",
    action: "AI Action Plan",
    why: "Why this risk?",
    immediate: "Next 24 hours",
    days: "Next 3 days",
    regen: "Regenerative practices",
  },
  Hindi: {
    analyze: "खेत का विश्लेषण करें",
    dashboard: "कृषि इंटेलिजेंस डैशबोर्ड",
    risk: "कुल फसल जोखिम",
    action: "AI कार्य योजना",
    why: "जोखिम क्यों है?",
    immediate: "अगले 24 घंटे",
    days: "अगले 3 दिन",
    regen: "पुनर्योजी कृषि अभ्यास",
  },
  Bengali: {
    analyze: "খামার বিশ্লেষণ করুন",
    dashboard: "কৃষি ইন্টেলিজেন্স ড্যাশবোর্ড",
    risk: "মোট ফসল ঝুঁকি",
    action: "AI কর্মপরিকল্পনা",
    why: "ঝুঁকি কেন?",
    immediate: "পরবর্তী ২৪ ঘণ্টা",
    days: "পরবর্তী ৩ দিন",
    regen: "পুনর্জীবনশীল কৃষি",
  },
};

function riskClass(value) {
  if (value >= 70) return "high";
  if (value >= 40) return "medium";
  return "low";
}

function App() {
  const [form, setForm] = useState({
    crop: "Rice",
    age: 45,
    state: "West Bengal",
    district: "Nadia",
    soil: "Loamy",
    moisture: 82,
    ph: 5.8,
    nitrogen: "Low",
    phosphorus: "Medium",
    potassium: "Medium",
    image: null,
  });

  const [language, setLanguage] = useState("English");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const t = translations[language];

  const imageUrl = useMemo(() => {
    if (!form?.image) return "";
    return URL.createObjectURL(form.image);
  }, [form?.image]);

  const updateForm = (key, value) => {
    setForm((previous) => ({
     ...previous,
      [key]: value,
    }));
  };

  async function analyzeFarm() {
    setLoading(true);
    setError("");
    try {
      const phValue = Number(form?.ph?? 5.8);
      const moistureValue = Number(form?.moisture?? 82);
      const ageValue = Number(form?.age?? 30);

      if (isNaN(phValue) || phValue < 0 || phValue > 14) {
        throw new Error("Soil pH must be between 0 and 14.");
      }
      if (isNaN(moistureValue) || moistureValue < 0 || moistureValue > 100) {
        throw new Error("Soil moisture must be between 0 and 100%.");
      }
      if (ageValue < 0) {
        throw new Error("Crop age cannot be negative.");
      }

      const formData = new FormData();
      formData.append("crop", form?.crop || "Rice");
      formData.append("state", form?.state || "West Bengal");
      formData.append("district", form?.district || "Nadia");
      formData.append("age", ageValue);
      formData.append("soil", form?.soil || "Loamy");
      formData.append("ph", phValue);
      formData.append("moisture", moistureValue);
      formData.append("nitrogen", form?.nitrogen || "Low");
      formData.append("phosphorus", form?.phosphorus || "Medium");
      formData.append("potassium", form?.potassium || "Medium");
      formData.append("language", language);

      if (form?.image) {
        formData.append("crop_image", form.image);
      }

      const response = await fetch(`${API}/api/analyze`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Backend analysis failed.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to connect to AgriShield AI backend.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="nav">
        <div className="brand">
          <div className="mark">🌾</div>
          <div>
            <strong>AgriShield<span>AI</span></strong>
            <small>AGRICULTURAL INTELLIGENCE</small>
          </div>
        </div>
        <div className="navright">
          <span className="indiaBadge"><i></i>India-ready</span>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option>English</option>
            <option>Hindi</option>
            <option>Bengali</option>
          </select>
        </div>
      </header>

      <main>
        <section className="hero">
          <div>
            <div className="eyebrow">TRACK 4 · AGRIN & REGENERATIVE AGRICULTURAL INTELLIGENCE</div>
            <h1>See the risk.<br /><em>Understand the farm.</em><br />Act before crop loss.</h1>
            <p>One intelligence layer combining crop vision, weather, soil and satellite-health signals into localized AI advisories.</p>
            <div className="buttons">
              <button className="primary" onClick={() => document.getElementById("farm")?.scrollIntoView({ behavior: "smooth" })}>Start Farm Analysis →</button>
              <a href="#how">How it works</a>
            </div>
          </div>
          <div className="heroVisual">
            <div className="orbit"></div>
            <div className="phone">
              <small>AGRI INTELLIGENCE <b>● LIVE</b></small>
              <div className="phoneRisk">
                <span>FIELD RISK<strong>{result?.overall_risk?? 76}%</strong></span>
                <b>{result?.risk_level || "HIGH"}</b>
              </div>
              <div className="bars"><i></i><i></i><i></i></div>
              <div className="map">INDIA <b>●</b></div>
            </div>
            <label className="float a">📷 Gemini Vision</label>
            <label className="float b">🌦 Weather Risk</label>
            <label className="float c">🛰 Satellite Signal</label>
          </div>
        </section>

        <section className="strip">
          <div><b>GEMINI</b><span>Multimodal crop reasoning</span></div>
          <div><b>ML</b><span>Predictive risk engine</span></div>
          <div><b>GEO</b><span>Location & satellite ready</span></div>
          <div><b>INDIA</b><span>Multilingual advisory</span></div>
        </section>

        <section id="farm" className="section">
          <div className="heading">
            <div><div className="eyebrow">01 · FARM PROFILE</div><h2>Tell us about the field</h2></div>
            <span className="badge">● AI Analysis Ready</span>
          </div>
          <div className="grid2">
            <div className="panel">
              <Title icon="⌖" title="Farm details" sub="Localized context improves the advisory." />
              <div className="formgrid">
                <Field name="Crop">
                  <select value={form?.crop} onChange={(e) => updateForm("crop", e.target.value)}>
                    {crops.map((crop) => <option key={crop}>{crop}</option>)}
                  </select>
                </Field>
                <Field name="Crop age (days)">
                  <input type="number" min="0" value={form?.age} onChange={(e) => updateForm("age", e.target.value)} />
                </Field>
                <Field name="State">
                  <select value={form?.state} onChange={(e) => {
                    const selectedState = e.target.value;
                    updateForm("state", selectedState);
                    updateForm("district", districts[selectedState]?.[0] || "Nadia");
                  }}>
                    {states.map((state) => <option key={state}>{state}</option>)}
                  </select>
                </Field>
                <Field name="District">
                  <select value={form?.district} onChange={(e) => updateForm("district", e.target.value)}>
                    {(districts[form?.state] || []).map((district) => <option key={district}>{district}</option>)}
                  </select>
                </Field>
                <Field name="Soil type">
                  <select value={form?.soil} onChange={(e) => updateForm("soil", e.target.value)}>
                    <option>Loamy</option><option>Clay</option><option>Sandy</option><option>Alluvial</option>
                  </select>
                </Field>
                <Field name="Soil moisture (%)">
                  <input type="number" min="0" max="100" value={form?.moisture} onChange={(e) => updateForm("moisture", e.target.value)} />
                </Field>
                <Field name="Soil pH">
                  <input type="number" min="0" max="14" step="0.1" value={form?.ph?? ""} onChange={(e) => updateForm("ph", e.target.value)} />
                </Field>
                <Field name="Nitrogen">
                  <select value={form?.nitrogen} onChange={(e) => updateForm("nitrogen", e.target.value)}>
                    <option>Low</option><option>Medium</option><option>High</option>
                  </select>
                </Field>
                <Field name="Phosphorus">
                  <select value={form?.phosphorus} onChange={(e) => updateForm("phosphorus", e.target.value)}>
                    <option>Low</option><option>Medium</option><option>High</option>
                  </select>
                </Field>
                <Field name="Potassium">
                  <select value={form?.potassium} onChange={(e) => updateForm("potassium", e.target.value)}>
                    <option>Low</option><option>Medium</option><option>High</option>
                  </select>
                </Field>
              </div>
            </div>

            <div className="panel upload">
              <Title icon="◉" title="Crop vision" sub="Upload a clear leaf or crop photo." />
              <label className="drop">
                {imageUrl? <img src={imageUrl} alt="Selected crop" /> : <><strong>📷</strong><b>Drop crop image here</b><span>JPG / PNG · Gemini multimodal analysis</span></>}
                <input type="file" accept="image/*" onChange={(e) => updateForm("image", e.target.files?.[0] || null)} />
              </label>
              <button className="primary full" onClick={analyzeFarm} disabled={loading}>
                {loading? "Analyzing farm…" : `${t.analyze} →`}
              </button>
              {error && <div className="notice">{error}</div>}
            </div>
          </div>
        </section>

        {result && (
          <section className="section results">
            <div className="heading">
              <div><div className="eyebrow">02 · {t.dashboard}</div><h2>Farm intelligence report</h2></div>
              <span className={`risk ${riskClass(result.overall_risk)}`}>● {result.risk_level} RISK</span>
            </div>

            <div className="metrics">
              <div className="metric main">
                <span>{t.risk}</span>
                <strong>{result.overall_risk}<small>%</small></strong>
                <div className="meter"><i style={{ width: `${result.overall_risk}%` }}></i></div>
                <b>{result.risk_level}</b>
                <p>Fused from image, weather, soil and satellite-health signals.</p>
              </div>
              <Metric title="Gemini Vision" value={Math.round(Number(result.confidence || 0) * 100)} label={result.detected_stress || result.disease || "Healthy"} />
<Metric title="Weather Risk" value={result.weather_risk} label={`${result.weather?.temperature || 0}°C · ${result.weather?.humidity || 0}%`} />
<Metric title="Soil Risk" value={result.soil_risk} label={`pH ${result.soil?.ph || result.soil?.pH || form?.ph || "5.8"}`} />
<Metric title="Satellite Signal" value={result.satellite_risk} label={`${result.vegetation_index || "0.6"} NDVI · ${result.vegetation_trend || "stable"}`} />
            <div className="grid2 insight">
              <div className="panel">
                <Title icon="!" title={t.why} sub="Multiple signals are fused instead of relying on a single diagnosis." />
                <ul>{result.why?.map((item, index) => <li key={index}>✓ <span>{item}</span></li>)}</ul>
              </div>
              <div className="panel">
                <Title icon="◎" title="Live farm signals" sub="Context used by the risk engine." />
                <div className="signals">
                  <p>Temperature<b>{result.weather?.temperature}°C</b></p>
                  <p>Humidity<b>{result.weather?.humidity}%</b></p>
                  <p>Rain forecast<b>{result.weather?.rainfall} mm</b></p>
                  <p>Soil moisture<b>{result.soil?.moisture}%</b></p>
                  <p>Vegetation<b>{result.vegetation_trend}</b></p>
                </div>
              </div>
            </div>

            <div className="advisory">
              <div className="advHead">
                <div><div className="eyebrow">03 · GEMINI ADVISOR</div><h2>{t.action}</h2></div>
                <small>AI-assisted · Human verification recommended</small>
              </div>
              <div className="advice">
                <Advice title={t.immediate} items={result.immediate_actions} icon="⚡" />
                <Advice title={t.days} items={result.three_day_actions} icon="◷" />
                <Advice title={t.regen} items={result.regenerative_actions} icon="🌱" />
              </div>
            </div>

            <div className="sources panel">
              <div><div className="eyebrow">DATA SIGNALS</div><h3>Transparent by design</h3></div>
              <div>{result.sources?.map((source, index) => <span key={index}>✓ {source}</span>)}</div>
            </div>

            <div className="disclaimer">
              <strong>Decision-support notice:</strong> AgriShield AI provides AI-assisted agricultural risk indicators. It is not a definitive crop-disease diagnosis.
            </div>
          </section>
        )}

        <section id="how" className="section">
          <div className="heading"><div><div className="eyebrow">HOW IT WORKS</div><h2>One farm. Four intelligence layers.</h2></div></div>
          <div className="flow">
            {[
              ["01","📷","Vision","Gemini analyses crop symptoms from an uploaded image."],
              ["02","🌦","Context","Weather + soil + crop stage create local context."],
              ["03","🛰","Signals","Satellite-health adapter adds vegetation trend information."],
              ["04","🤖","Decision","ML risk fusion + AI produces a localized action plan."],
            ].map((item) => (
              <div className="flowcard" key={item[0]}>
                <small>{item[0]}</small><div>{item[1]}</div><h3>{item[2]}</h3><p>{item[3]}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="scale">
          <div><div className="eyebrow">BUILT FOR INDIA · DESIGNED TO SCALE</div><h2>From one field to a shared agricultural intelligence layer.</h2><p>State/district context, common farm-data schema, multilingual advisory and cloud deployment can extend across Indian states.</p></div>
          <div className="scalevisual"><span className="india">INDIA</span><span className="br br1">BR</span><span className="br br2">ZA</span><span className="br br3">CN</span><span className="br br4">IN</span></div>
        </section>
      </main>

      <footer>
        <div className="brand"><div className="mark">🌾</div><div><strong>AgriShield</strong><span>AI</span></div></div>
        <span>Track 4 · Agricultural Intelligence · Prototype</span>
        <span>2026</span>
      </footer>
    </div>
  );
}

function Title({ icon, title, sub }) {
  return (<div className="title"><i>{icon}</i><div><h3>{title}</h3><p>{sub}</p></div></div>);
}
function Field({ name, children }) {
  return (<label className="field"><span>{name}</span>{children}</label>);
}
function Metric({ title, value, label }) {
  const safeValue = Math.max(0, Math.min(100, Number(value || 0)));
  return (
    <div className="metric">
      <span>{title}</span>
      <strong>{Math.round(safeValue)}<small>%</small></strong>
      <div className="line"><i style={{ width: `${safeValue}%` }}></i></div>
      <p>{label}</p>
    </div>
  );
}
function Advice({ title, items = [], icon }) {
  return (
    <div className="advicecard">
      <h3>{icon} {title}</h3>
      <ul>{items.map((item, index) => <li key={index}>{item}</li>)}</ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);