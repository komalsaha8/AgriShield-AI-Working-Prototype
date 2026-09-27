import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function App(){
  const [f, setF] = useState({crop:'Rice', age:45, state:'West Bengal', dist:'Nadia', soil:'Loamy', moist:'82', ph:'5.8', n:'Low', p:'Medium', k:'Medium'});
  const [img, setImg] = useState(null);
  const [prev, setPrev] = useState(null);
  const [res, setRes] = useState(null);

  const onImg = e=>{
    const file=e.target.files[0]; if(!file) return;
    setImg(file); setPrev(URL.createObjectURL(file));
  };

  const analyze = ()=>{
    // WHITE SCREEN FIX - khali ho to default lega
    const phNum = Number(f.ph) || 5.8;
    const moistNum = Number(f.moist) || 60;
    const ageNum = Number(f.age) || 45;
    const overall = Math.round(62 + (moistNum*0.15) + Math.abs(phNum-6.5)*2);
    setRes({overall: Math.min(86, overall), phNum, moistNum, ageNum});
    window.scrollTo({top:900, behavior:'smooth'});
  };

  const s={bg:'#faf6ef', dark:'#0f3d2e', card:'#fffdf7', border:'#e8e0d1', light:'#f3efe6'};

  return(
    <div style={{background:s.bg, minHeight:'100vh', fontFamily:'Inter, sans-serif', color:'#0f2e22'}}>
      {/* NAV */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 28px', background:'#fffcf5', borderBottom:'1px solid #eee8d9'}}>
        <div style={{display:'flex', gap:'8px', alignItems:'center', fontWeight:800}}><span style={{background:'#0f3d2e', color:'white', padding:'6px 8px', borderRadius:'6px'}}>🌿</span> AgriShield<span style={{color:'#7aa68d', fontWeight:400}}>AI</span></div>
        <div style={{display:'flex', gap:'12px', fontSize:'11px', alignItems:'center'}}><span style={{color:'#2e7a5a'}}>● India-ready</span><span style={{border:'1px solid #ddd', padding:'4px 10px', borderRadius:'20px'}}>English ▾</span></div>
      </div>

      {/* HERO */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', padding:'40px 28px', maxWidth:'1150px', margin:'0 auto', alignItems:'center'}}>
        <div>
          <div style={{fontSize:'9px', letterSpacing:'1.5px', color:'#8a9b8f', fontWeight:700}}>TRACK 4 • AGRIN & REGENERATIVE AGRICULTURAL INTELLIGENCE</div>
          <h1 style={{fontSize:'44px', fontWeight:900, lineHeight:'0.95', margin:'12px 0'}}>See the risk.<br/><span style={{color:'#5a8a6a'}}>Understand the</span><br/>farm.<br/>Act before crop<br/>loss.</h1>
          <p style={{fontSize:'13px', color:'#6b7f75', lineHeight:'1.5', maxWidth:'380px'}}>One intelligence layer combining crop vision, weather, soil and satellite-health signals into localized AI advisories for farmers.</p>
          <div style={{display:'flex', gap:'10px', marginTop:'18px'}}>
            <button onClick={()=>document.getElementById('form').scrollIntoView()} style={{background:s.dark, color:'white', padding:'10px 18px', borderRadius:'8px', border:'none', fontWeight:600, fontSize:'12px'}}>Start Farm Analysis →</button>
            <button style={{background:'white', padding:'10px 18px', borderRadius:'8px', border:'1px solid #e0d9c9', fontWeight:600, fontSize:'12px'}}>How it works</button>
          </div>
        </div>
        <div style={{position:'relative', display:'flex', justifyContent:'center'}}>
          <div style={{width:'260px', height:'380px', background:'#0f3d2e', borderRadius:'28px', padding:'18px', color:'white', boxShadow:'0 20px 40px rgba(0,0,0,.15)', position:'relative'}}>
            <div style={{display:'flex', justifyContent:'space-between', fontSize:'8px', opacity:.7}}><span>■ Gemini Vision</span><span>INTELLIGENCE • LIVE</span></div>
            <div style={{marginTop:'24px', fontSize:'10px', opacity:.7}}>FIELD RISK</div>
            <div style={{fontSize:'38px', fontWeight:900}}>{res? res.overall : 76}%</div>
            <div style={{background:'#1a5a40', height:'6px', borderRadius:'10px', marginTop:'18px'}}></div>
            <div style={{background:'#7ac79a', height:'6px', borderRadius:'10px', marginTop:'8px', width:'85%'}}></div>
            <div style={{background:'#7ac79a', height:'6px', borderRadius:'10px', marginTop:'8px', width:'65%'}}></div>
            <div style={{background:'#173f2e', marginTop:'30px', padding:'16px', borderRadius:'14px', textAlign:'center', fontSize:'11px', letterSpacing:'2px', color:'#7ac79a'}}>N O I A</div>
            <div style={{position:'absolute', top:'70px', right:'-20px', background:'white', color:'#0f3d2e', padding:'6px 10px', borderRadius:'20px', fontSize:'9px', boxShadow:'0 4px 12px rgba(0,0,0,.1)'}}>⚡ Weather Risk</div>
            <div style={{position:'absolute', bottom:'60px', left:'-25px', background:'white', color:'#0f3d2e', padding:'6px 10px', borderRadius:'20px', fontSize:'9px', boxShadow:'0 4px 12px rgba(0,0,0,.1)'}}>🛰 Satellite Signal</div>
          </div>
        </div>
      </div>

      {/* STRIP */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', background:'#f1ece0', padding:'10px 28px', fontSize:'9px', borderTop:'1px solid #e6dfcf', borderBottom:'1px solid #e6dfcf'}}>
        <div><b>GEMINI</b> &nbsp; Multimodal crop reasoning</div><div><b>ML</b> &nbsp; Predictive risk engine</div><div><b>GEO</b> &nbsp; Location & satellite ready</div><div><b>INDIA</b> &nbsp; Multilingual advisory</div>
      </div>

      {/* FORM */}
      <div id="form" style={{padding:'32px 28px', maxWidth:'1150px', margin:'0 auto'}}>
        <div style={{fontSize:'9px', letterSpacing:'1.5px', color:'#8a9b8f', fontWeight:700}}>01 • FARM PROFILE</div>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'6px'}}><h2 style={{fontSize:'24px', fontWeight:800, margin:0}}>Tell us about the field</h2><span style={{fontSize:'9px', background:'#eef2eb', padding:'4px 10px', borderRadius:'20px'}}>• Demo Mode</span></div>

        <div style={{display:'grid', gridTemplateColumns:'1.6fr 1fr', gap:'16px', marginTop:'18px'}}>
          {/* LEFT CARD */}
          <div style={{background:s.card, border:'1px solid '+s.border, borderRadius:'16px', padding:'18px'}}>
            <div style={{display:'flex', gap:'8px', alignItems:'center', marginBottom:'14px'}}><span style={{background:'#eef4ee', padding:'6px', borderRadius:'8px'}}>🔷</span><div><div style={{fontWeight:700, fontSize:'13px'}}>Farm details</div><div style={{fontSize:'9px', color:'#8a9b8f'}}>Localized context improves the advisory.</div></div></div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
              {[
                ['Crop', <select value={f.crop} onChange={e=>setF({...f,crop:e.target.value})} style={{width:'100%', padding:'8px', borderRadius:'8px', border:'1px solid #e0d9c9'}}><option>Rice</option><option>Wheat</option><option>Maize</option></select>],
                ['Crop age (days)', <input value={f.age} onChange={e=>setF({...f,age:e.target.value})} placeholder="45 (optional)" style={{width:'100%', padding:'8px', borderRadius:'8px', border:'1px solid #e0d9c9'}}/>],
                ['State', <select value={f.state} onChange={e=>setF({...f,state:e.target.value})} style={{width:'100%', padding:'8px', borderRadius:'8px', border:'1px solid #e0d9c9'}}><option>West Bengal</option><option>Bihar</option><option>Punjab</option></select>],
                ['District', <select value={f.dist} onChange={e=>setF({...f,dist:e.target.value})} style={{width:'100%', padding:'8px', borderRadius:'8px', border:'1px solid #e0d9c9'}}><option>Nadia</option><option>Kolkata</option></select>],
                ['Soil type', <select value={f.soil} onChange={e=>setF({...f,soil:e.target.value})} style={{width:'100%', padding:'8px', borderRadius:'8px', border:'1px solid #e0d9c9'}}><option>Loamy</option><option>Clay</option><option>Sandy</option></select>],
                ['Soil moisture (%)', <input value={f.moist} onChange={e=>setF({...f,moist:e.target.value})} placeholder="60 (optional)" style={{width:'100%', padding:'8px', borderRadius:'8px', border:'1px solid #e0d9c9'}}/>],
                ['Soil pH', <input value={f.ph} onChange={e=>setF({...f,ph:e.target.value})} placeholder="5.8 (optional - no white screen)" style={{width:'100%', padding:'8px', borderRadius:'8px', border:'1px solid #e0d9c9'}}/>],
                ['Nitrogen', <select value={f.n} onChange={e=>setF({...f,n:e.target.value})} style={{width:'100%', padding:'8px', borderRadius:'8px', border:'1px solid #e0d9c9'}}><option>Low</option><option>Medium</option><option>High</option></select>],
                ['Phosphorus', <select value={f.p} onChange={e=>setF({...f,p:e.target.value})} style={{width:'100%', padding:'8px', borderRadius:'8px', border:'1px solid #e0d9c9'}}><option>Medium</option><option>Low</option><option>High</option></select>],
                ['Potassium', <select value={f.k} onChange={e=>setF({...f,k:e.target.value})} style={{width:'100%', padding:'8px', borderRadius:'8px', border:'1px solid #e0d9c9'}}><option>Medium</option><option>Low</option><option>High</option></select>],
              ].map(([label, inp], i)=>(
                <div key={i}><div style={{fontSize:'9px', fontWeight:600, marginBottom:'4px'}}>{label}</div>{inp}</div>
              ))}
            </div>
            {res && <div style={{marginTop:'14px', background:'#eef6ee', padding:'12px', borderRadius:'10px', fontSize:'12px'}}><b>Result:</b> Overall {res.overall}% Risk | pH used: {res.phNum} | Moisture used: {res.moistNum}% (default if empty)</div>}
          </div>

          {/* RIGHT CARD */}
          <div style={{background:s.card, border:'1px solid '+s.border, borderRadius:'16px', padding:'18px'}}>
            <div style={{display:'flex', gap:'8px', alignItems:'center', marginBottom:'14px'}}><span style={{background:'#eef4ee', padding:'6px', borderRadius:'8px'}}>🔷</span><div><div style={{fontWeight:700, fontSize:'13px'}}>Crop vision</div><div style={{fontSize:'9px', color:'#8a9b8f'}}>Upload a clear leaf or crop photo.</div></div></div>
            <label style={{display:'block', border:'1.5px dashed #d6cfbc', borderRadius:'14px', padding:'24px', textAlign:'center', background:'#fdfbf3', cursor:'pointer'}}>
              <input type="file" hidden onChange={onImg} />
              {prev? <img src={prev} style={{width:'100%', height:'140px', objectFit:'cover', borderRadius:'10px'}}/> : <><div style={{fontSize:'28px'}}>📷</div><div style={{fontWeight:700, fontSize:'11px', marginTop:'6px'}}>Drop crop image here</div><div style={{fontSize:'8px', color:'#8a9b8f'}}>JPG / PNG • Gemini multimodal analysis</div></>}
            </label>
            <button onClick={analyze} style={{width:'100%', marginTop:'12px', background:s.dark, color:'white', padding:'12px', borderRadius:'10px', border:'none', fontWeight:700, fontSize:'12px'}}>Analyze Farm →</button>
          </div>
        </div>

        <div style={{marginTop:'36px'}}>
          <div style={{fontSize:'9px', letterSpacing:'1.5px', color:'#8a9b8f', fontWeight:700}}>HOW IT WORKS</div>
          <h2 style={{fontSize:'24px', fontWeight:800, margin:'6px 0 14px 0'}}>One farm. Four intelligence layers.</h2>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:'12px'}}>
            {[['01','📷','Vision','Gemini analyses crop symptoms from an uploaded image.'],['02','🌦️','Context','Weather + soil + crop stage create local context'],['03','🛰️','Signals','Satellite health adaptor adds vegetation trend information.'],['04','🤖','Decision','ML risk fusion + Gemini produces a localized action plan.']].map(([n,ic,t,d])=>(
              <div key={n} style={{background:s.card, border:'1px solid '+s.border, borderRadius:'14px', padding:'14px'}}><div style={{fontSize:'10px', fontWeight:700, color:'#8a9b8f'}}>{n}</div><div style={{fontSize:'20px', margin:'8px 0'}}>{ic}</div><div style={{fontWeight:700, fontSize:'12px'}}>{t}</div><div style={{fontSize:'9px', color:'#7a8a80', marginTop:'4px', lineHeight:'1.4'}}>{d}</div></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
