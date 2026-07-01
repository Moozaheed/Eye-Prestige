"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, Lock, Mail, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0c0a] text-neutral-100 px-4">
      {/* Glow background accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[420px] bg-[#141311] border border-white/[0.06] rounded-2xl p-8 shadow-2xl relative z-10">
        
        {/* Brand Logo header */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative h-11 w-11 rounded-xl overflow-hidden mb-4 bg-neutral-950 p-2 flex items-center justify-center border border-white/[0.08]">
            <Image
              src="/images/Logo Icon White.png"
              alt="EYE PRESTIGE Icon"
              width={26}
              height={26}
              className="object-contain"
            />
          </div>
          <h1 className="font-serif text-xl tracking-wider uppercase text-white font-[480]">Eye Prestige</h1>
          <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-[0.15em] mt-1">Admin Gatekeeper</p>
        </div>

        {/* Error message Alert */}
        {error && (
          <div className="mb-5 p-3 rounded-lg bg-red-950/40 border border-red-900/50 text-red-200 text-xs leading-relaxed text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10.5px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500">
                <Mail size={15} />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@eyeprestige.com"
                className="w-full bg-neutral-950 border border-white/[0.08] hover:border-white/20 focus:border-white focus:ring-1 focus:ring-white rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-neutral-600 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10.5px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500">
                <Lock size={15} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-neutral-950 border border-white/[0.08] hover:border-white/20 focus:border-white focus:ring-1 focus:ring-white rounded-xl py-3 pl-11 pr-11 text-sm text-white placeholder:text-neutral-600 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-white hover:bg-neutral-200 disabled:bg-neutral-800 disabled:text-neutral-500 text-neutral-950 text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
