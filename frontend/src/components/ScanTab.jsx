import { useState } from 'react';
import { predictStress } from '../services/api';

// ==========================================
// KINDWISE-INSPIRED RICH TREATMENT DATABASE
// ==========================================
const richTreatments = {
  "Tomato___Late_blight": {
    severity: "Severe",
    color: "bg-red-500/20 text-red-400 border-red-500/30",
    cost: "₹500 - ₹800 / acre",
    yieldLoss: "30 - 40%",
    symptoms: ["Dark, water-soaked spots on leaves", "White fungal growth on undersides", "Stem lesions"],
    action: "Apply copper-based fungicide immediately. Remove infected leaves. Avoid overhead watering.",
    description: "Late blight is a devastating disease caused by the oomycete Phytophthora infestans. It spreads rapidly in cool, wet conditions and can destroy an entire field in days.",
    followUpQ: "Do you see white, fuzzy fungal growth on the undersides of the leaves?",
    action_hi: "तुरंत कॉपर-आधारित कवकनाशी लगाएं। संक्रमित पत्तियों को हटा दें।",
    action_mr: "ताबडतोब तांबे-आधारित बुरशीनाशक वापरा. संक्रमित पाने काढून टाका."
  },
  "Potato___Early_blight": {
    severity: "Moderate",
    color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    cost: "₹400 - ₹600 / acre",
    yieldLoss: "20 - 30%",
    symptoms: ["Dark brown spots with concentric rings", "Yellowing of leaves around spots", "Spots mostly on older leaves"],
    action: "Apply chlorothalonil or mancozeb. Ensure proper crop rotation. Remove plant debris.",
    description: "Early blight is a common fungal disease caused by Alternaria solani. It typically affects older leaves first and thrives in warm, humid conditions.",
    followUpQ: "Are the spots mostly on the older, lower leaves of the plant?",
    action_hi: "क्लोरोथालोनिल या मैंकोजेब लगाएं। उचित फसल चक्र सुनिश्चित करें।",
    action_mr: "क्लोरोथालोनिल किंवा मॅन्कोझेब वापरा. योग्य पीक फेरपालट करा."
  },
  "Corn___Healthy": {
    severity: "Healthy",
    color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    cost: "₹0",
    yieldLoss: "0%",
    symptoms: ["No visible spots or lesions", "Uniform green color", "No wilting"],
    action: "Your crop is healthy! Maintain current irrigation and nutrient schedule.",
    description: "Your corn crop appears to be in excellent health. Continue regular monitoring to catch any early signs of stress or disease.",
    followUpQ: null,
    action_hi: "आपकी फसल स्वस्थ है! वर्तमान सिंचाई और पोषक तत्व कार्यक्रम बनाए रखें।",
    action_mr: "तुमचे पीक निरोगी आहे! सध्याचे सिंचन आणि पोषक तत्वांचे वेळापत्रक सुरू ठेवा."
  },
  "Tomato___Healthy": {
    severity: "Healthy",
    color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    cost: "₹0",
    yieldLoss: "0%",
    symptoms: ["No visible spots or lesions", "Uniform green color", "No wilting"],
    action: "Your crop is healthy! Maintain current irrigation and nutrient schedule.",
    description: "Your tomato crop is healthy. Keep up the good work and continue to monitor for any changes.",
    followUpQ: null,
    action_hi: "आपकी फसल स्वस्थ है! वर्तमान सिंचाई और पोषक तत्व कार्यक्रम बनाए रखें।",
    action_mr: "तुमचे पीक निरोगी आहे! सध्याचे सिंचन आणि पोषक तत्वांचे वेळापत्रक सुरू ठेवा."
  }
};

export default function ScanTab({ preview, setPreview, file, setFile, result, setResult, loading, setLoading }) {
  const [fieldName, setFieldName] = useState("Field 1");
  const [showDetails, setShowDetails] = useState(false);
  const [followUpAnswer, setFollowUpAnswer] = useState(null);
  const [language, setLanguage] = useState('en'); // 'en', 'hi', 'mr'

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setFollowUpAnswer(null); // Reset follow up on new upload
    setShowDetails(false);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('field_name', fieldName);

    try {
      const response = await predictStress(formData);
      setTimeout(() => {
        setResult(response.data);
        setLoading(false);
        const speech = new SpeechSynthesisUtterance(`Detected ${response.data.prediction.replace(/_/g, ' ')} in ${fieldName}`);
        window.speechSynthesis.speak(speech);
      }, 800);
    } catch (error) {
      alert("Error connecting to backend.");
      setLoading(false);
    }
  };

  const data = result ? richTreatments[result.prediction] : null;

  const getActionText = () => {
    if (!data) return "";
    if (language === 'hi') return data.action_hi;
    if (language === 'mr') return data.action_mr;
    return data.action;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in-up">
      {/* LEFT: UPLOAD ZONE */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <label className="text-sm font-semibold text-slate-400">Select Field:</label>
          <select value={fieldName} onChange={(e) => setFieldName(e.target.value)} className="bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 outline-none focus:border-emerald-500">
            <option>Field 1 (Tomato)</option>
            <option>Field 2 (Potato)</option>
            <option>Field 3 (Corn)</option>
          </select>
        </div>
        <div className="relative flex-grow flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-dashed border-slate-700 bg-slate-900/50 hover:bg-slate-800/50 transition-all min-h-[300px]">
          <input type="file" accept="image/*" onChange={(e) => { setPreview(URL.createObjectURL(e.target.files[0])); setFile(e.target.files[0]); setResult(null); }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />
          {preview ? <img src={preview} alt="Preview" className="max-h-[250px] rounded-2xl object-contain shadow-2xl border border-slate-700" /> : <div className="text-center"><span className="text-4xl mb-4 block">📸</span><p className="text-slate-400">Click or drag image here</p></div>}
        </div>
        <button onClick={handleUpload} disabled={!file || loading} className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 transition-all">
          {loading ? "Analyzing..." : "Predict Crop Stress"}
        </button>
      </div>

      {/* RIGHT: RICH DIAGNOSIS & REMEDY */}
      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col">
        <h3 className="text-xl font-bold text-white mb-4 border-b border-slate-800 pb-4">Analysis & Remedy</h3>
        
        {!result && !loading && <div className="flex-grow flex items-center justify-center text-slate-500">Waiting for image...</div>}
        {loading && <div className="flex-grow flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div></div>}
        
        {result && !loading && data && (
          <div className="flex flex-col gap-4">
            
            {/* Diagnosis Header */}
            <div className="flex justify-between items-center bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">DETECTED CONDITION</p>
                <p className="text-2xl font-bold text-white">{result.prediction.replace(/_/g, ' ')}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-bold border ${data.color}`}>
                {data.severity}
              </div>
            </div>

            {/* Confidence Gauge */}
            <div className="flex items-center gap-4 bg-slate-800/50 p-3 rounded-xl border border-slate-700">
              <div className="relative w-16 h-16 flex-shrink-0">
                <svg viewBox="0 0 100 100" className="w-16 h-16 transform -rotate-90">
                  <circle cx="50" cy="50" r="40" stroke="#1e293b" strokeWidth="8" fill="none" />
                  <circle cx="50" cy="50" r="40" stroke="#10b981" strokeWidth="8" fill="none" strokeDasharray={`${2 * Math.PI * 40}`} strokeDashoffset={`${2 * Math.PI * 40 * (1 - result.confidence / 100)}`} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-sm font-bold text-white">{result.confidence}%</span>
                </div>
              </div>
              <div className="flex-grow">
                <p className="text-xs text-slate-400 uppercase tracking-wider">AI Confidence</p>
                <p className="text-sm text-slate-300">High certainty in this diagnosis.</p>
              </div>
              <button onClick={() => setShowDetails(!showDetails)} className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                {showDetails ? "Hide Info" : "Learn More"}
              </button>
            </div>

            {/* LLM-Style Description (Expandable) */}
            {showDetails && (
              <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 text-sm text-slate-300 animate-fade-in">
                <p className="font-semibold text-emerald-400 mb-2">📖 About this disease:</p>
                <p className="leading-relaxed mb-3">{data.description}</p>
                <p className="font-semibold text-slate-400 mb-1">Common Symptoms:</p>
                <ul className="list-disc list-inside text-slate-400 space-y-1">
                  {data.symptoms.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            )}

            {/* Follow-Up Question (The "Wow" Factor) */}
            {data.followUpQ && result.confidence < 90 && !followUpAnswer && (
              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-xl animate-pulse">
                <p className="text-sm text-blue-300 font-semibold mb-3">❓ {data.followUpQ}</p>
                <div className="flex gap-3">
                  <button onClick={() => setFollowUpAnswer('yes')} className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 py-2 rounded-lg text-sm font-bold transition-all">Yes</button>
                  <button onClick={() => setFollowUpAnswer('no')} className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-300 py-2 rounded-lg text-sm font-bold transition-all">No</button>
                </div>
              </div>
            )}

            {/* Follow-Up Result */}
            {followUpAnswer && (
              <div className={`p-4 rounded-xl text-sm border ${followUpAnswer === 'yes' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300'}`}>
                {followUpAnswer === 'yes' 
                  ? "✅ Thank you. Your response confirms the AI's diagnosis. Proceed with the treatment plan below." 
                  : "⚠️ Noted. The symptoms may be early-stage or a different issue. Monitor closely and consult an expert if it worsens."}
              </div>
            )}

            {/* Financial Impact */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-center">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Est. Treatment Cost</p>
                <p className="text-lg font-bold text-blue-400">{data.cost}</p>
              </div>
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-center">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Potential Yield Loss</p>
                <p className="text-lg font-bold text-red-400">{data.yieldLoss}</p>
              </div>
            </div>

            {/* Actionable Recommendation with Language Toggle */}
            <div className="p-5 bg-emerald-950/30 border border-emerald-500/20 rounded-xl relative">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-emerald-400 font-bold flex items-center gap-2"><span>💡</span> Recommended Action</h4>
                <div className="flex gap-1 bg-slate-800 rounded-lg p-1 border border-slate-700">
                  {['en', 'hi', 'mr'].map(lang => (
                    <button key={lang} onClick={() => setLanguage(lang)} className={`text-[10px] px-2 py-1 rounded ${language === lang ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'}`}>
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{getActionText()}</p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}