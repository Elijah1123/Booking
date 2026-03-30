import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Download, CheckCircle, Clock, Trash2, Home, AlertCircle } from 'lucide-react';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [rooms, setRooms] = useState([
    { id: 1, name: "Royal Ocean Suite", available: true },
    { id: 2, name: "Executive Business Twin", available: true },
    { id: 3, name: "Family Garden Villa", available: true },
    { id: 4, name: "Classic Studio", available: false }
  ]);

  useEffect(() => {
    // 1. Fetch Real User Count from LocalStorage
    const keys = Object.keys(localStorage);
    const users = keys.filter(k => k.startsWith('user_data_'));
    setUserCount(users.length);

    // 2. Load Bookings (Simulating persistent state)
    const savedBookings = JSON.parse(localStorage.getItem('mzalendo_all_bookings')) || [
      { id: 'BK-902', user: 'Elijah Macharia', email: 'elijah@tech.com', room: 'Royal Suite', date: '2026-03-30', status: 'Completed', total: 450 },
      { id: 'BK-115', user: 'Jane Doe', email: 'jane@mzalendo.com', room: 'Garden Villa', date: '2026-04-02', status: 'Pending', total: 320 }
    ];
    setBookings(savedBookings);
  }, []);

  // Function to toggle Booking Status (Pending <-> Completed)
  const toggleBookingStatus = (id) => {
    const updated = bookings.map(b => 
      b.id === id ? { ...b, status: b.status === 'Pending' ? 'Completed' : 'Pending' } : b
    );
    setBookings(updated);
    localStorage.setItem('mzalendo_all_bookings', JSON.stringify(updated));
  };

  // Function to toggle Room Availability
  const toggleRoomAvailability = (id) => {
    setRooms(rooms.map(r => r.id === id ? { ...r, available: !r.available } : r));
    alert(`Room status updated successfully!`);
  };

  const downloadCSV = () => {
    const headers = "Booking ID,User,Email,Room,Total,Status\n";
    const rows = bookings.map(b => `${b.id},${b.user},${b.email},${b.room},${b.total},${b.status}`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Mzalendo_Luxe_Bookings.csv';
    link.click();
  };

  return (
    <div className="p-8 max-w-7xl mx-auto bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-serif font-bold text-slate-900">Executive Control</h1>
          <p className="text-slate-500">Welcome back, Administrator Elijah</p>
        </div>
        <button onClick={downloadCSV} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-200 hover:bg-blue-700 transition">
          <Download size={18}/> Export Bookings
        </button>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden">
          <Users className="text-blue-600 mb-4" size={32} />
          <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest">Registered Clients</h4>
          <p className="text-5xl font-black mt-2 text-slate-900">{userCount}</p>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-50 rounded-full opacity-50"></div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <BookOpen className="text-emerald-500" size={32} />
            <div className="text-right">
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded">LIVE</span>
            </div>
          </div>
          <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest">Total Revenue</h4>
          <p className="text-5xl font-black mt-2 text-slate-900">
            ${bookings.reduce((sum, b) => sum + b.total, 0)}
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl text-white">
          <h4 className="text-[10px] font-bold uppercase opacity-50 tracking-widest mb-6 text-center">User Growth (Pie Chart View)</h4>
          <div className="flex items-center justify-center gap-6">
             <div className="w-20 h-20 rounded-full border-[8px] border-blue-500 border-t-transparent animate-spin-slow"></div>
             <div>
               <p className="text-3xl font-black">{(userCount / 100 * 100).toFixed(1)}%</p>
               <p className="text-[10px] opacity-60">Target Capacity</p>
             </div>
          </div>
        </div>
      </div>

      {/* Room Inventory Management */}
      <div className="mb-12">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800"><Home size={20}/> Room Availability Control</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {rooms.map(room => (
            <div key={room.id} className="bg-white p-6 rounded-3xl border border-slate-100 flex flex-col justify-between shadow-sm">
              <p className="font-bold text-sm text-slate-700">{room.name}</p>
              <button 
                onClick={() => toggleRoomAvailability(room.id)}
                className={`mt-4 py-2 rounded-xl text-[10px] font-bold transition ${room.available ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}
              >
                {room.available ? 'SET AS UNAVAILABLE' : 'RESTORE TO LISTING'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Trends Histogram */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 mb-12">
        <h3 className="font-bold mb-8 text-slate-800">Completed Bookings Trend (Weekly)</h3>
        <div className="flex items-end gap-4 h-48 border-b border-slate-100 pb-2">
          {[30, 60, 40, 95, 70, 85, 50].map((h, i) => (
            <div key={i} className="flex-1 bg-blue-600/10 rounded-t-2xl hover:bg-blue-600 transition-all group relative cursor-pointer" style={{ height: `${h}%` }}>
               <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition">{h}%</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>
      </div>

      {/* Booking List Table */}
      <div className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-sm">
        <div className="p-8 border-b flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-slate-800">Live Booking Ledger</h3>
          <span className="text-[10px] font-bold text-slate-400">{bookings.length} Records Found</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-400">
              <tr>
                <th className="p-8">ID</th>
                <th>Guest Credentials</th>
                <th>Room Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {bookings.map(bk => (
                <tr key={bk.id} className="hover:bg-blue-50/30 transition">
                  <td className="p-8 font-mono font-bold text-blue-600">{bk.id}</td>
                  <td>
                    <p className="font-bold text-slate-900">{bk.user}</p>
                    <p className="text-[10px] text-slate-400 lowercase">{bk.email}</p>
                  </td>
                  <td className="font-medium text-slate-600">{bk.room}</td>
                  <td className="font-black text-slate-900">${bk.total}</td>
                  <td>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${bk.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {bk.status === 'Completed' ? <CheckCircle size={10}/> : <Clock size={10}/>}
                      {bk.status.toUpperCase()}
                    </div>
                  </td>
                  <td className="p-8">
                    <button 
                      onClick={() => toggleBookingStatus(bk.id)}
                      className="text-xs font-bold text-blue-600 hover:underline"
                    >
                      Mark as {bk.status === 'Pending' ? 'Completed' : 'Pending'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;