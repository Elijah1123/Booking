import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Search, Star, ArrowRight } from 'lucide-react';

const ROOMS = [
  { id: 1, name: "Royal Ocean Suite", price: 450, type: "Luxury", max: 4, img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b" },
  { id: 2, name: "Executive Business Twin", price: 190, type: "Business", max: 2, img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a" },
  { id: 3, name: "Family Garden Villa", price: 320, type: "Family", max: 10, img: "https://images.unsplash.com/photo-1540518614846-7eded433c457" },
  { id: 4, name: "Classic Studio", price: 120, type: "Standard", max: 2, img: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c" }
];

const Home = ({ user }) => {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);
  const [dates, setDates] = useState({ in: '', out: '' });
  const [guests, setGuests] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Slideshow Logic: Auto-rotate every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % ROOMS.slice(0, 3).length); // Slide only top 3 rooms
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // 2. Filter Logic: Search by name or type
  const filteredRooms = ROOMS.filter(room => 
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBook = (room) => {
    // Check if user is logged in
    if (!user) {
      alert("⚠️ Authentication Required: Please 'Sign In' or 'Create Account' at the top to book your stay.");
      return;
    }

    // Check if dates are selected
    if (!dates.in || !dates.out) {
      alert("⚠️ Selection Required: Please choose your Check-In and Check-Out dates in the search bar above.");
      return;
    }

    // Check if dates are valid
    if (new Date(dates.out) <= new Date(dates.in)) {
      alert("⚠️ Invalid Dates: Check-Out must be after Check-In.");
      return;
    }

    navigate('/reserve', { state: { room, dates, guests } });
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Slideshow Hero Section */}
      <div className="relative h-[550px] overflow-hidden bg-slate-900">
        {ROOMS.slice(0, 3).map((room, i) => (
          <div 
            key={room.id} 
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${i === slide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
          >
            <img src={room.img} className="w-full h-full object-cover opacity-60" alt={room.name} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
              <span className="bg-blue-600 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
                {room.type} Collection
              </span>
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 drop-shadow-2xl">
                {room.name}
              </h1>
              <p className="text-lg md:text-xl font-light text-slate-200 max-w-2xl">
                Experience the pinnacle of Kenyan luxury. Book your exclusive escape today.
              </p>
            </div>
          </div>
        ))}
        {/* Slide Indicators */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
          {[0, 1, 2].map(i => (
            <div key={i} className={`h-1.5 w-8 rounded-full transition-all ${i === slide ? 'bg-blue-600 w-12' : 'bg-white/30'}`} />
          ))}
        </div>
      </div>

      {/* Modern Search/Filter Bar */}
      <div className="max-w-6xl mx-auto -mt-16 px-4 relative z-30">
        <div className="bg-white p-8 rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-4 gap-6 items-end border border-slate-100">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-2"><Calendar size={14}/> Check In</label>
            <input 
              type="date" 
              className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm" 
              onChange={e => setDates({...dates, in: e.target.value})} 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-2"><Calendar size={14}/> Check Out</label>
            <input 
              type="date" 
              className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm" 
              onChange={e => setDates({...dates, out: e.target.value})} 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-2"><Users size={14}/> Guests</label>
            <select 
              className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm appearance-none" 
              onChange={e => setGuests(parseInt(e.target.value))}
            >
              {[...Array(10)].map((_, i) => <option key={i+1} value={i+1}>{i+1} Guest{i > 0 ? 's' : ''}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-2"><Search size={14}/> Room Search</label>
            <input 
              type="text" 
              placeholder="Search Luxury, Family..." 
              className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Dynamic Room Listing */}
      <div className="max-w-7xl mx-auto py-24 px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-serif font-bold text-slate-900">Available Accommodations</h2>
          <div className="h-1 w-20 bg-blue-600 mt-3 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredRooms.map(room => (
            <div key={room.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <img src={room.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={room.name} />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-bold text-blue-600 uppercase tracking-tighter shadow-sm">
                  {room.type}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {room.name}
                </h3>
                <p className="text-3xl font-black text-slate-800 mt-auto mb-8">
                  ${room.price} <span className="text-xs font-normal text-slate-400">USD/Night</span>
                </p>
                
                <button 
                  onClick={() => handleBook(room)}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-200"
                >
                  Reserve Now <ArrowRight size={18}/>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 italic">No rooms found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;