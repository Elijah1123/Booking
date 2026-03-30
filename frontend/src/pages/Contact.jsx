const Contact = () => (
  <div className="max-w-2xl mx-auto py-24 px-6">
    <h1 className="text-4xl font-serif mb-10 text-center">Inquiries</h1>
    <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-50">
      <form className="space-y-6">
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase">Full Name</label>
          <input type="text" className="w-full border-b border-gray-200 py-2 outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase">Email</label>
          <input type="email" className="w-full border-b border-gray-200 py-2 outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase">Message</label>
          <textarea rows="4" className="w-full border-b border-gray-200 py-2 outline-none focus:border-blue-500"></textarea>
        </div>
        <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-100 transition hover:bg-blue-700">Send Inquiry</button>
      </form>
    </div>
  </div>
);
export default Contact;