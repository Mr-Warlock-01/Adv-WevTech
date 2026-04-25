"use client";

import { useState, use } from "react";
import Footer from "@/component/footer";
import Header from "@/component/header";
import Sidebar from "@/component/sidebar";
import { 
  Power, Mail, Store, Image as ImageIcon, Info, 
  MapPin, CreditCard, Smartphone, Save, Lock, AlertCircle 
} from 'lucide-react';

// Updated Reusable Input Component with Error Handling
const FormField = ({ label, icon: Icon, error, ...props }: any) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
      {Icon && <Icon size={16} className={error ? "text-red-400" : "text-slate-400"} />}
      {label}
    </label>
    {props.type === "textarea" ? (
      <textarea 
        {...props} 
        className={`w-full border rounded-xl px-4 py-3 text-slate-700 transition-all outline-none resize-none ${
          error 
            ? "border-red-500 focus:ring-4 focus:ring-red-500/10" 
            : "border-slate-200 focus:ring-4 focus:ring-pink-500/10 focus:border-[#f82c77]"
        }`}
      />
    ) : (
      <input 
        {...props} 
        className={`w-full border rounded-xl px-4 py-3 text-slate-700 transition-all outline-none ${
          error 
            ? "border-red-500 focus:ring-4 focus:ring-red-500/10" 
            : "border-slate-200 focus:ring-4 focus:ring-pink-500/10 focus:border-[#f82c77]"
        }`}
      />
    )}
    {error && (
      <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
        <AlertCircle size={12} /> {error}
      </p>
    )}
  </div>
);

export default function Profile({ params }: { params: Promise<{ name: string }>}){
  const { name } = use(params);
  const displayName = decodeURIComponent(name);
  
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    email: "xxx@gmail.com",
    restaurantName: displayName,
    bannerUrl: "",
    description: "",
    address: "",
    bankAccount: "",
    bkash: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateProfile = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  let newErrors: Record<string, string> = {};
    setErrors(newErrors);
  // name
  if (!formData.restaurantName.trim()) {
    newErrors.restaurantName = "Name is required.";
  } else if (formData.restaurantName.length > 45) {
    newErrors.restaurantName = "Max 45 characters allowed.";
  }

  // email
  if (!formData.email) {
    newErrors.email = "Email is required.";
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    newErrors.email = "Invalid email format.";
  } else if (formData.email.length > 30) {
    newErrors.email = "Max 30 characters allowed.";
  }

  // description (optional)
  if (formData.description && formData.description.length > 100) {
    newErrors.description = "Max 100 characters allowed.";
  }

  // address
  if (!formData.address.trim()) {
    newErrors.address = "Address is required.";
  } else if (formData.address.length > 100) {
    newErrors.address = "Max 100 characters allowed.";
  }

  // bkash (optional)
  if (
    formData.bkash &&
    !/^(?:\+88)?01[0-9]{9}$/.test(formData.bkash)
  ) {
    newErrors.bkash = "Invalid Bangladesh phone number.";
  }

  // bank account (optional)
  if (formData.bankAccount) {
    if (!/^\d+$/.test(formData.bankAccount)) {
      newErrors.bankAccount = "Must be numeric.";
    } else if (formData.bankAccount.length < 10) {
      newErrors.bankAccount = "Minimum 10 digits required.";
    }
  }


  if (Object.keys(newErrors).length === 0) {
    alert("Profile updated successfully!");
  }
};

  const validatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    let passErrors: Record<string, string> = {};

    if (formData.newPassword.length < 6) passErrors.newPassword = "Password must be at least 6 characters.";
    if (formData.newPassword !== formData.confirmPassword) {
      passErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(prev => ({ ...prev, ...passErrors }));
    if (Object.keys(passErrors).length === 0) {
      alert("Password changed successfully!");
    }
  };

  return (
    <>
    <Header name={displayName} />
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">   
      <div className="flex flex-1">
        <aside className="w-64 hidden md:block bg-white border-r border-slate-200">
          <Sidebar name={displayName} />
        </aside>
        
        <main className="flex-1 p-8 md:p-12 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Restaurant Profile</h1>
                <p className="text-slate-500 mt-1">Manage your shop details and operational status</p>
              </div>
              <button type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg"
                style={{
                  backgroundColor: isOpen ? "#16a34a" : "#dc2626",
                  boxShadow: isOpen ? "0 10px 15px -3px rgba(134, 239, 172, 0.6)" : "0 10px 15px -3px rgba(252, 165, 165, 0.6)",
                }}
              >
                {isOpen ? "Close Shop" : "Open Shop"}
              </button>
            </header>

            <div className="space-y-8">
              <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-8">
                  <div className="flex flex-col sm:flex-row items-center gap-6 mb-10 pb-10 border-b border-slate-100">
                    <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200" className="w-28 h-28 rounded-2xl object-cover border-4 border-white shadow-md" alt="profile" />
                    <div className="text-center sm:text-left">
                      <span className={`px-4 py-1 rounded-full text-xs font-bold border uppercase ${isOpen ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                        {isOpen ? 'Online' : 'Currently Closed'}
                      </span>
                    </div>
                  </div>
                  <form className="space-y-6" onSubmit={validateProfile}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField label="Business Email" icon={Mail} name="email" value={formData.email} onChange={handleChange} error={errors.email} />
                      <FormField label="Restaurant Name" icon={Store} name="restaurantName" value={formData.restaurantName} onChange={handleChange} error={errors.restaurantName} />
                    </div>

                    <FormField label="Banner Image URL" icon={ImageIcon} name="bannerUrl" value={formData.bannerUrl} onChange={handleChange} />
                    <FormField label="Restaurant Description" icon={Info} type="textarea" name="description" rows={3} value={formData.description} onChange={handleChange} />
                    <FormField label="Restaurant Address" icon={MapPin} name="address" value={formData.address} onChange={handleChange} error={errors.address} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 rounded-2xl">
                      <FormField label="Bank Account" icon={CreditCard} name="bankAccount" placeholder="0000-0000-0000" value={formData.bankAccount} onChange={handleChange} error={errors.bankAccount} />
                      <FormField label="bKash Number" icon={Smartphone} name="bkash" placeholder="017XXXXXXXX" value={formData.bkash} onChange={handleChange} error={errors.bkash} />
                    </div>

                    <button type="submit" className="w-full bg-[#f82c77] hover:bg-[#d91b61] text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-all shadow-lg active:scale-[0.98]">
                      <Save size={20} /> Update Restaurant Profile
                    </button>
                  </form>
                </div>
              </section>

              <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3 mb-8">
                  <div className="p-2 bg-pink-50 rounded-lg text-[#f82c77]"><Lock size={22} /></div>
                  Security & Password
                </h2>

                <form className="space-y-6" onSubmit={validatePassword}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="New Password" type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} error={errors.newPassword} />
                    <FormField label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />
                  </div>
                  <button type="submit" className="w-full sm:w-auto px-8 bg-slate-900 hover:bg-black text-white py-3.5 rounded-xl font-semibold transition-all">
                    Update Password
                  </button>
                </form>
              </section>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
    </>
  );
}
