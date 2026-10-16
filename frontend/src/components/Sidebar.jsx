export default function Sidebar({ activeTab, setActiveTab, onLogout }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'scan', label: 'Scan Crop', icon: '📷' },
    { id: 'map', label: 'Field Map', icon: '🗺️' },
    { id: 'history', label: 'History', icon: '🕒' },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <span className="text-2xl mr-3">🌱</span>
        <span className="text-xl font-bold text-white tracking-tight">FarmWatch</span>
      </div>
      <nav className="flex-grow p-4 flex flex-col gap-2">
        {menuItems.map((item) => (
          <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === item.id ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <span>{item.icon}</span> {item.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300">Logout</button>
      </div>
    </aside>
  );
}