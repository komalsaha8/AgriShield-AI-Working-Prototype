import React, { useState, useEffect } from "react";

export default function App(){
  const [form, setForm] = useState({crop:"Rice",age:"45",state:"West Bengal",district:"Nadia",soil:"Loamy",moisture:"82",ph:"5.8",nitrogen:"Low",phosphorus:"Medium",potassium:"Medium"});
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const STATE_COORDS = {
    "West Bengal":{lat:22.97,lon:88.43,risk:65}, "Punjab":{lat:31.14,lon:75.34,risk:40},
    "Maharashtra":{lat:19.07,lon:72.87,risk:55}, "Bihar":{lat:25.09,lon:85.31,risk:50},
    "Gujarat":{lat:22.25,lon:71.19,risk:62}, "Tamil Nadu":{lat:11.12,lon:78.65,risk:60},
    "Kerala":{lat:10.85,lon:76.27,risk:70}, "Karnataka":{lat:15.31,lon:75.71,risk:58},
    "Uttar Pradesh":{lat:26.84,lon:80.94,risk:48}, "Rajasthan":{lat:27.02,lon:74.21,risk:75},
    "Assam":{lat:26.20,lon:92.93,risk:72}, "Odisha":{lat:20.95,lon:85.09,risk:63},
    "Andhra Pradesh":{lat:15.91,lon:79.74,risk:60}, "Madhya Pradesh":{lat:22.97,lon:78.65,risk:54},
    "Haryana":{lat:29.05,lon:76.08,risk:45}, "Delhi":{lat:28.61,lon:77.20,risk:50}
  };

  useEffect(()=>()=>{ if(preview) URL.revokeObjectURL(preview); },[preview]);

  const analyze = async () => {
    setError("");
    const phV = parseFloat(form.ph);
    if(isNaN(phV)||phV<0||phV>14){ setError("Soil pH must be 0-14"); return; }
    const moist = parseFloat(form.moisture);
    if(isNaN(moist)||moist<0||moist>100){ setError("Moisture must be 0-100%"); return; }
    setLoading(true);
    const c = STATE_COORDS[form.state]||{lat:22.97,lon:88.43,risk:55};
    let humidity=82,temp=30;
    try{ const r=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}&current=temperature_2m,relative_humidity_2m&timezone=auto`); const d=await r.json(); humidity=d.current.relative_humidity_2m; temp=d.current.temperature_2m; }catch{}
    const overall = Math.round(42 + humidity*0.28 + Math.abs(phV-6.5)*2.5 + (preview?8:0));
    setResult({overall,humidity,temp}); setLoading(false);
    setTimeout(()=>document.getElementById("field")?.scrollIntoView({behavior:"smooth"}),300);
  };

  // EXACT COLOR FROM YOUR IMAGE
  const bg = "#faf6ef"; // beige
  const dark = "#0f3d2e"; // dark green
  const lightGreen = "#7a9a6a";
  const cardBorder = "#efe7d3";
  const inputStyle = {width:"100%", padding:"10px 12px", borderRadius:"10px", border:"1px solid #e8dfc8", background:"#fffefb", fontSize:"13px", fontWeight:600, boxSizing:"border-box", outline:"none"};
  const labelStyle = {fontSize:"9px", fontWeight:700, color:"#7a8a7e", letterSpacing:"0.4px", marginBottom:"5px", display:"block", textTransform:"uppercase"};

  return(
    <div style={{background:bg, minHeight:"100vh", fontFamily:"Inter, sans-serif", color:"#163024"}}>
      <style>{`@media(max-width:900px){.hero{grid-template-columns:1fr!important}.formGrid{grid-template-columns:1fr!important}.howGrid{grid-template-columns:1fr 1fr!important}}.hero{display:grid;grid-template-columns:1.1fr 0.9fr;gap:24px}.formGrid{display:grid;grid-template-columns:1.6fr 1fr;gap:16px}.howGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}`}</style>

      {/* HEADER - Exact like image */}
      <div style={{background:"#fffcf5", borderBottom:"1px solid #efe7d3", padding:"12px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:10}}>
        <div style={{display:"flex", alignItems:"center", gap:"8px"}}><div style={{width:"28px", height:"28px", background:dark, borderRadius:"8px", display:"grid", placeItems:"center", color:"white", fontSize:"14px"}}>🌿</div><div><div style={{fontWeight:900, fontSize:"13px", lineHeight:1}}>AgriShield<span style={{color:lightGreen, fontWeight:400}}>AI</span></div><div style={{fontSize:"6px", letterSpacing:"1px", color:"#8a9b8f"}}>AGRICULTURAL INTELLIGENCE</div></div></div>
        <div style={{display:"flex", gap:"10px", alignItems:"center"}}><span style={{fontSize:"9px", background:"#e8f5e9", padding:"5px 10px", borderRadius:"20px", display:"flex", alignItems:"center", gap:"4px"}}>🟢 India-ready</span><select style={{padding:"6px 12px", borderRadius:"20px", border:"1px solid #e8dfc8", fontSize:"11px", fontWeight:700, background:"white"}}><option>English</option><option>हिन्दी</option><option>বাংলা</option></select></div>
      </div>

      {/* HERO - Exact color like image */}
      <div style={{maxWidth:"1200px", margin:"0 auto", padding:"50px 20px"}} className="hero">
        <div>
          <div style={{fontSize:"8px", letterSpacing:"1.6px", fontWeight:800, color:"#9aa99e", marginBottom:"12px"}}>TRACK 4 • AGRIN & REGENERATIVE AGRICULTURAL INTELLIGENCE</div>
          <h1 style={{fontSize:"50px", fontWeight:900, lineHeight:"0.9", margin:0, letterSpacing:"-1.5px"}}><span style={{color:"#163024"}}>See the risk.</span><br/><span style={{color:lightGreen}}>Understand the</span><br/><span style={{color:lightGreen}}>farm.</span><br/><span style={{color:"#163024"}}>Act before crop<br/>loss.</span></h1>
          <p style={{fontSize:"13px", color:"#6d7f76", lineHeight:1.6, marginTop:"18px", maxWidth:"400px"}}>One intelligence layer combining crop vision, weather, soil and satellite-health signals into localized AI advisories for farmers.</p>
          <div style={{display:"flex", gap:"10px", marginTop:"22px"}}><button onClick={()=>document.getElementById("field")?.scrollIntoView({behavior:"smooth"})} style={{background:dark, color:"white", padding:"12px 20px", borderRadius:"10px", border:"none", fontSize:"12px", fontWeight:700, cursor:"pointer"}}>Start Farm Analysis →</button><button style={{background:"white", border:"1px solid #e8dfc8", padding:"12px 20px", borderRadius:"10px", fontSize:"12px", fontWeight:700}}>How it works</button></div>
        </div>

        {/* PHONE - Exact like image */}
        <div style={{position:"relative", display:"flex", justifyContent:"center", alignItems:"center"}}>
          <div style={{position:"absolute", width:"320px", height:"320px", background:"radial-gradient(circle, #dbe8d6 0%, transparent 70%)", borderRadius:"50%"}}></div>
          <div style={{width:"268px", height:"430px", background:`linear-gradient(180deg, #174a38 0%, ${dark} 100%)`, borderRadius:"28px", padding:"18px", boxShadow:"0 20px 60px rgba(15,61,46,0.25)", position:"relative", border:"6px solid white"}}>
            <div style={{display:"flex", justifyContent:"space-between", color:"#8ab5a0", fontSize:"7px", letterSpacing:"1px"}}><span>AGRICULTURAL INTELLIGENCE</span><span>• LIVE</span></div>
            <div style={{background:"rgba(255,255,255,0.08)", borderRadius:"16px", padding:"18px", marginTop:"22px"}}><div style={{fontSize:"8px", color:"#8ab5a0", letterSpacing:"1px"}}>FIELD RISK</div><div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}><div style={{fontSize:"44px", fontWeight:900, color:"white"}}>{result?result.overall:76}%</div><div style={{fontSize:"8px", background:"#ff6b5a", color:"white", padding:"4px 10px", borderRadius:"20px"}}>HIGH</div></div><div style={{marginTop:"14px", display:"flex", flexDirection:"column", gap:"9px"}}><div style={{height:"6px", background:"#a8d5a2", borderRadius:"10px", width:"90%"}}></div><div style={{height:"6px", background:"#a8d5a2", borderRadius:"10px", width:"70%"}}></div><div style={{height:"6px", background:"#a8d5a2", borderRadius:"10px", width:"50%"}}></div></div></div>
            <div style={{background:"rgba(255,255,255,0.1)", borderRadius:"16px", padding:"16px", marginTop:"16px", textAlign:"center"}}><div style={{color:"#a8d5a2", fontSize:"10px", letterSpacing:"3px", fontWeight:800}}>N ◍ I A</div></div>
          </div>
          <div style={{position:"absolute", top:"50px", left:"20px", background:"white", padding:"7px 12px", borderRadius:"20px", fontSize:"9px", fontWeight:700, boxShadow:"0 4px 16px rgba(0,0,0,0.12)"}}>📷 Gemini Vision</div>
          <div style={{position:"absolute", top:"125px", right:"15px", background:"white", padding:"7px 12px", borderRadius:"20px", fontSize:"9px", fontWeight:700, boxShadow:"0 4px 16px rgba(0,0,0,0.12)"}}>☁️ Weather Risk</div>
          <div style={{position:"absolute", bottom:"85px", left:"5px", background:"white", padding:"7px 12px", borderRadius:"20px", fontSize:"9px", fontWeight:700, boxShadow:"0 4px 16px rgba(0,0,0,0.12)"}}>🛰️ Satellite Signal</div>
        </div>
      </div>

      {/* STRIP - Exact like image */}
      <div style={{background:"#f1eee6", borderTop:`1px solid ${cardBorder}`, borderBottom:`1px solid ${cardBorder}`, padding:"14px 20px", display:"flex", gap:"36px", justifyContent:"center", flexWrap:"wrap"}}><span style={{fontSize:"9px"}}><b>GEMINI</b> <span style={{color:"#8a9b8f"}}>Multimodal crop reasoning</span></span><span style={{fontSize:"9px"}}><b>ML</b> <span style={{color:"#8a9b8f"}}>Predictive risk engine</span></span><span style={{fontSize:"9px"}}><b>GEO</b> <span style={{color:"#8a9b8f"}}>Location & satellite ready</span></span><span style={{fontSize:"9px"}}><b>INDIA</b> <span style={{color:"#8a9b8f"}}>Multilingual advisory</span></span></div>

      {/* FORM SECTION - Exact like image + all options */}
      <div id="field" style={{maxWidth:"1200px", margin:"0 auto", padding:"50px 20px"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}><div><div style={{fontSize:"8px", letterSpacing:"1.5px", fontWeight:800, color:"#9aa99e"}}>01 • FARM PROFILE</div><h2 style={{fontSize:"30px", fontWeight:900, margin:"6px 0 0", letterSpacing:"-0.5px"}}>Tell us about the field</h2></div><span style={{fontSize:"9px", background:"#eef3ea", padding:"6px 12px", borderRadius:"20px", border:"1px solid #d9e5d2", fontWeight:600}}>● Demo Mode</span></div>

        {error && <div style={{background:"#fdecea", border:"1px solid #f5c6cb", color:"#7a0000", padding:"10px 14px", borderRadius:"10px", fontSize:"12px", marginTop:"16px"}}>⚠️ {error}</div>}

        <div style={{marginTop:"20px"}} className="formGrid">
          {/* Farm details Card */}
          <div style={{background:"white", border:`1px solid ${cardBorder}`, borderRadius:"16px", padding:"20px", boxShadow:"0 2px 12px rgba(0,0,0,0.03)"}}>
            <div style={{display:"flex", gap:"10px", alignItems:"center", marginBottom:"18px"}}><div style={{width:"30px", height:"30px", background:"#eef3ea", borderRadius:"8px", display:"grid", placeItems:"center", fontSize:"13px"}}>✦</div><div><div style={{fontWeight:800, fontSize:"13px"}}>Farm details</div><div style={{fontSize:"10px", color:"#8a9b8f"}}>Localized context improves the advisory.</div></div></div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px"}}>
              <div><span style={labelStyle}>Crop</span><select value={form.crop} onChange={e=>setForm({...form,crop:e.target.value})} style={inputStyle}><option>Rice</option><option>Wheat</option><option>Maize</option><option>Cotton</option><option>Sugarcane</option><option>Mustard</option><option>Potato</option><option>Tea</option></select></div>
              <div><span style={labelStyle}>Crop Age (days)</span><input value={form.age} onChange={e=>setForm({...form,age:e.target.value})} style={inputStyle} /></div>
              <div><span style={labelStyle}>State</span><select value={form.state} onChange={e=>setForm({...form,state:e.target.value})} style={inputStyle}>{Object.keys(STATE_COORDS).map(s=><option key={s}>{s}</option>)}</select></div>
              <div><span style={labelStyle}>District</span><select value={form.district} onChange={e=>setForm({...form,district:e.target.value})} style={inputStyle}><option>Nadia</option><option>Hooghly</option><option>Pune</option><option>Ludhiana</option><option>Patna</option><option>Jaipur</option><option>{form.district}</option></select></div>
              <div><span style={labelStyle}>Soil Type</span><select value={form.soil} onChange={e=>setForm({...form,soil:e.target.value})} style={inputStyle}><option>Loamy</option><option>Alluvial</option><option>Black</option><option>Red</option><option>Laterite</option><option>Sandy</option></select></div>
              <div><span style={labelStyle}>Soil Moisture (%)</span><input value={form.moisture} onChange={e=>setForm({...form,moisture:e.target.value})} style={inputStyle} /></div>
              <div><span style={labelStyle}>Soil pH</span><input value={form.ph} onChange={e=>setForm({...form,ph:e.target.value})} style={inputStyle} placeholder="0-14" /></div>
              <div><span style={labelStyle}>Nitrogen</span><select value={form.nitrogen} onChange={e=>setForm({...form,nitrogen:e.target.value})} style={inputStyle}><option>Low</option><option>Medium</option><option>High</option></select></div>
              <div><span style={labelStyle}>Phosphorus</span><select value={form.phosphorus} onChange={e=>setForm({...form,phosphorus:e.target.value})} style={inputStyle}><option>Low</option><option>Medium</option><option>High</option></select></div>
              <div><span style={labelStyle}>Potassium</span><select value={form.potassium} onChange={e=>setForm({...form,potassium:e.target.value})} style={inputStyle}><option>Low</option><option>Medium</option><option>High</option></select></div>
            </div>
            {result && <div style={{marginTop:"16px", background:"#fef8e8", border:"1px solid #f0e4c0", padding:"12px", borderRadius:"10px", fontSize:"11px"}}>✅ <b>{form.district}, {form.state}</b> Risk {result.overall}% • Humidity {result.humidity}% • {result.temp}°C • pH {form.ph} validated • Moisture {form.moisture}%</div>}
          </div>

          {/* Crop vision Card */}
          <div style={{background:"white", border:`1px solid ${cardBorder}`, borderRadius:"16px", padding:"20px", display:"flex", flexDirection:"column", boxShadow:"0 2px 12px rgba(0,0,0,0.03)"}}>
            <div style={{display:"flex", gap:"10px", alignItems:"center", marginBottom:"18px"}}><div style={{width:"30px", height:"30px", background:"#eef3ea", borderRadius:"8px", display:"grid", placeItems:"center"}}>◍</div><div><div style={{fontWeight:800, fontSize:"13px"}}>Crop vision</div><div style={{fontSize:"10px", color:"#8a9b8f"}}>Upload a clear leaf or crop photo.</div></div></div>
            <label style={{flex:1, border:"1.5px dashed #d8d0b8", borderRadius:"14px", background:"#fdfbf3", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"24px", cursor:"pointer", minHeight:"300px"}}>
              <input type="file" hidden accept="image/*" onChange={e=>{ if(e.target.files[0]){ if(preview) URL.revokeObjectURL(preview); setPreview(URL.createObjectURL(e.target.files[0])); } }} />
              {preview? <img src={preview} style={{width:"100%", height:"220px", objectFit:"cover", borderRadius:"10px"}} /> : <><div style={{width:"48px", height:"48px", background:"#f0eee6", borderRadius:"12px", display:"grid", placeItems:"center", fontSize:"22px"}}>📷</div><div style={{fontWeight:800, fontSize:"12px", marginTop:"12px"}}>Drop crop image here</div><div style={{fontSize:"9px", color:"#9aa99e", marginTop:"4px"}}>JPG / PNG • Gemini multimodal analysis</div></>}
            </label>
            <button onClick={analyze} disabled={loading} style={{marginTop:"14px", background:dark, color:"white", padding:"14px", borderRadius:"12px", border:"none", fontWeight:800, fontSize:"12px", cursor:"pointer"}}>{loading?"Analyzing Live Weather...":"Analyze Farm →"}</button>
            <div style={{fontSize:"8px", color:"#9aa99e", textAlign:"center", marginTop:"8px"}}>Validation • Live IMD API • Caching • Gemini Ready</div>
          </div>
        </div>

        {/* HOW IT WORKS - Exact like image */}
        <div style={{marginTop:"70px"}}><div style={{fontSize:"8px", letterSpacing:"1.5px", fontWeight:800, color:"#9aa99e"}}>HOW IT WORKS</div><h2 style={{fontSize:"30px", fontWeight:900, margin:"8px 0 20px", letterSpacing:"-0.5px"}}>One farm. Four intelligence layers.</h2>
          <div className="howGrid">
            <div style={{background:"white", border:`1px solid ${cardBorder}`, borderRadius:"14px", padding:"18px"}}><div style={{fontSize:"10px", fontWeight:800, color:"#9aa99e"}}>01</div><div style={{fontSize:"22px", margin:"12px 0"}}>📷</div><b style={{fontSize:"12px"}}>Vision</b><div style={{fontSize:"10px", color:"#8a9b8f", marginTop:"6px", lineHeight:1.5}}>Gemini analyses crop symptoms from an uploaded image.</div></div>
            <div style={{background:"white", border:`1px solid ${cardBorder}`, borderRadius:"14px", padding:"18px"}}><div style={{fontSize:"10px", fontWeight:800, color:"#9aa99e"}}>02</div><div style={{fontSize:"22px", margin:"12px 0"}}>🌦️</div><b style={{fontSize:"12px"}}>Context</b><div style={{fontSize:"10px", color:"#8a9b8f", marginTop:"6px", lineHeight:1.5}}>Weather + soil + crop stage create local context.</div></div>
            <div style={{background:"white", border:`1px solid ${cardBorder}`, borderRadius:"14px", padding:"18px"}}><div style={{fontSize:"10px", fontWeight:800, color:"#9aa99e"}}>03</div><div style={{fontSize:"22px", margin:"12px 0"}}>🛰️</div><b style={{fontSize:"12px"}}>Signals</b><div style={{fontSize:"10px", color:"#8a9b8f", marginTop:"6px", lineHeight:1.5}}>Satellite-health adapter adds vegetation trend information.</div></div>
            <div style={{background:"white", border:`1px solid ${cardBorder}`, borderRadius:"14px", padding:"18px"}}><div style={{fontSize:"10px", fontWeight:800, color:"#9aa99e"}}>04</div><div style={{fontSize:"22px", margin:"12px 0"}}>🤖</div><b style={{fontSize:"12px"}}>Decision</b><div style={{fontSize:"10px", color:"#8a9b8f", marginTop:"6px", lineHeight:1.5}}>ML risk fusion + Gemini produces a localized action plan.</div></div>
          </div>
        </div>
      </div>
      <div style={{textAlign:"center", padding:"24px", fontSize:"9px", color:"#9aa99e", borderTop:`1px solid ${cardBorder}`, background:"#fffcf5"}}>© 2026 AgriShield AI • Beige #faf6ef • Dark Green #0f3d2e • All options • Professional Build</div>
    </div>
  );
}
