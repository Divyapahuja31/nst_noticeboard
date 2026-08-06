"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

interface LoginFormProps {
  callbackUrl: string | undefined;
  errorMessage?: string;
}

export default function LoginForm({
  errorMessage: initialErrorMessage,
  callbackUrl,
}: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    initialErrorMessage
  );
  const [isLoadingCredentials, setIsLoadingCredentials] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingCredentials(true);
    setErrorMessage(undefined);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: callbackUrl || "/",
      });

      if (res?.error) {
        if (
          res.error === "CredentialsSignin" ||
          res.error === "CallbackRouteError"
        ) {
          setErrorMessage("Invalid email or password.");
        } else {
          setErrorMessage("An error occurred during authentication.");
        }
      } else if (res?.ok || res?.url) {
        window.location.href = res?.url || callbackUrl || "/";
      }
    } catch {
      setErrorMessage("An error occurred during authentication.");
    } finally {
      setIsLoadingCredentials(false);
    }
  };

  const handleGoogleSubmit = async () => {
    setIsLoadingGoogle(true);
    setErrorMessage(undefined);
    try {
      await signIn("google", {
        callbackUrl: callbackUrl || "/",
      });
    } catch {
      setErrorMessage("An error occurred during authentication.");
      setIsLoadingGoogle(false);
    }
  };

  return (
    <div className="w-full max-w-100 mx-auto">
      {/* Brand Logo */}
      <div className="flex justify-center mb-6">
        <svg width="48" height="48" viewBox="0 0 121 121">
          <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g id="11" transform="translate(-85.000000, -444.000000)">
              <g id="Group" transform="translate(85.000000, 444.000000)">
                <path
                  d="M121,0 L121,60.5 C121,93.9132274 93.9132274,121 60.5,121 C27.0867726,121 0,93.9132274 0,60.5 C0,27.0867726 27.0867726,0 60.5,0 L60.5,0 L121,0 Z"
                  id="Combined-Shape"
                  fill="#6BA9E1"
                ></path>
                <path
                  d="M29.9991305,9.00050709 L29.9991305,112.999493 C12.0495586,102.530897 0,83.1625463 0,61 C0,38.8374537 12.0495586,19.4691028 29.9991305,9.00050709 Z"
                  id="Combined-Shape"
                  fill="#719DE6"
                ></path>
                <path
                  d="M61,0 L61,121 C49.6896363,121 39.0947971,117.976087 30.0000026,112.702639 L30.0000026,8.2973615 C38.8225978,3.18174225 49.0567914,0.18302114 59.986416,0.00810527147 L61,0 Z"
                  id="Combined-Shape"
                  fill="#52D2CE"
                ></path>
                <path
                  d="M60.4333989,0 L109.000019,97.0028949 C103.306307,104.571975 95.8797728,110.766798 87.3086261,114.999938 L33.0002978,6.5288324 C40.9599303,2.49511474 49.9294828,0.161945428 59.4295193,0.00812199514 L60.4333989,0 Z"
                  id="Combined-Shape"
                  fill="#49E1C7"
                ></path>
                <path
                  d="M121,0 L121,60.4437296 C121,82.9590366 108.515898,102.599042 90.0012292,112.999886 L90,0 L121,0 Z"
                  id="Combined-Shape"
                  fill="#56CAD1"
                ></path>
              </g>
            </g>
          </g>
        </svg>
      </div>

      {/* Header */}
      <h1 className="text-2xl font-bold text-center text-zinc-900 dark:text-zinc-50 tracking-tight">
        Sign in to your account
      </h1>
      <p className="text-sm text-center text-zinc-500 dark:text-zinc-400 mt-1.5 mb-8">
        Enter your email and password to continue.
      </p>

      {errorMessage && (
        <div className="mb-6 p-3 rounded-[5px] text-xs font-medium bg-red-50 text-red-600 border border-red-200 dark:bg-red-950/60 dark:text-red-400 dark:border-red-900/50 text-center">
          {errorMessage}
        </div>
      )}

      {/* Primary Form */}
      <form onSubmit={handleCredentialsSubmit} className="space-y-4">
        {/* Email Input */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5"
          >
            Email*
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-3.5 py-2.5 text-sm rounded-[5px] border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#0673f9]/30 focus:border-[#0673f9] transition"
          />
        </div>

        {/* Password Input */}
        <div>
          <label
            htmlFor="password"
            className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5"
          >
            Password*
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-3.5 py-2.5 text-sm rounded-[5px] border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#0673f9]/30 focus:border-[#0673f9] transition"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoadingCredentials}
            className="w-full px-4 py-3 text-sm font-semibold text-white bg-[#0673f9] hover:bg-[#0560d0] active:bg-[#044eb0] rounded-[5px] shadow-md transition active:scale-[0.99] cursor-pointer disabled:opacity-50"
          >
            {isLoadingCredentials ? "Signing in..." : "Continue"}
          </button>
        </div>

        {/* OR Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-zinc-950 px-2 text-zinc-400 font-semibold tracking-wider">
              OR
            </span>
          </div>
        </div>

        {/* Social Login Button: Google */}
        <div>
          <button
            type="button"
            disabled={isLoadingGoogle}
            onClick={async () => {
              setIsLoadingGoogle(true);
              try {
                await handleGoogleSubmit();
              } finally {
                setIsLoadingGoogle(false);
              }
            }}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-zinc-700 dark:text-zinc-200 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-[5px] hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-[0.99] transition cursor-pointer disabled:opacity-50 shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>
              {isLoadingGoogle ? "Signing in..." : "Sign in with Google"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
