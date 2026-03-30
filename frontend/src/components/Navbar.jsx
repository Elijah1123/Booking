import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { LogOut, X, User, LayoutDashboard, ShieldCheck } from 'lucide-react';

const Navbar = ({ user, setUser, onLogout, isAdmin }) => {
  const navigate = useNavigate(); // Initialize the redirect function
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    const lowEmail = email.toLowerCase().trim();
    
    // --- ADMIN SPECIFIC CHECK ---
    // Using your specific credentials: elijahmzalendo659@gmail.com / happymood
    if (lowEmail === "elijahmzalendo659@gmail.com" && password === "happymood") {
      const adminUser = { 
        name: "Elijah Admin", 
        email: lowEmail, 
        role: 'admin' 
      };
      
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      setUser(adminUser);
      setIsAuthOpen(false);
      
      // SUCCESS: Force redirect to Admin Dashboard
      navigate('/admin'); 
      return;
    }

    // --- REGULAR USER LOGIC ---
    const userKey = `user_data_${lowEmail}`;
    if (isSignup) {
      const newUser = { name, email: lowEmail, password };
      localStorage.setItem(userKey, JSON.stringify(newUser));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      setUser(newUser);
      setIsAuthOpen(false);
      navigate('/'); // Standard users go to Home
    } else {
      const storedData = localStorage.getItem(userKey);
      if (storedData) {
        const foundUser = JSON.parse(storedData);
        if (foundUser.password === password) {
          localStorage.setItem('currentUser', JSON.stringify(foundUser));
          setUser(foundUser);
          setIsAuthOpen(false);
          navigate('/');
        } else {
          alert("Invalid Password");
        }
      } else {
        alert("Account not found. Please Sign Up.");
      }
    }
  };

  return (
    <nav className="bg-white border-b px-8 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-10">
        <Link to="/" className="text-2xl font-black text-slate-900 tracking-tighter">
          MZALENDO<span className="text-blue-600">LUXE</span>
        </Link>
        
        <div className="hidden md:flex gap-8 items-center">
          <Link to="/" className="text-sm font-bold text-slate-500 hover:text-blue-600">Home</Link>
          <Link to="/about" className="text-sm font-bold text-slate-500 hover:text-blue-600">About Us</Link>
          <Link to="/contact" className="text-sm font-bold text-slate-500 hover:text-blue-600">Contact</Link>
          
          {/* Dashboard Link appears only for the Admin */}
          {isAdmin && (
            <Link to="/admin" className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-xs font-black border border-blue-100 animate-pulse">
              <LayoutDashboard size={14}/> ADMIN PANEL
            </Link>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Logged in as</p>
              <p className="text-sm font-bold text-slate-900">{user.name}</p>
            </div>
            <button onClick={onLogout} className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition">
              <LogOut size={18}/>
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setIsAuthOpen(true)} 
            className="bg-slate-900 text-white px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-600 transition-all"
          >
            Sign In
          </button>
        )}
      </div>

      {/* Auth Modal */}
      {isAuthOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 relative shadow-2xl border border-white">
            <button onClick={() => setIsAuthOpen(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900"><X/></button>
            
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShieldCheck size={32}/>
              </div>
              <h2 className="text-2xl font-serif font-bold text-slate-900">
                {isSignup ? 'Create Account' : 'Portal Access'}
              </h2>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {isSignup && (
                <input required type="text" placeholder="Full Name" className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:border-blue-600" 
                onChange={e => setName(e.target.value)} />
              )}
              <input required type="email" placeholder="Email Address" className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:border-blue-600" 
              onChange={e => setEmail(e.target.value)} />
              <input required type="password" placeholder="Password" className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:border-blue-600" 
              onChange={e => setPassword(e.target.value)} />
              
              <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all">
                {isSignup ? 'Register Now' : 'Authorize Login'}
              </button>
            </form>
            
            <p className="text-center mt-8 text-sm text-slate-500">
              {isSignup ? "Have an account?" : "Need admin access?"} 
              <button onClick={() => setIsSignup(!isSignup)} className="ml-2 text-blue-600 font-bold hover:underline">
                {isSignup ? 'Login here' : 'Sign up'}
              </button>
            </p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;