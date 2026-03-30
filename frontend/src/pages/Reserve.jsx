import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Lock, ChevronRight } from 'lucide-react';

const Reserve = ({ user }) => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !user) return <div className="p-20 text-center">Unauthorized. Please select a room and login.</div>;

  const { room, dates, guests } = state;
  const nights = Math.max(1, Math.ceil(Math.abs(new Date(dates.out) - new Date(dates.in)) / (1000 * 60 * 60 * 24)));
  const total = nights * room.price;

  const codes = ["+254", "+1", "+44", "+91", "+255", "+256", "+27", "+234", "+20", "+33", "+49"];

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-1 bg-slate-900 text-white p-8 rounded-3xl h-fit">
        <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">Stay Summary</h2>
        <div className="space-y-3 text-sm opacity-70 mb-8">
          <div className="flex justify-between"><span>Room</span> <span>{room.name}</span></div>
          <div className="flex justify-between"><span>Stay</span> <span>{nights} Night(s)</span></div>
          <div className="flex justify-between"><span>Price</span> <span>${room.price} / Night</span></div>
        </div>
        <div className="bg-blue-600 p-4 rounded-xl flex justify-between items-center font-bold">
          <span>Total Amount</span>
          <span className="text-2xl">${total} USD</span>
        </div>
      </div>

      <div className="lg:col-span-2 bg-white p-8 rounded-3xl border shadow-sm">
        <h2 className="text-2xl font-bold mb-8">Checkout Details</h2>
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Booking Confirmed!"); navigate('/'); }}>
          <div className="grid grid-cols-2 gap-4">
            <input required defaultValue={user.name} type="text" placeholder="Full Name" className="p-4 bg-slate-50 rounded-xl outline-none border" />
            <input required defaultValue={user.email} type="email" placeholder="Email" className="p-4 bg-slate-50 rounded-xl outline-none border" />
          </div>
          <div className="flex gap-2">
            <select className="bg-slate-50 border p-4 rounded-xl outline-none w-28">
              {codes.map(c => <option key={c}>{c}</option>)}
            </select>
            <input required type="tel" placeholder="Phone Number" className="w-full p-4 bg-slate-50 rounded-xl outline-none border" />
          </div>
          <div className="p-6 border-2 border-blue-50 rounded-2xl space-y-4">
            <h4 className="font-bold flex items-center gap-2"><CreditCard className="text-blue-600"/> Payment (Visa / Mastercard)</h4>
            <input required type="text" placeholder="Card Number" className="w-full p-4 bg-white rounded-xl outline-none border border-slate-200" />
            <div className="grid grid-cols-2 gap-4">
              <input required type="text" placeholder="MM/YY" className="p-4 bg-white rounded-xl border" />
              <input required type="text" placeholder="CVV" className="p-4 bg-white rounded-xl border" />
            </div>
          </div>
          <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2">
            Pay ${total} USD <ChevronRight size={20}/>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reserve;