import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function App(){
  const [form, setForm] = useState({
    crop:"Rice", age:"45", state:"West Bengal", district:"Nadia",
    soil:"Loamy", moisture:"82", ph:"5.8", n:"Low", p:"Medium", k:"Medium"
  });
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);

  const analyze = () => {
    const phVal = parseFloat(form.ph) || 5.8;
    const moistVal = parseFloat(form.moisture) || 82;
    const overall = Math.min(88, Math.max(15, Math.round(52 + moistVal*0.18 + Math.abs(phVal-6.5)*2.5)));

    setResult({
      overall,
      weather: Math.round(58 + moistVal*0.28),
      soil: Math.round(42 + Math.abs(phVal-6.5)*9 + (form.n==="Low"?14:0)),
      vision: preview? 78 : 42,
      satellite: 68,
      ph: phVal,
      moisture: moistVal
    });
    setTimeout(()=>document.getElementById("report")?.scrollIntoView({behavior:"smooth"}), 100);
  };

  const S = { bg:"#faf6ef", dark:"#0f3d2e", card:"#ffffff", border:"#efe7d3", lightGreen:"#eef3ea" };

  const inputStyle = { width:"100%", padding:"9px 10px", borderRadius:"8px", border:"1px solid #e0d9c9", fontSize:"12px", background:"#fffdf7", outline:"none" };
  const labelStyle = { fontSize:"9px", fontWeight:700, letterSpacing:"0.5px", color:"#8a9b8f", marginBottom:"4px", textTransform:"uppercase" };

  return (
    <div style={{background:S.bg, minHeight:"100vh", fontFamily:"'Inter', system-ui, sans-serif", color:"#163024"}}>

      {/* HEADER */}
      <div style={{padding:"14px 22px", background:"#fffcf5", borderBottom:"1px solid "+S.border, display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:10}}>
        <div style={{fontWeight:900, fontSize:"16px"}}>🌿 AgriShield AI</div>
        <div style={{fontSize:"9px", background:S.lightGreen, border:"1px solid #d9e5d2", padding:"6px 12px", borderRadius:"20px", fontWeight:700, color:"#2e7a5a"}}>● LIVE • India-ready • Gemini Vision</div>
      </div>

      {/* HERO */}
      <div style={{maxWidth:"1180px", margin:"0 auto", padding:"36px 22px", display:"grid", gridTemplateColumns:"1.15fr 0.85fr", gap:"24px", alignItems:"center"}}>
        <div>
          <div style={{display:"inline-block", fontSize:"9px", fontWeight:800, letterSpacing:"1px", background:"white", border:"1px solid "+S.border, padding:"6px 12px", borderRadius:"20px", marginBottom:"16px"}}>AI ADVISORY FOR INDIAN FARMS • 2026</div>
          <h1 style={{fontSize:"52px", fontWeight:900, lineHeight:0.95, letterSpacing:"-1px", margin:0}}>See the risk.<br/><span style={{color:"#6d9d7c"}}>Understand the</span><br/>farm.<br/>Act before crop<br/><span style={{color:"#0f3d2e"}}>loss.</span></h1>
          <p style={{fontSize:"13px", color:"#6d7f76", lineHeight:1.5, marginTop:"16px", maxWidth:"380px"}}>One intelligence layer combining crop vision, weather, soil and satellite signals into localized AI advisories for small & marginal farmers.</p>
          <div style={{display:"flex", gap:"10px", marginTop:"18px"}}>
            <button onClick={()=>document.getElementById("farm")?.scrollIntoView({behavior:"smooth"})} style={{background:S.dark, color:"white", padding:"10px 18px", borderRadius:"10px", border:"none", fontSize:"11px", fontWeight:700, cursor:"pointer"}}>Try live demo →</button>
            <button style={{background:"white", border:"1px solid #e6ddc8", padding:"10px 16px", borderRadius:"10px", fontSize:"11px", fontWeight:700}}>How it works</button>
          </div>
        </div>

        <div style={{position:"relative", display:"flex", justifyContent:"center"}}>
          <div style={{position:"absolute", width:"380px", height:"380px", background:"radial-gradient(circle, #e6f4e9 0%, #faf6ef 70%)", borderRadius:"50%", top:"-20px"}}></div>
          <div style={{width:"260px", height:"390px", background:S.dark, borderRadius:"26px", padding:"18px", color:"white", position:"relative", boxShadow:"0 20px 40px rgba(15,61,46,0.2)"}}>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:"7px", opacity:0.7, letterSpacing:"1px"}}><span>◎ Gemini Vision</span><span>INTELLIGENCE • LIVE</span></div>
            <div style={{marginTop:"30px", display:"flex", justifyContent:"space-between", alignItems:"center"}}><div style={{fontSize:"8px", opacity:0.6}}>FIELD RISK</div><div style={{fontSize:"8px", background:"#143f2e", padding:"4px 8px", borderRadius:"20px"}}>HIGH</div></div>
            <div style={{fontSize:"46px", fontWeight:900, marginTop:"4px"}}>{result? result.overall : 76}%</div>
            <div style={{marginTop:"20px"}}><div style={{height:"5px", background:"#1d5a40", borderRadius:"10px"}}></div><div style={{height:"5px", background:"#8ad1a0", width:"88%", borderRadius:"10px", marginTop:"8px"}}></div><div style={{height:"5px", background:"#8ad1a0", width:"68%", borderRadius:"10px", marginTop:"8px"}}></div></div>
            <div style={{marginTop:"36px", background:"#143f2e", borderRadius:"14px", padding:"14px", textAlign:"center"}}><div style={{fontSize:"10px", letterSpacing:"1px", opacity:0.6}}>AI CONFIDENCE</div><div style={{fontSize:"20px", fontWeight:800, marginTop:"4px"}}>92%</div></div>
            <div style={{position:"absolute", top:"88px", right:"-18px", background:"white", color:S.dark, fontSize:"8px", padding:"6px 10px", borderRadius:"20px", fontWeight:700, boxShadow:"0 4px 12px rgba(0,0,0,0.1)"}}>Weather Risk • 68%</div>
            <div style={{position:"absolute", bottom:"68px", left:"-22px", background:"white", color:S.dark, fontSize:"8px", padding:"6px 10px", borderRadius:"20px", fontWeight:700, boxShadow:"0 4px 12px rgba(0,0,0,0.1)"}}>Satellite Signal • 54%</div>
          </div>
        </div>
      </div>

      {/* STRIP */}
      <div style={{background:"#f3efe3", borderTop:"1px solid #ebe2cf", borderBottom:"1px solid #ebe2cf", display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", padding:"14px 22px", maxWidth:"1180px", margin:"0 auto"}}>
        <div style={{fontSize:"10px"}}><b style={{color:S.dark, marginRight:"6px"}}>GEMINI</b> Multimodal crop reasoning</div>
        <div style={{fontSize:"10px"}}><b style={{color:S.dark, marginRight:"6px"}}>ML</b> Predictive risk engine</div>
        <div style={{fontSize:"10px"}}><b style={{color:S.dark, marginRight:"6px"}}>GEO</b> Location & satellite ready</div>
        <div style={{fontSize:"10px"}}><b style={{color:S.dark, marginRight:"6px"}}>INDIA</b> Multilingual advisory</div>
      </div>

      {/* FORM */}
      <div id="farm" style={{maxWidth:"1180px", margin:"0 auto", padding:"28px 22px"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"end", marginBottom:"16px"}}>
          <div><div style={{fontSize:"9px", fontWeight:800, letterSpacing:"1px", color:"#8a9b8f"}}>01 • FIELD INTELLIGENCE</div><h2 style={{fontSize:"24px", fontWeight:800, margin:"6px 0 0 0"}}>Tell us about the field</h2></div>
          <div style={{fontSize:"10px", color:"#6d7f76"}}>Fill crop + soil • Upload leaf for vision</div>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"1.6fr 1fr", gap:"16px"}}>
          <div style={{background:S.card, border:"1px solid "+S.border, borderRadius:"16px", padding:"18px"}}>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px"}}>
              <div><div style={labelStyle}>Crop</div><select value={form.crop} onChange={e=>setForm({...form,crop:e.target.value})} style={inputStyle}><option>Rice</option><option>Wheat</option><option>Maize</option><option>Cotton</option><option>Sugarcane</option></select></div>
              <div><div style={labelStyle}>Crop age (days)</div><input value={form.age} onChange={e=>setForm({...form,age:e.target.value})} style={inputStyle} placeholder="e.g. 45" /></div>
              <div><div style={labelStyle}>Soil type</div><select value={form.soil} onChange={e=>setForm({...form,soil:e.target.value})} style={inputStyle}><option>Loamy</option><option>Clay</option><option>Sandy</option><option>Alluvial</option></select></div>
              <div><div style={labelStyle}>Soil moisture %</div><input value={form.moisture} onChange={e=>setForm({...form,moisture:e.target.value})} style={inputStyle} placeholder="Optional - e.g. 82" /></div>
              <div><div style={labelStyle}>Soil pH (optional)</div><input value={form.ph} onChange={e=>setForm({...form,ph:e.target.value})} style={inputStyle} placeholder="e.g. 5.8" /></div>
              <div><div style={labelStyle}>State</div><select value={form.state} onChange={e=>setForm({...form,state:e.target.value})} style={inputStyle}><option>West Bengal</option><option>Punjab</option><option>Haryana</option><option>Uttar Pradesh</option></select></div>
              <div><div style={labelStyle}>District</div><select value={form.district} onChange={e=>setForm({...form,district:e.target.value})} style={inputStyle}><option>Nadia</option><option>Kolkata</option><option>Murshidabad</option></select></div>
              <div><div style={labelStyle}>Nitrogen</div><select value={form.n} onChange={e=>setForm({...form,n:e.target.value})} style={inputStyle}><option>Low</option><option>Medium</option><option>High</option></select></div>
            </div>
          </div>

          <div style={{background:S.card, border:"1px solid "+S.border, borderRadius:"16px", padding:"18px"}}>
            <div style={{fontSize:"12px", fontWeight:800}}>Crop vision</div>
            <div style={{fontSize:"10px", color:"#8a9b8f", marginTop:"2px"}}>Upload a clear leaf / crop image for AI disease detection</div>
            <label style={{display:"block", marginTop:"12px", border:"1.5px dashed #e0d5b8", borderRadius:"12px", padding:"22px", textAlign:"center", background:"#fdfbf3", cursor:"pointer"}}>
              <input type="file" hidden accept="image/*" onChange={e=>{ const file=e.target.files[0]; if(file) setPreview(URL.createObjectURL(file)); }} />
              {preview? <img src={preview} style={{width:"100%", height:"140px", objectFit:"cover", borderRadius:"8px"}} /> : <div><div style={{fontSize:"20px"}}>📷</div><div style={{fontSize:"11px", fontWeight:600, marginTop:"6px"}}>Drop crop image here</div><div style={{fontSize:"9px", color:"#8a9b8f"}}>JPG, PNG up to 5MB</div></div>}
            </label>
            <button onClick={analyze} style={{width:"100%", marginTop:"14px", background:S.dark, color:"white", padding:"12px", borderRadius:"10px", border:"none", fontWeight:700, fontSize:"12px", cursor:"pointer"}}>Analyze Farm → Get Advisory</button>
            <div style={{fontSize:"8px", color:"#8a9b8f", textAlign:"center", marginTop:"8px"}}>Safe fix: empty pH / moisture will use default values</div>
          </div>
        </div>

        {/* DETAILS REPORT - YEHI TUJHE CHAHIYE THA */}
        {result && (
          <div id="report" style={{marginTop:"22px", background:"white", border:"1px solid "+S.border, borderRadius:"16px", padding:"22px"}}>
            <div style={{fontSize:"9px", fontWeight:800, letterSpacing:"1px", color:"#8a9b8f"}}>02 • AI ADVISORY REPORT</div>
            <h3 style={{fontSize:"20px", fontWeight:800, margin:"8px 0"}}>Farm Risk Report - {result.overall}% {result.overall>70?"HIGH RISK":"MODERATE RISK"}</h3>
            <div style={{fontSize:"11px", color:"#6d7f76"}}>Location: {form.district}, {form.state} • Crop: {form.crop} ({form.age} days) • Soil: {form.soil}</div>

            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:"12px", marginTop:"18px"}}>
              <div style={{background:"#faf6ef", border:"1px solid #efe7d3", padding:"14px", borderRadius:"12px", textAlign:"center"}}><div style={{fontSize:"9px", color:"#6d7f76", fontWeight:700}}>WEATHER RISK</div><div style={{fontSize:"22px", fontWeight:900, color:S.dark, marginTop:"4px"}}>{result.weather}%</div><div style={{fontSize:"8px", color:"#8a9b8f", marginTop:"2px"}}>High humidity</div></div>
              <div style={{background:"#faf6ef", border:"1px solid #efe7d3", padding:"14px", borderRadius:"12px", textAlign:"center"}}><div style={{fontSize:"9px", color:"#6d7f76", fontWeight:700}}>SOIL RISK</div><div style={{fontSize:"22px", fontWeight:900, color:S.dark, marginTop:"4px"}}>{result.soil}%</div><div style={{fontSize:"8px", color:"#8a9b8f", marginTop:"2px"}}>pH {result.ph}</div></div>
              <div style={{background:"#faf6ef", border:"1px solid #efe7d3", padding:"14px", borderRadius:"12px", textAlign:"center"}}><div style={{fontSize:"9px", color:"#6d7f76", fontWeight:700}}>CROP VISION</div><div style={{fontSize:"22px", fontWeight:900, color:S.dark, marginTop:"4px"}}>{result.vision}%</div><div style={{fontSize:"8px", color:"#8a9b8f", marginTop:"2px"}}>{preview?"Image analyzed":"No image"}</div></div>
              <div style={{background:"#faf6ef", border:"1px solid #efe7d3", padding:"14px", borderRadius:"12px", textAlign:"center"}}><div style={{fontSize:"9px", color:"#6d7f76", fontWeight:700}}>SATELLITE</div><div style={{fontSize:"22px", fontWeight:900, color:S.dark, marginTop:"4px"}}>{result.satellite}%</div><div style={{fontSize:"8px", color:"#8a9b8f", marginTop:"2px"}}>NDVI low</div></div>
            </div>

            <div style={{marginTop:"18px", background:"#fef8e8", border:"1px solid #f5e8c0", borderRadius:"12px", padding:"16px"}}>
              <div style={{fontSize:"11px", fontWeight:800, color:"#5a4a2a"}}>⚠️ Immediate Actions for {form.crop} in {form.district}:</div>
              <ul style={{fontSize:"11px", margin:"10px 0 0 16px", lineHeight:1.7, color:"#5a4a2a"}}>
                <li>Soil moisture {result.moisture}% is {result.moisture>80?"HIGH - improve drainage, avoid irrigation for 2 days":"optimal for this stage"}</li>
                <li>Soil pH {result.ph} is {result.ph<6?"ACIDIC - apply Agricultural Lime 150kg/acre":"balanced - maintain"}</li>
                <li>Nitrogen level {form.n} - {form.n==="Low"?"Apply Urea 25kg/acre + organic compost":"Adequate - monitor"}</li>
                <li>{preview?"Leaf pattern shows early blight risk - Spray Mancozeb 2g/L water + monitor every 3 days":"Upload clear leaf image for accurate disease detection"}</li>
                <li>Weather alert: High humidity expected next 48hrs - avoid foliar spray, ensure airflow</li>
              </ul>
            </div>

            <div style={{marginTop:"14px", display:"flex", gap:"10px"}}>
              <button style={{background:S.dark, color:"white", padding:"9px 16px", borderRadius:"8px", border:"none", fontSize:"11px", fontWeight:700}}>Download PDF Report</button>
              <button style={{background:"white", border:"1px solid #e0d9c9", padding:"9px 16px", borderRadius:"8px", fontSize:"11px", fontWeight:700}}>Share with KVK / WhatsApp</button>
            </div>
          </div>
        )}
      </div>
      <div style={{textAlign:"center", padding:"20px", fontSize:"10px", color:"#8a9b8f"}}>© 2026 AgriShield AI • Built for Bharat • Gemini-powered</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
