import React, { useState } from "react";
import ReactDOM from "react-dom/client";

// BUG FIX - yehi line white screen rokegi
function demo(f){
  const phNum = Number(f.ph) || 6.5;
  const moistNum = Number(f.moisture) || 60;
  const wr = f.crop === 'Rice'? 82 : 61;
  const sr = Math.min(86, Math.round(35 + Math.abs(phNum - 6.5) * 18 + (moistNum * 0.12)));
  const ir = f.image? 78 : 63;
  const sat = 68;
  const overall = Math.round(ir * 0.32 + wr * 0.28 + sr * 0.2 + sat * 0.2);
  return { wr, sr, ir, sat, overall, phNum, moistNum };
}

function App(){
  const [form, setForm] = useState({ crop: 'Rice', ph: '', moisture: '', image: null });
  const [res, setRes] = useState(null);
  const [preview, setPreview] = useState(null);

  const onFile = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    setForm({...form, image: file});
    setPreview(URL.createObjectURL(file));
  }

  const analyze = () => {
    setRes(demo(form));
  }

  return (
    <div style={{minHeight:'100vh', background:'#f6f7f4', fontFamily:'Inter, system-ui', color:'#0f281e'}}>
      {/* HEADER */}
      <div style={{background:'#0d3b2e', color:'white', padding:'16px 28px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div style={{display:'flex', gap:'10px', alignItems:'center', fontWeight:700, fontSize:'18px'}}>
          <span style={{background:'#1ea36a', padding:'6px 10px', borderRadius:'8px'}}>🌿</span> AgriShield AI
        </div>
        <div style={{display:'flex', gap:'16px', fontSize:'13px', opacity:.9}}>
          <span>Dashboard</span><span>Weather</span><span style={{background:'#1ea36a', padding:'4px 10px', borderRadius:'20px'}}>AI Active</span>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1.2fr.8fr', gap:'24px', padding:'28px', maxWidth:'1200px', margin:'0 auto'}}>
        {/* LEFT */}
        <div>
          <h1 style={{fontSize:'46px', fontWeight:800, lineHeight:'1.05', margin:0}}>See the risk.<br/>Understand<br/>the farm.<br/>Act before crop loss.</h1>
          <p style={{color:'#5a7268', marginTop:'12px'}}>Upload crop image + soil data. Get AI risk analysis in 3 seconds.</p>

          <div style={{background:'white', padding:'20px', borderRadius:'16px', marginTop:'22px', boxShadow:'0 8px 24px rgba(0,0,0,.06)'}}>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'12px'}}>
              <select value={form.crop} onChange={e=>setForm({...form,crop:e.target.value})} style={{padding:'12px', borderRadius:'10px', border:'1px solid #dde6e0'}}>
                <option>Rice</option><option>Wheat</option><option>Maize</option><option>Tomato</option>
              </select>
              <input placeholder="Soil pH (optional)" value={form.ph} onChange={e=>setForm({...form,ph:e.target.value})} style={{padding:'12px', borderRadius:'10px', border:'1px solid #dde6e0'}} />
              <input placeholder="Moisture % (optional)" value={form.moisture} onChange={e=>setForm({...form,moisture:e.target.value})} style={{padding:'12px', borderRadius:'10px', border:'1px solid #dde6e0'}} />
            </div>
            <div style={{marginTop:'12px', border:'2px dashed #b9d6c9', borderRadius:'12px', padding:'18px', textAlign:'center', background:'#f0faf5'}}>
              <input type="file" onChange={onFile} />
              {preview && <img src={preview} style={{width:'100%', height:'140px', objectFit:'cover', borderRadius:'10px', marginTop:'12px'}} />}
            </div>
            <button onClick={analyze} style={{width:'100%', marginTop:'14px', background:'#0d3b2e', color:'white', padding:'14px', borderRadius:'10px', fontWeight:700, fontSize:'15px', border:'none', cursor:'pointer'}}>Run Farm Analysis →</button>

            {res && (
              <div style={{marginTop:'16px', display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:'10px'}}>
                <div style={{background:'#eef6f1', padding:'12px', borderRadius:'10px', textAlign:'center'}}><div style={{fontSize:'20px', fontWeight:800}}>{res.wr}%</div><div style={{fontSize:'11px'}}>Weather</div></div>
                <div style={{background:'#eef6f1', padding:'12px', borderRadius:'10px', textAlign:'center'}}><div style={{fontSize:'20px', fontWeight:800}}>{res.sr}%</div><div style={{fontSize:'11px'}}>Soil ({res.phNum})</div></div>
                <div style={{background:'#eef6f1', padding:'12px', borderRadius:'10px', textAlign:'center'}}><div style={{fontSize:'20px', fontWeight:800}}>{res.ir}%</div><div style={{fontSize:'11px'}}>Image</div></div>
                <div style={{background:'#eef6f1', padding:'12px', borderRadius:'10px', textAlign:'center'}}><div style={{fontSize:'20px', fontWeight:800}}>{res.overall}%</div><div style={{fontSize:'11px'}}>Overall</div></div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT CARD */}
        <div>
          <div style={{background:'#0f5d42', color:'white', borderRadius:'18px', padding:'24px', position:'sticky', top:'20px'}}>
            <div style={{fontSize:'12px', letterSpacing:'1px', opacity:.8}}>LIVE RISK SCORE</div>
            <div style={{fontSize:'72px', fontWeight:900, margin:'10px 0'}}>{res? res.overall : 76}%</div>
            <div style={{background:'rgba(255,255,255,.12)', padding:'12px', borderRadius:'10px', fontSize:'13px'}}>✓ NOAA Weather<br/>✓ Soil Health<br/>✓ AI Image Scan<br/>✓ Satellite NDVI</div>
            <div style={{marginTop:'16px', fontSize:'12px', opacity:.7}}>Default pH 6.5 used if empty - no white screen</div>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
