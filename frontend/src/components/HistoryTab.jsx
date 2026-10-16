import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function HistoryTab({ history, stats }) {
  const chartData = [
    { name: 'Healthy', value: stats.healthy || 1, color: '#10b981' },
    { name: 'Diseased', value: stats.diseased || 1, color: '#ef4444' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up">
      <div className="lg:col-span-2 bg-slate-900/60 rounded-3xl p-6 border border-slate-800 shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-4">Recent Scans</h3>
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="text-xs text-slate-500 uppercase bg-slate-800/50">
            <tr><th className="px-4 py-3">Field</th><th className="px-4 py-3">Prediction</th><th className="px-4 py-3">Confidence</th></tr>
          </thead>
          <tbody>
            {history.map((record) => (
              <tr key={record.id} className="border-b border-slate-800/50">
                <td className="px-4 py-3 font-medium text-slate-400">{record.field_name}</td>
                <td className="px-4 py-3 font-semibold text-white">{record.prediction.replace(/_/g, ' ')}</td>
                <td className="px-4 py-3 text-emerald-400 font-bold">{record.confidence}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-slate-900/60 rounded-3xl p-6 border border-slate-800 shadow-2xl flex flex-col items-center">
        <h3 className="text-xl font-bold text-white mb-4">Health Overview</h3>
        <div className="w-full h-48">
          <ResponsiveContainer><PieChart><Pie data={chartData} innerRadius={50} outerRadius={70} dataKey="value">{chartData.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} /></PieChart></ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}