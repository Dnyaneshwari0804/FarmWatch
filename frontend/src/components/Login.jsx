import { useState } from 'react';

export default function Login({ onLogin, onBack }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isRegister && !name) {
      alert("Please enter your name.");
      return;
    }
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      // Mock authentication for hackathon demo
      onLogin({ 
        name: isRegister ? name : (email.split('@')[0] || 'Farmer'), 
        email 
      });
      setIsLoading(false);
    }, 500);
  };

  const handleDemoLogin = () => {
    onLogin({ 
      name: 'Demo Farmer', 
      email: 'demo@farmwatch.com' 
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Animated Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none animate-pulse-slower" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* Auth Card */}
      <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-800 p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-md relative z-10 animate-fade-in-up">
        
        {/* Back to Home Button */}
        {onBack && (
          <button 
            type="button" 
            onClick={onBack} 
            className="absolute top-4 left-4 text-xs text-slate-500 hover:text-emerald-400 transition-colors flex items-center gap-1 font-medium"
          >
            ← Back to Home
          </button>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 border border-emerald-500/30 shadow-lg shadow-emerald-500/20">
            <span className="text-3xl">🌱</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-slate-400 text-sm">
            {isRegister ? 'Join FarmWatch AI today' : 'Login to your AgriTech dashboard'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* Name Field (Only for Register) */}
          {isRegister && (
            <div className="animate-fade-in">
              <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Ramesh Patil" 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                required={isRegister}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="farmer@farmwatch.com" 
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••" 
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="mt-2 w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 shadow-lg shadow-emerald-500/25 transition-all hover:-translate-y-0.5 disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : (isRegister ? 'Create Account' : 'Login to Dashboard')}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-1">
            <div className="flex-grow h-px bg-slate-800"></div>
            <span className="text-xs text-slate-600 font-semibold uppercase tracking-wider">or</span>
            <div className="flex-grow h-px bg-slate-800"></div>
          </div>

          {/* Demo Login */}
          <button 
            type="button" 
            onClick={handleDemoLogin} 
            className="w-full py-3 rounded-xl font-bold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            <span></span> Demo Account 
          </button>

          {/* Toggle Login/Register */}
          <div className="text-center text-sm text-slate-400 mt-2">
            {isRegister ? (
              <>Already have an account? <button type="button" onClick={() => setIsRegister(false)} className="text-emerald-400 font-bold hover:underline">Login</button></>
            ) : (
              <>Don't have an account? <button type="button" onClick={() => setIsRegister(true)} className="text-emerald-400 font-bold hover:underline">Sign Up</button></>
            )}
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-slate-600 mt-6">
          By continuing, you agree to our Terms & Privacy Policy.
        </p>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.8; } }
        @keyframes pulse-slower { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out both; }
        .animate-fade-in { animation: fade-in 0.4s ease-out; }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        .animate-pulse-slower { animation: pulse-slower 12s ease-in-out infinite; }
      `}</style>
    </div>
  );
}