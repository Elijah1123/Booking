import React, { useState, useEffect } from 'react';
import { Search, Star, MapPin, Calendar, Info } from 'lucide-react';

const ROOM_DATA = [
  { id: 1, name: "Royal Ocean Suite", price: 450, type: "Luxury", rating: 5, img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800" },
  { id: 2, name: "Executive Business Twin", price: 190, type: "Business", rating: 4, img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800" },
  { id: 3, name: "Family Garden Villa", price: 320, type: "Family", rating: 5, img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800" },
  { id: 4, name: "Classic Studio", price: 120, type: "Standard", rating: 3, img: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800" }
];

const Home = () => {
  const [dates, setDates] = useState({ in: '', out: '' });
  const [search, setSearch] = useState('');
  const [slide, setSlide] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1200"
  ];

  useEffect(() => {
    const timer = setInterval(() => setSlide(s => (s + 1) % heroImages.length), 6000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  // Logic: User can only book if both dates exist and check-out is after check-in
  const isReady = dates.in && dates.out && new Date(dates.out) > new Date(dates.in);

  const filteredRooms = ROOM_DATA.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) || 
    r.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* --- HERO SLIDER SECTION --- */}
      <div className="relative h-[600px] overflow-hidden">
        {heroImages.map((img, i) => (
          <div 
            key={i} 
            className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out transform ${i === slide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
          >
            <img src={img} className="w-full h-full object-cover" alt="Luxury Hotel" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
          </div>
        ))}
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <span className="uppercase tracking-[0.3em] text-sm mb-4 animate-fadeIn">Welcome to Mzalendo Luxe</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 drop-shadow-lg">
            Your Sanctuary Awaits
          </h1>
          <p className="text-lg md:text-xl font-light max-w-2xl opacity-90 leading-relaxed">
            Experience world-class hospitality in the heart of the city. 
            Book your stay today starting from 120 USD.
          </p>
        </div>
      </div>

      {/* --- BOOKING BAR (Floating Card) --- */}
      <div className="max-w-6xl mx-auto -mt-20 relative z-20 px-4">
        <div className="bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <Calendar size={14} className="text-blue-600" /> Check In
              </label>
              <input 
                type="date" 
                className="w-full border-slate-200 rounded-xl p-3 bg-slate-50 focus:ring-2 focus:ring-blue-500 transition-all outline-none" 
                onChange={e => setDates({...dates, in: e.target.value})} 
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <Calendar size={14} className="text-blue-600" /> Check Out
              </label>
              <input 
                type="date" 
                className="w-full border-slate-200 rounded-xl p-3 bg-slate-50 focus:ring-2 focus:ring-blue-500 transition-all outline-none" 
                onChange={e => setDates({...dates, out: e.target.value})} 
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <Search size={14} className="text-blue-600" /> Search Type
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="e.g. Luxury, Suite..." 
                  className="w-full border-slate-200 rounded-xl p-3 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500" 
                  onChange={e => setSearch(e.target.value)} 
                />
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-[52px] rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-200">
              Check Availability
            </button>
          </div>
          
          {/* Validation Message */}
          {!isReady && (
            <div className="mt-4 flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100">
              <Info size={16} />
              <p className="text-xs font-medium">
                {(!dates.in || !dates.out) 
                  ? "Please select both check-in and check-out dates to book." 
                  : "Check-out date must be after the check-in date."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* --- ROOM GRID SECTION --- */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-serif font-bold text-slate-900 mb-2">Our Accommodations</h2>
            <p className="text-slate-500">Hand-picked rooms designed for ultimate comfort.</p>
          </div>
          <div className="text-right">
            <span className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
              {filteredRooms.length} Rooms Found
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {filteredRooms.map(room => (
            <div key={room.id} className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={room.img} 
                  className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                  alt={room.name} 
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600 shadow-sm">
                    {room.type}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex text-amber-400 mb-3">
                  {[...Array(room.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {room.name}
                </h3>
                
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-3xl font-black text-slate-900">${room.price}</span>
                  <span className="text-sm font-medium text-slate-400">USD/Night</span>
                </div>

                <button 
                  disabled={!isReady}
                  className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 
                    ${isReady 
                      ? 'bg-slate-900 text-white hover:bg-blue-600 hover:-translate-y-1 shadow-lg' 
                      : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
                >
                  {isReady ? 'Reserve Now' : 'Select Dates'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg italic">No rooms match your search criteria...</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;