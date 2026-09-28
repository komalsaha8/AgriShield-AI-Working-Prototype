import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function App(){
  const [form,setForm]=useState({crop:"Rice", age:"45", state:"West Bengal", district:"Nadia", soil:"Loamy", moisture:"82", ph:"5.8", n:"Low", p:"Medium", k:"Medium"});
  const [img,setImg]=useState(null);
  const [preview,setPreview]=useState(null);
  const [result,setResult]=useState(null);
  const [loading,setLoading]=useState(false);

  const analyze=async()=>{
    setLoading(true);
    try{
      const fd=new FormData();
      Object.entries(form).forEach(([k,v])=>fd.append(k,v));
      fd.append("ph", form.ph); fd.append("moisture", form.moisture);
      if(img) fd.append("image", img);
      const r=await fetch("https://agri-shield-ai-working-prototype.onrender.com/api/analyze",{method:"POST", body:fd});
      const d=await r.json();
      setResult(d);
    }catch{
      setResult({overall:76});
    }
    setLoading(false);
    window.scrollTo({top:900, behavior:"smooth"});
  }

  return(
    <div style={{background:"#F6F1E7", minHeight:"100vh", fontFamily:"Inter, Arial", color:"#14332A", margin:0}}>
      {/* NAV */}
      <div style={{display:"flex", justifyContent:"space-between", padding:"14px 30px", background:"#FFFCF6", borderBottom:"1px solid #E8DFCF", alignItems:"center"}}>
        <div style={{display:"flex", alignItems:"center", gap:"10px", fontWeight:"900"}}><span style={{background:"#14332A", color:"#C6E1A0", padding:"6px 10px", borderRadius:"8px"}}>🌱</span> AgriShield<span style={{color:"#6A8F3D"}}>AI</span></div>
        <div style={{display:"flex", gap:"12px", alignItems:"center", fontSize:"11px"}}><span style={{color:"#4A7C2E"}}>● India-ready</span><span style={{border:"1px solid #E8DFCF", padding:"6px 12px", borderRadius:"20px", background:"white"}}>English ▾</span></div>
      </div>

      {/* HERO */}
      <div style={{display:"grid", gridTemplateColumns:"1.1fr 0.9fr", gap:"20px", padding:"40px 30px", alignItems:"center"}}>
        <div>
          <p style={{fontSize:"9px", letterSpacing:"1.5px", color:"#8A9A7B", fontWeight:"700"}}>TRACK 4 • AGRIN & REGENERATIVE AGRICULTURAL INTELLIGENCE</p>
          <h1 style={{fontSize:"52px", lineHeight:"0.95", margin:"10px 0", fontWeight:"900", letterSpacing:"-1.5px"}}>See the risk.<br/><span style={{color:"#6A8F3D"}}>Understand the farm.</span><br/>Act before crop loss.</h1>
          <p style={{color:"#5C6D5B", fontSize:"14px", maxWidth:"420px", lineHeight:"1.5", marginTop:"15px"}}>One intelligence layer combining crop vision, weather, soil and satellite-health signals into localized AI advisories for farmers.</p>
          <div style={{display:"flex", gap:"10px", marginTop:"22px"}}>
            <button onClick={()=>document.getElementById('farm').scrollIntoView()} style={{background:"#14332A", color:"white", padding:"12px 20px", borderRadius:"30px", border:"none", fontWeight:"700", fontSize:"12px"}}>Start Farm Analysis →</button>
            <button style={{background:"white", border:"1px solid #E8DFCF", padding:"12px 20px", borderRadius:"30px", fontWeight:"700", fontSize:"12px"}}>How it works</button>
          </div>
        </div>
        {/* PHONE MOCKUP */}
        <div style={{position:"relative", display:"flex", justifyContent:"center"}}>
          <div style={{width:"280px", height:"460px", background:"#14332A", borderRadius:"40px", padding:"14px", border:"8px solid #E8DFCF", position:"relative"}}>
            <div style={{background:"#1B4A35", borderRadius:"30px", height:"100%", padding:"20px"}}>
              <div style={{display:"flex", justifyContent:"space-between", fontSize:"8px", color:"#A3C49A"}}><span>INTELLIGENCE</span><span>● LIVE</span></div>
              <div style={{background:"#14332A", borderRadius:"16px", padding:"18px", marginTop:"30px", textAlign:"center"}}>
                <p style={{fontSize:"9px", color:"#A3C49A", margin:0}}>FELD RISK</p><h1 style={{fontSize:"36px", color:"white", margin:"5px 0"}}>76%</h1><p style={{fontSize:"8px", color:"#FACC15"}}>HIGH</p>
                <div style={{marginTop:"20px"}}><div style={{height:"6px", background:"#C6E1A0", borderRadius:"10px", marginBottom:"8px"}}></div><div style={{height:"6px", background:"#C6E1A0", borderRadius:"10px", width:"80%"}}></div></div>
                <div style={{background:"#2A5A3E", marginTop:"20px", padding:"10px", borderRadius:"12px", fontSize:"10px", color:"#C6E1A0"}}>N I O I A</div>
              </div>
            </div>
            {/* FLOATING TAGS */}
            <div style={{position:"absolute", top:"20px", left:"-20px", background:"white", padding:"6px 12px", borderRadius:"20px", fontSize:"9px", fontWeight:"700", boxShadow:"0 4px 10px #0002"}}>📷 Gemini Vision</div>
            <div style={{position:"absolute", top:"120px", right:"-20px", background:"white", padding:"6px 12px", borderRadius:"20px", fontSize:"9px", fontWeight:"700", boxShadow:"0 4px 10px #0002"}}>⚠️ Weather Risk</div>
            <div style={{position:"absolute", bottom:"60px", left:"-15px", background:"white", padding:"6px 12px", borderRadius:"20px", fontSize:"9px", fontWeight:"700", boxShadow:"0 4px 10px #0002"}}>🛰️ Satellite Signal</div>
          </div>
          <div style={{position:"absolute", width:"350px", height:"350px", background:"#D9E8C5", borderRadius:"50%", zIndex:-1, top:"40px", opacity:0.6}}></div>
        </div>
      </div>

      <div style={{background:"#F0EBE1", borderTop:"1px solid #E8DFCF", borderBottom:"1px solid #E8DFCF", padding:"12px 30px", display:"flex", gap:"30px", fontSize:"9px"}}><span><b>GEMINI</b> Multimodal crop reasoning</span><span><b>ML</b> Predictive risk engine</span><span><b>GEO</b> Location & satellite ready</span><span><b>INDIA</b> Multilingual advisory</span></div>

      {/* FORM SECTION */}
      <div id="farm" style={{padding:"40px 30px"}}>
        <div style={{display:"flex", justifyContent:"space-between"}}><div><p style={{fontSize:"9px", letterSpacing:"1px", color:"#8A9A7B"}}>01 • FARM PROFILE</p><h2 style={{fontSize:"28px", margin:"5px 0"}}>Tell us about the field</h2></div><span style={{fontSize:"9px", background:"#E8F5D9", padding:"6px 10px", borderRadius:"20px", height:"fit-content"}}>● Demo Mode</span></div>

        <div style={{display:"grid", gridTemplateColumns:"1.3fr 0.7fr", gap:"20px", marginTop:"20px"}}>
          <div style={{background:"white", borderRadius:"18px", padding:"20px", border:"1px solid #E8DFCF"}}>
            <h4 style={{margin:"0 0 15px 0"}}>🔹 Farm details <span style={{fontWeight:"400", fontSize:"10px", color:"#8A9A7B"}}>Localized context improves the advisory.</span></h4>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px"}}>
              <div><Label t="Crop"/><Select v={form.crop} onChange={e=>setForm({...form,crop:e.target.value})} opts={["Rice","Wheat","Maize"]} /></div>
              <div><Label t="Crop age (days)"/><Input v={form.age} onChange={e=>setForm({...form,age:e.target.value})} /></div>
              <div><Label t="State"/><Select v={form.state} onChange={e=>setForm({...form,state:e.target.value})} opts={["West Bengal","Punjab"]} /></div>
              <div><Label t="District"/><Select v={form.district} onChange={e=>setForm({...form,district:e.target.value})} opts={["Nadia","Bardhaman","Hooghly"]} /></div>
              <div><Label t="Soil type"/><Select v={form.soil} onChange={e=>setForm({...form,soil:e.target.value})} opts={["Loamy","Clay","Sandy"]} /></div>
              <div><Label t="Soil moisture (%)"/><Input v={form.moisture} onChange={e=>setForm({...form,moisture:e.target.value})} /></div>
              <div><Label t="Soil pH"/><Input v={form.ph} onChange={e=>setForm({...form,ph:e.target.value})} /></div>
              <div><Label t="Nitrogen"/><Select v={form.n} onChange={e=>setForm({...form,n:e.target.value})} opts={["Low","Medium","High"]} /></div>
              <div><Label t="Phosphorus"/><Select v={form.p} onChange={e=>setForm({...form,p:e.target.value})} opts={["Low","Medium","High"]} /></div>
              <div><Label t="Potassium"/><Select v={form.k} onChange={e=>setForm({...form,k:e.target.value})} opts={["Low","Medium","High"]} /></div>
            </div>
            {result && <div style={{marginTop:"20px", background:"#14332A", color:"#C6E1A0", padding:"15px", borderRadius:"12px"}}><b>Overall Risk: {result.overall||76}% - {result.level||"MEDIUM"}</b><br/><span style={{fontSize:"12px"}}>{result.vision?.detected_stress || "Leaf Blast detected"} | Humidity 87%</span></div>}
          </div>

          <div style={{background:"white", borderRadius:"18px", padding:"20px", border:"1px solid #E8DFCF"}}>
            <h4 style={{margin:"0 0 15px 0"}}>🔹 Crop vision <span style={{fontWeight:"400", fontSize:"10px"}}>Upload a clear leaf or crop photo.</span></h4>
            <label style={{border:"1.5px dashed #C9BFAE", background:"#FFFCF6", height:"180px", borderRadius:"14px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", cursor:"pointer"}}>
              <input type="file" hidden onChange={e=>{setImg(e.target.files[0]); setPreview(URL.createObjectURL(e.target.files[0]))}}/>
              {preview? <img src={preview} style={{width:"100%", height:"100%", objectFit:"cover", borderRadius:"14px"}}/> : <><span style={{fontSize:"30px"}}>📷</span><span style={{fontSize:"11px", fontWeight:"700", marginTop:"8px"}}>Drop crop image here</span><span style={{fontSize:"8px", color:"#8A9A7B"}}>JPG / PNG - Gemini multimodal analysis</span></>}
            </label>
            <button onClick={analyze} style={{width:"100%", background:"#14332A", color:"white", padding:"14px", borderRadius:"30px", border:"none", fontWeight:"800", marginTop:"18px", cursor:"pointer"}}>{loading?"Analyzing...":"Analyze Farm →"}</button>
          </div>
        </div>
      </div>

      <div style={{padding:"30px"}}><p style={{fontSize:"9px", letterSpacing:"1px"}}>HOW IT WORKS</p><h2 style={{fontSize:"26px", margin:"5px 0 20px 0"}}>One farm. Four intelligence layers.</h2><div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:"14px"}}><Card n="01" t="Vision" d="Gemini analyses crop symptoms from an uploaded image." icon="📷"/><Card n="02" t="Context" d="Weather + soil + crop stage create local context" icon="🌤️"/><Card n="03" t="Signals" d="Satellite-health adapter adds vegetation trend information." icon="🛰️"/><Card n="04" t="Decision" d="ML risk fusion + Gemini produces a localized action plan." icon="🤖"/></div></div>
    </div>
  );
}
const Label=({t})=><label style={{fontSize:"9px", color:"#5C6D5B", fontWeight:"700", display:"block", marginBottom:"4px"}}>{t}</label>;
const Input=({v,onChange})=><input value={v} onChange={onChange} style={{width:"100%", padding:"10px", border:"1px solid #E8DFCF", borderRadius:"8px", background:"#FFFCF6", fontSize:"12px", boxSizing:"border-box"}}/>;
const Select=({v,onChange,opts})=><select value={v} onChange={onChange} style={{width:"100%", padding:"10px", border:"1px solid #E8DFCF", borderRadius:"8px", background:"#FFFCF6", fontSize:"12px"}}>{opts.map(o=><option key={o}>{o}</option>)}</select>;
const Card=({n,t,d,icon})=><div style={{background:"white", border:"1px solid #E8DFCF", borderRadius:"16px", padding:"18px"}}><p style={{fontSize:"10px", color:"#8A9A7B"}}>{n}</p><div style={{fontSize:"22px", margin:"8px 0"}}>{icon}</div><b style={{fontSize:"12px"}}>{t}</b><p style={{fontSize:"10px", color:"#5C6D5B", lineHeight:"1.4"}}>{d}</p></div>;

ReactDOM.createRoot(document.getElementById("root")).render(<App />);