import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function demo(f){
  const phNum = Number(f.ph) || 6.5;
  const moistNum = Number(f.moisture) || 60;
  const wr = f.crop === 'Rice' ? 82 : 61;
  const sr = Math.min(86, Math.round(35 + Math.abs(phNum - 6.5) * 18 + (moistNum * 0.12)));
  const ir = f.image ? 78 : 63;
  const sat = 68;
  const overall = Math.round(ir * 0.32 + wr * 0.28 + sr * 0.2 + sat * 0.2);
  return { wr, sr, ir, sat, overall };
}

function Title(icon, title, sub){
  return <div className="title"><i>{icon}</i><div><h3>{title}</h3><p>{sub}</p></div></div>;
}

function App(){
  const [form, setForm] = useState({ crop: 'Rice', ph: '', moisture: '', image: null });
  const [res, setRes] = useState(null);
  
  const onAnalyze = () => {
    const r = demo(form);
    setRes(r);
  };

  return (
    <div style={{padding: '40px', fontFamily: 'Inter, sans-serif'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <h1 style={{fontSize: '42px', lineHeight: '1.1'}}>See the risk.<br/>Understand<br/>the farm.<br/>Act before crop<br/>loss.</h1>
          <div style={{marginTop: '20px'}}>
            <select value={form.crop} onChange={e=>setForm({...form, crop: e.target.value})}>
              <option>Rice</option><option>Wheat</option><option>Maize</option>
            </select>
            <input placeholder="Soil pH (optional)" value={form.ph} onChange={e=>setForm({...form, ph: e.target.value})} style={{marginLeft: '10px'}} />
            <input placeholder="Moisture % (optional)" value={form.moisture} onChange={e=>setForm({...form, moisture: e.target.value})} style={{marginLeft: '10px'}} />
            <button onClick={onAnalyze} style={{marginLeft: '10px', background: '#0d3b2e', color: 'white', padding: '8px 16px', borderRadius: '8px'}}>Run Farm Analysis</button>
          </div>
          {res && <div style={{marginTop: '20px', background: '#f0fdf4', padding: '16px', borderRadius: '12px'}}>
            <p>Overall Risk: {res.overall}%</p>
            <p>Weather: {res.wr}% | Soil: {res.sr}% | Image: {res.ir}%</p>
          </div>}
        </div>
        <div style={{background: '#0d6b4f', color: 'white', padding: '24px', borderRadius: '16px', minWidth: '200px', textAlign: 'center'}}>
          <h2 style={{fontSize: '48px'}}>{res ? res.overall : 76}%</h2>
          <p>NOAA</p>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
