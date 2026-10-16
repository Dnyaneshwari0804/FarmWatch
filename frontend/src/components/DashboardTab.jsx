import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export default function DashboardTab({ stats, weather }) {
  // Mock data for the bar chart - you can connect this to your history later
  const weeklyData = [
    { name: 'Mon', healthy: 4, diseased: 1 },
    { name: 'Tue', healthy: 3, diseased: 2 },
    { name: 'Wed', healthy: 5, diseased: 0 },
    { name: 'Thu', healthy: 2, diseased: 3 },
    { name: 'Fri', healthy: 6, diseased: 1 },
    { name: 'Sat', healthy: 4, diseased: 2 },
    { name: 'Sun', healthy: 5, diseased: 1 },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      {weather.risk && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-2xl flex items-center gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="font-bold">High Fungal Disease Risk Detected</p>
            <p className="text-sm opacity-80">Humidity is above 70%. Conditions are favorable for Late Blight. Preventive spraying recommended.</p>
          </div>
        </div>
      )}
      
      {/* TOP STATS - These stay the same but now feel more important */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Scans', value: stats.total, color: 'text-white' },
          { label: 'Healthy Crops', value: stats.healthy, color: 'text-emerald-400' },
          { label: 'Diseased Crops', value: stats.diseased, color: 'text-red-400' }
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-xl">
            <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider mb-2">{stat.label}</p>
            <p className={`text-4xl font-extrabold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* NEW CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-4">Weekly Scan Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
                <Bar dataKey="healthy" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="diseased" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col items-center justify-center">
          <h3 className="text-lg font-bold text-white mb-4">Overall Health</h3>
          <div className="w-full h-48">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={[{ name: 'Healthy', value: stats.healthy || 1, color: '#10b981' }, { name: 'Diseased', value: stats.diseased || 1, color: '#ef4444' }]} innerRadius={50} outerRadius={70} dataKey="value">
                  {[{ color: '#10b981' }, { color: '#ef4444' }].map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}