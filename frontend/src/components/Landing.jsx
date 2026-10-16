import { useState, useEffect } from 'react';

export default function Landing({ onGetStarted }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { icon: '🧠', title: 'AI Disease Detection', desc: 'Advanced CNN with Transfer Learning detects 30+ crop diseases from a single leaf image.', color: 'from-emerald-500 to-teal-500' },
    { icon: '🔍', title: 'Explainable AI', desc: 'Grad-CAM heatmaps show exactly where the AI sees the disease. No black boxes.', color: 'from-blue-500 to-indigo-500' },
    { icon: '🌦️', title: 'Live Weather Intel', desc: 'Real-time weather integration predicts disease risk before it spreads.', color: 'from-cyan-500 to-blue-500' },
    { icon: '🗺️', title: 'Field Mapping', desc: 'Track multiple fields on an interactive map. Monitor crop health across your entire farm.', color: 'from-purple-500 to-pink-500' },
    { icon: '💊', title: 'Treatment Plans', desc: 'Actionable remedies with estimated costs and potential yield loss.', color: 'from-orange-500 to-red-500' },
    { icon: '🌍', title: 'Multi-Language', desc: 'Instant translation in English, Hindi, and Marathi for rural accessibility.', color: 'from-teal-500 to-green-500' },
  ];

  const stats = [
    { value: '30+', label: 'Diseases Detected' },
    { value: '95%', label: 'Model Accuracy' },
    { value: '<2s', label: 'Analysis Time' },
    { value: '24/7', label: 'Available' },
  ];

  const steps = [
    { num: '01', title: 'Upload Image', desc: 'Snap a photo of any crop leaf from your phone.' },
    { num: '02', title: 'AI Analyzes', desc: 'Our CNN model detects diseases in under 2 seconds.' },
    { num: '03', title: 'Get Solution', desc: 'Receive treatment plans, cost estimates, and remedies.' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 overflow-x-hidden relative">
      
      {/* ============ ANIMATED BACKGROUND ============ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/20 blur-[150px] rounded-full animate-pulse-slow" />
        <div className="absolute top-[30%] right-[-10%] w-[40%] h-[40%] bg-blue-500/15 blur-[150px] rounded-full animate-pulse-slower" />
        <div className="absolute bottom-[-20%] left-[30%] w-[40%] h-[40%] bg-teal-500/10 blur-[150px] rounded-full animate-pulse-slow" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* ============ NAVBAR ============ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <span className="text-lg">🌱</span>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">FarmWatch<span className="text-emerald-400">AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#features" className="text-slate-400 hover:text-white transition-colors">Features</a>
            <a href="#how" className="text-slate-400 hover:text-white transition-colors">How it works</a>
            <a href="#stats" className="text-slate-400 hover:text-white transition-colors">Impact</a>
          </div>
          <button onClick={onGetStarted} className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white px-5 py-2 rounded-xl font-semibold text-sm shadow-lg shadow-emerald-500/25 transition-all hover:-translate-y-0.5">
            Launch App →
          </button>
        </div>
      </nav>

      {/* ============ HERO SECTION ============ */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            AI-Powered Agritech Platform · v2.0
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 animate-fade-in-up">
            Detect Crop Stress
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Before It Spreads.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            FarmWatch AI turns any smartphone into a crop doctor. Upload a leaf image and get 
            instant disease detection, treatment plans, and financial impact—all powered by 
            Explainable Deep Learning.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <button onClick={onGetStarted} className="group relative bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all hover:-translate-y-1 flex items-center gap-3">
              Start Free Analysis
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button onClick={onGetStarted} className="px-8 py-4 rounded-2xl font-bold text-lg bg-slate-900/60 border border-slate-700 hover:border-emerald-500/50 hover:bg-slate-800/60 text-white transition-all flex items-center gap-3 backdrop-blur-sm">
              <span>▶</span> Watch Demo
            </button>
          </div>

          {/* Hero Visual Mockup */}
          <div className="relative max-w-5xl mx-auto animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 blur-3xl opacity-50 rounded-full" />
            <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-3xl p-4 md:p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="ml-4 text-xs text-slate-500">farmwatch.ai/dashboard</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800">
                  <p className="text-xs text-slate-500 mb-1">DETECTED</p>
                  <p className="text-lg font-bold text-red-400">Late Blight</p>
                  <p className="text-xs text-emerald-400 mt-1">94.8% confidence</p>
                </div>
                <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800">
                  <p className="text-xs text-slate-500 mb-1">SEVERITY</p>
                  <p className="text-lg font-bold text-yellow-400">Moderate</p>
                  <p className="text-xs text-red-400 mt-1">30% yield loss</p>
                </div>
                <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800">
                  <p className="text-xs text-slate-500 mb-1">ACTION</p>
                  <p className="text-lg font-bold text-blue-400">₹500/acre</p>
                  <p className="text-xs text-emerald-400 mt-1">Treatment ready</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS SECTION ============ */}
      <section id="stats" className="relative py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 text-center hover:border-emerald-500/30 transition-all group">
              <p className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">{stat.value}</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ FEATURES SECTION ============ */}
      <section id="features" className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-emerald-400 font-bold text-sm uppercase tracking-widest">Features</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-3 mb-4">
              Everything a farmer needs.
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              One platform. Complete crop protection. From detection to treatment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <div key={i} className="group relative bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 hover:border-emerald-500/50 transition-all hover:-translate-y-2 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${feat.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feat.color} flex items-center justify-center text-2xl mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section id="how" className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-emerald-400 font-bold text-sm uppercase tracking-widest">Process</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-3 mb-4">
              Three steps. Zero expertise required.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="text-7xl font-extrabold text-slate-800 mb-4">{step.num}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400">{step.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-12 -right-4 text-emerald-500/30 text-4xl">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA SECTION ============ */}
      <section className="relative py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-blue-500/20 backdrop-blur-xl border border-emerald-500/30 rounded-[2.5rem] p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-30" style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(20, 184, 166, 0.3) 0%, transparent 50%)'
            }} />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                Ready to protect your harvest?
              </h2>
              <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                Join the AI-powered revolution in agriculture. Detect diseases, save crops, and increase yield.
              </p>
              <button onClick={onGetStarted} className="group bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-white/20 transition-all hover:-translate-y-1 inline-flex items-center gap-3">
                Launch FarmWatch AI
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="relative border-t border-slate-800 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-sm">🌱</span>
            </div>
            <span className="text-sm text-slate-400">© 2026 FarmWatch AI. Built for farmers, by farmers.</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <span>Made with 💚 for Agritech Hackathon</span>
          </div>
        </div>
      </footer>

      {/* Custom Animations */}
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.8; } }
        @keyframes pulse-slower { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }
        .animate-fade-in { animation: fade-in 1s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out both; }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        .animate-pulse-slower { animation: pulse-slower 12s ease-in-out infinite; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}