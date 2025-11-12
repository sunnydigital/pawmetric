import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Mail, Lock, User, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { PetScopeLogo } from "./petscope-logo";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

interface AuthScreenProps {
  onComplete: () => void;
}

export function AuthScreen({ onComplete }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isLogin) {
        // Login
        await login(email, password);
      } else {
        // Register
        if (!name.trim()) {
          setError("Name is required");
          setIsLoading(false);
          return;
        }
        await register(email, password, name);
      }

      // Success! Move to next screen
      onComplete();
    } catch (err: any) {
      setError(err.message || `Failed to ${isLogin ? "login" : "register"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full gradient-bg relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 right-10 w-40 h-40 rounded-full border-4 border-white animate-pulse"></div>
        <div className="absolute bottom-1/4 left-10 w-32 h-32 rounded-full border-4 border-white animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10 h-full flex flex-col p-8">
        {/* Logo & Header */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {/* Logo */}
            <div className="mb-8 px-8" style={{ marginTop: '-72px' }}>
              <PetScopeLogo variant="vertical" className="h-40 w-auto mx-auto" />
            </div>

            <h1 className="text-white mb-3 font-bold tracking-tight">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-white/80 text-lg font-medium">
              {isLogin ? "Sign in to continue" : "Join PetScope today"}
            </p>
          </motion.div>

          {/* Auth Form */}
          <motion.form
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="w-full max-w-sm space-y-4"
          >
            {/* Name Field (Register only) */}
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  className="w-full h-14 pl-12 bg-white/10 border-2 border-white/30 text-white placeholder:text-white/60 rounded-[100px] focus:bg-white/20 focus:border-white/50"
                  required={!isLogin}
                />
              </div>
            )}

            {/* Email Field */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full h-14 pl-12 bg-white/10 border-2 border-white/30 text-white placeholder:text-white/60 rounded-[100px] focus:bg-white/20 focus:border-white/50"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full h-14 pl-12 bg-white/10 border-2 border-white/30 text-white placeholder:text-white/60 rounded-[100px] focus:bg-white/20 focus:border-white/50"
                required
                minLength={6}
              />
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-500/20 border border-red-500/50 rounded-2xl"
              >
                <p className="text-white text-sm text-center">{error}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-white text-[#111827] hover:bg-white/90 rounded-[100px] text-base shadow-[0_12px_24px_rgba(0,0,0,0.15)] transition-all hover:shadow-[0_16px_32px_rgba(0,0,0,0.2)] hover:-translate-y-1 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  {isLogin ? "Signing in..." : "Creating account..."}
                </>
              ) : (
                <>{isLogin ? "Sign In" : "Create Account"}</>
              )}
            </Button>

            {/* Toggle Login/Register */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                disabled={isLoading}
                className="text-white/80 hover:text-white text-sm font-medium underline"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </motion.form>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-white/60 text-sm leading-relaxed">
            By continuing, you agree to our{" "}
            <button className="text-white underline">Terms</button> and{" "}
            <button className="text-white underline">Privacy Policy</button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
