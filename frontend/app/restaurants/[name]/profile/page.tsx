"use client";

import { useState, use } from "react";
import { z } from "zod";
import Footer from "@/component/restaurants/footer";
import Header from "@/component/restaurants/header";
import Sidebar from "@/component/restaurants/sidebar";
import { 
  Power, Mail, Store, Image as ImageIcon, Info, 
  MapPin, CreditCard, Smartphone, Save, Lock, AlertCircle 
} from 'lucide-react';
import { FormField } from "@/component/restaurants/form_field";


const profileSchema = z.object({
  restaurantName: z.string()
    .nonempty("Name is required.")
    .max(45, "Max 45 characters allowed."),
  
  email: z.string()
    .nonempty("Email is required.")
    .email("Invalid email format.")
    .max(30, "Max 30 characters allowed."),

  bannerUrl: z.string().optional(),

  description: z.string()
    .max(100, "Max 100 characters allowed.")
    .optional(),

  address: z.string()
    .nonempty("Address is required.")
    .max(100, "Max 100 characters allowed."),
    
  bkash: z.string().superRefine((val, ctx) =>{
    if (val==="") return;
    if (!/^(?:\+88)?01[0-9]{9}$/.test(val)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid phone number." });
    }
  }),
  
  bankAccount: z.string().superRefine((val, ctx) => {
    if (val === "") return;
    if (!/^\d+$/.test(val)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Must be numeric." });
    } else if (val.length < 10) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Minimum 10 digits required." });
    }
  })
});


const passwordSchema = z.object({
  newPassword: z.string()
    .min(6, "Password must be at least 6 characters."),

  confirmPassword: z.string() 
}).refine((data) =>
    data.newPassword === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match."
});

///////////////////////////////////////////////////////////////////////////////

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
    // Clear error for the field being typed in
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear previous profile-related errors before validating
    const currentErrors = { ...errors };
    const profileFields = ["restaurantName", "email", "bannerUrl", "description", "address", "bkash", "bankAccount"];
    profileFields.forEach(field => delete currentErrors[field]);

    const result = profileSchema.safeParse(formData);

    if (!result.success) {
      // Changed .errors to .issues and explicitly typed 'err' as z.ZodIssue
      result.error.issues.forEach((err: z.ZodIssue) => {
        const key = err.path[0] as string;
        if (!currentErrors[key]) {
          currentErrors[key] = err.message; 
        }
      });
      setErrors(currentErrors);
    } else {
      setErrors(currentErrors);
      alert("Profile updated successfully!");
    }
  };

  const validatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous password-related errors before validating
    const currentErrors = { ...errors };
    ["newPassword", "confirmPassword"].forEach(field => delete currentErrors[field]);

    const result = passwordSchema.safeParse(formData);

    if (!result.success) {
      // Changed .errors to .issues and explicitly typed 'err' as z.ZodIssue
      result.error.issues.forEach((err: z.ZodIssue) => {
        const key = err.path[0] as string;
        if (!currentErrors[key]) {
          currentErrors[key] = err.message;
        }
      });
      setErrors(currentErrors);
    } else {
      setErrors(currentErrors);
      // Reset password fields on success
      setFormData(prev => ({ ...prev, newPassword: "", confirmPassword: "" }));
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
                    <FormField label="Restaurant Description" icon={Info} type="textarea" name="description" rows={3} value={formData.description} onChange={handleChange} error={errors.description} />
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
                   <button type="submit" className="w-full bg-slate-900 hover:bg-black text-white px-8   py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-all shadow-lg active:scale-[0.98]">
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