import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Contact = () => (
  <div className="max-w-4xl mx-auto py-24 px-6 text-center">
    <h1 className="text-4xl font-serif font-bold mb-16">Connect With Us</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
        <Phone size={32} className="mx-auto text-blue-600 mb-6" />
        <h4 className="font-bold mb-2">Phone</h4>
        <p className="text-slate-500">+254 112 432 106</p>
      </div>
      <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
        <Mail size={32} className="mx-auto text-blue-600 mb-6" />
        <h4 className="font-bold mb-2">Email</h4>
        <p className="text-slate-500 text-sm">info@MzalendoLuxe.co.ke</p>
      </div>
      <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
        <MapPin size={32} className="mx-auto text-blue-600 mb-6" />
        <h4 className="font-bold mb-2">Location</h4>
        <p className="text-slate-900 font-bold">Nairobi, Kenya</p>
      </div>
    </div>
  </div>
);

export default Contact;