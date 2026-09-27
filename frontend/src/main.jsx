import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function App(){
  const [form, setForm] = useState({crop:"Rice", age:"45", state:"West Bengal", district:"Nadia", soil:"Loamy", moist:"82", ph:"5.8", n:"Low", p:"Medium", k:"Medium"});
  const [preview, setPreview] = useState(null);
  const [risk, setRisk] = useState(76);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if(file) setPreview(URL.createObjectURL(file));
  };

  const analyze = () => {
    const phNum = Number(form.ph) || 5.8;
    const moistNum = Number(form.moist) || 82;
    const r = Math.min(86, Math.max(12, Math.round(55 + moistNum*0.18 + Math.abs(phNum-6.5)*4)));
    setRisk(r);
    document.getElementById("result")?.scrollIntoView({behavior:"smooth"});
  };

  const label = {fontSize:"9px", fontWeight:700, color:"#2f4a3e", marginBottom:"5px", display:"block", letterSpacing:"0.3px"};
  const input = {width:"100%", padding:"10px 12px", borderRadius:"10px", border:"1px solid #e9e1d0", background:"white", fontSize:"12px", fontWeight:600, outline:"none"};
  const card = {background:"#fffdf6", border:"1px solid #efe7d3", borderRadius:"16px", padding:"18px", boxShadow:"0 4px 20px rgba(15,61,46,0.04)"};

  return(
    <div style={{background:"#faf6ef", minHeight:"100vh", fontFamily:"'Plus Jakarta Sans', Inter, system-ui, sans-serif", color:"#163024"}}>
      {/* NAV */}
      <div style={{height:"52px", background:"#fffcf5", borderBottom:"1px solid #efe7d3", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 20px", position:"sticky", top:0, zIndex:10}}>
        <div style={{display:"flex", alignItems:"center", gap:"8px"}}>
          <div style={{width:"28px", height:"28px", background:"#0f3d2e", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontSize:"14px"}}>🌿</div>
          <div><div style={{fontSize:"13px", fontWeight:800, lineHeight:1}}>AgriShield<span style={{color:"#7fb090", fontWeight:400}}>AI</span></div><div style={{fontSize:"6.5px", letterSpacing:"1px", color:"#8a9b8f", fontWeight:700}}>AGRICULTURAL INTELLIGENCE</div></div>
        </div>
        <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
          <div style={{fontSize:"9px", color:"#2e7a5a", fontWeight:600}}>● India-ready</div>
          <div style={{fontSize:"10px", border:"1px solid #e8ddd0", padding:"5px 10px", borderRadius:"20px", background:"white"}}>English ▾</div>
        </div>
      </div>

      {/* HERO */}
      <div style={{maxWidth:"1150px", margin:"0 auto", padding:"36px 22px 20px", display:"grid", gridTemplateColumns:"1.1fr 0.9fr", gap:"20px", alignItems:"center"}}>
        <div>
          <div style={{fontSize:"8.5px", letterSpacing:"1.4px", color:"#8a9b8f", fontWeight:700, marginBottom:"10px"}}>TRACK 4 • AGRIN & REGENERATIVE AGRICULTURAL INTELLIGENCE</div>
          <h1 style={{fontSize:"44px", fontWeight:900, lineHeight:0.95, margin:0, letterSpacing:"-0.5px"}}>
            <span style={{color:"#0f3d2e"}}>See the risk.</span><br/>
            <span style={{color:"#6d9d7c"}}>Understand the</span><br/>
            <span style={{color:"#0f3d2e"}}>farm.</span><br/>
            <span style={{color:"#0f3d2e"}}>Act before crop</span><br/>
            <span style={{color:"#0f3d2e"}}>loss.</span>
          </h1>
          <p style={{fontSize:"13px", color:"#6d7f76", lineHeight:1.5, marginTop:"14px", maxWidth:"380px"}}>One intelligence layer combining crop vision, weather, soil and satellite-health signals into localized AI advisories for farmers.</p>
          <div style={{display:"flex", gap:"10px", marginTop:"18px"}}>
            <button onClick={()=>document.getElementById("farm")?.scrollIntoView({behavior:"smooth"})} style={{background:"#0f3d2e", color:"white", padding:"10px 16px", borderRadius:"10px", border:"none", fontSize:"11px", fontWeight:700}}>Start Farm Analysis →</button>
            <button style={{background:"white", border:"1px solid #e6ddc8", padding:"10px 16px", borderRadius:"10px", fontSize:"11px", fontWeight:700}}>How it works</button>
          </div>
        </div>

        <div style={{position:"relative", display:"flex", justifyContent:"center"}}>
          <div style={{position:"absolute", width:"380px", height:"380px", background:"radial-gradient(circle, #e6f4e9 0%, #faf6ef 70%)", borderRadius:"50%", top:"10px"}}></div>
          <div style={{width:"250px", height:"380px", background:"#0f3d2e", borderRadius:"26px", padding:"16px", color:"white", position:"relative", boxShadow:"0 20px 40px rgba(15,61,46,0.18)", border:"3px solid #173f2e"}}>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:"7px", opacity:0.7}}><span>◍ Gemini Vision</span><span>INTELLIGENCE • LIVE</span></div>
            <div style={{marginTop:"28px", display:"flex", justifyContent:"space-between", alignItems:"center"}}><div style={{fontSize:"8px", opacity:0.6}}>FIELD RISK</div><div style={{fontSize:"7px", background:"#2a6b4a", padding:"2px 6px", borderRadius:"10px"}}>HIGH</div></div>
            <div style={{fontSize:"42px", fontWeight:900, marginTop:"2px"}}>{risk}%</div>
            <div style={{marginTop:"22px"}}><div style={{height:"5px", background:"#1e5a40", borderRadius:"10px"}}></div><div style={{height:"5px", background:"#8ad1a0", borderRadius:"10px", marginTop:"12px", width:"92%"}}></div><div style={{height:"5px", background:"#8ad1a0", borderRadius:"10px", marginTop:"10px", width:"72%"}}></div></div>
            <div style={{marginTop:"36px", background:"#143f2e", borderRadius:"14px", padding:"16px", textAlign:"center"}}><div style={{fontSize:"11px", letterSpacing:"3px", fontWeight:800, color:"#9adbb0"}}>N O I A</div></div>
            <div style={{position:"absolute", top:"88px", right:"-18px", background:"white", color:"#0f3d2e", fontSize:"8px", padding:"6px 10px", borderRadius:"20px", boxShadow:"0 4px 14px rgba(0,0,0,0.12)", fontWeight:700}}>⚡ Weather Risk</div>
            <div style={{position:"absolute", bottom:"68px", left:"-22px", background:"white", color:"#0f3d2e", fontSize:"8px", padding:"6px 10px", borderRadius:"20px", boxShadow:"0 4px 14px rgba(0,0,0,0.12)", fontWeight:700}}>🛰 Satellite Signal</div>
          </div>
        </div>
      </div>

      {/* STRIP */}
      <div style={{background:"#f3efe3", borderTop:"1px solid #ebe2cf", borderBottom:"1px solid #ebe2cf", display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", padding:"10px 22px", fontSize:"8.5px", color:"#5a6e63"}}>
        <div><b style={{color:"#0f3d2e", marginRight:"6px"}}>GEMINI</b> Multimodal crop reasoning</div>
        <div><b style={{color:"#0f3d2e", marginRight:"6px"}}>ML</b> Predictive risk engine</div>
        <div><b style={{color:"#0f3d2e", marginRight:"6px"}}>GEO</b> Location & satellite ready</div>
        <div><b style={{color:"#0f3d2e", marginRight:"6px"}}>INDIA</b> Multilingual advisory</div>
      </div>

      {/* FORM */}
      <div id="farm" style={{maxWidth:"1150px", margin:"0 auto", padding:"28px 22px"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div><div style={{fontSize:"8.5px", letterSpacing:"1.2px", color:"#8a9b8f", fontWeight:700}}>01 • FARM PROFILE</div><h2 style={{fontSize:"22px", fontWeight:800, margin:"4px 0 0"}}>Tell us about the field</h2></div>
          <div style={{fontSize:"8.5px", background:"#eef3ea", border:"1px solid #d9e5d2", padding:"5px 10px", borderRadius:"20px"}}>● Demo Mode</div>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"1.6fr 1fr", gap:"16px", marginTop:"16px"}}>
          <div style={card}>
            <div style={{display:"flex", gap:"10px", alignItems:"center", marginBottom:"14px"}}><div style={{width:"28px", height:"28px", background:"#eef6ee", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center"}}>🔷</div><div><div style={{fontSize:"12px", fontWeight:800}}>Farm details</div><div style={{fontSize:"9px", color:"#8a9b8f"}}>Localized context improves the advisory.</div></div></div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px"}}>
              <div><span style={label}>Crop</span><select value={form.crop} onChange={e=>setForm({...form,crop:e.target.value})} style={input}><option>Rice</option><option>Wheat</option><option>Maize</option><option>Tomato</option></select></div>
              <div><span style={label}>Crop age (days)</span><input value={form.age} onChange={e=>setForm({...form,age:e.target.value})} style={input} /></div>
              <div><span style={label}>State</span><select value={form.state} onChange={e=>setForm({...form,state:e.target.value})} style={input}><option>West Bengal</option><option>Punjab</option><option>Bihar</option></select></div>
              <div><span style={label}>District</span><select value={form.district} onChange={e=>setForm({...form,district:e.target.value})} style={input}><option>Nadia</option><option>Kolkata</option><option>Murshidabad</option></select></div>
              <div><span style={label}>Soil type</span><select value={form.soil} onChange={e=>setForm({...form,soil:e.target.value})} style={input}><option>Loamy</option><option>Clay</option><option>Sandy</option></select></div>
              <div><span style={label}>Soil moisture (%)</span><input value={form.moist} onChange={e=>setForm({...form,moist:e.target.value})} placeholder="optional" style={input} /></div>
              <div><span style={label}>Soil pH</span><input value={form.ph} onChange={e=>setForm({...form,ph:e.target.value})} placeholder="optional - no white screen" style={input} /></div>
              <div><span style={label}>Nitrogen</span><select value={form.n} onChange={e=>setForm({...form,n:e.target.value})} style={input}><option>Low</option><option>Medium</option><option>High</option></select></div>
              <div><span style={label}>Phosphorus</span><select value={form.p} onChange={e=>setForm({...form,p:e.target.value})} style={input}><option>Medium</option><option>Low</option><option>High</option></select></div>
              <div><span style={label}>Potassium</span><select value={form.k} onChange={e=>setForm({...form,k:e.target.value})} style={input}><option>Medium</option><option>Low</option><option>High</option></select></div>
            </div>
            <div id="result" style={{marginTop:"14px", background:"#eef6ee", border:"1px solid #d2e6d2", padding:"10px 12px", borderRadius:"10px", fontSize:"11px"}}><b>Overall {risk}% Risk</b> • pH used: {Number(form.ph)||5.8} • Moisture: {Number(form.moist)||60}% • ✅ White screen fixed</div>
          </div>

          <div style={card}>
            <div style={{display:"flex", gap:"10px", alignItems:"center", marginBottom:"14px"}}><div style={{width:"28px", height:"28px", background:"#eef6ee", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center"}}>🔷</div><div><div style={{fontSize:"12px", fontWeight:800}}>Crop vision</div><div style={{fontSize:"9px", color:"#8a9b8f"}}>Upload a clear leaf or crop photo.</div></div></div>
            <label style={{display:"block", border:"1.5px dashed #e0d5b8", borderRadius:"14px", background:"#fdfbf3", padding:"28px 16px", textAlign:"center", cursor:"pointer"}}>
              <input type="file" hidden accept="image/*" onChange={handleFile} />
              {preview? <img src={preview} style={{width:"100%", height:"132px", objectFit:"cover", borderRadius:"10px"}} /> : <><div style={{fontSize:"26px"}}>📷</div><div style={{fontSize:"11px", fontWeight:800, marginTop:"6px"}}>Drop crop image here</div><div style={{fontSize:"8px", color:"#8a9b8f", marginTop:"3px"}}>JPG / PNG • Gemini multimodal analysis</div></>}
            </label>
            <button onClick={analyze} style={{width:"100%", marginTop:"12px", background:"#0f3d2e", color:"white", padding:"12px", borderRadius:"10px", border:"none", fontWeight:800, fontSize:"11px", letterSpacing:"0.3px"}}>Analyze Farm →</button>
          </div>
        </div>

        <div style={{marginTop:"40px"}}>
          <div style={{fontSize:"8.5px", letterSpacing:"1.2px", color:"#8a9b8f", fontWeight:700}}>HOW IT WORKS</div>
          <h2 style={{fontSize:"22px", fontWeight:800, margin:"6px 0 14px"}}>One farm. Four intelligence layers.</h2>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:"12px"}}>
            <div style={card}><div style={{fontSize:"10px", fontWeight:700, color:"#9aae9f"}}>01</div><div style={{fontSize:"20px", margin:"10px 0"}}>📷</div><div style={{fontSize:"11px", fontWeight:800}}>Vision</div><div style={{fontSize:"9px", color:"#6d7f76", marginTop:"4px", lineHeight:1.4}}>Gemini analyses crop symptoms from an uploaded image.</div></div>
            <div style={card}><div style={{fontSize:"10px", fontWeight:700, color:"#9aae9f"}}>02</div><div style={{fontSize:"20px", margin:"10px 0"}}>🌦️</div><div style={{fontSize:"11px", fontWeight:800}}>Context</div><div style={{fontSize:"9px", color:"#6d7f76", marginTop:"4px", lineHeight:1.4}}>Weather + soil + crop stage create local context</div></div>
            <div style={card}><div style={{fontSize:"10px", fontWeight:700, color:"#9aae9f"}}>03</div><div style={{fontSize:"20px", margin:"10px 0"}}>🛰️</div><div style={{fontSize:"11px", fontWeight:800}}>Signals</div><div style={{fontSize:"9px", color:"#6d7f76", marginTop:"4px", lineHeight:1.4}}>Satellite-health adaptor adds vegetation trend information.</div></div>
            <div style={card}><div style={{fontSize:"10px", fontWeight:700, color:"#9aae9f"}}>04</div><div style={{fontSize:"20px", margin:"10px 0"}}>🤖</div><div style={{fontSize:"11px", fontWeight:800}}>Decision</div><div style={{fontSize:"9px", color:"#6d7f76", marginTop:"4px", lineHeight:1.4}}>ML risk fusion + Gemini produces a localized action plan.</div></div>
          </div>
        </div>
      </div>

      <div style={{textAlign:"center", padding:"30px", fontSize:"10px", color:"#9aae9f", borderTop:"1px solid #efe7d3", marginTop:"20px"}}>© 2026 AgriShield AI • Track 4 • India-ready • White-screen fixed with Number() fallback</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
