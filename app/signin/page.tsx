import { redirect } from "next/navigation";
import { signIn } from "../../auth";
import { AuthError } from "next-auth";
import LoginForm from "@/components/LoginForm";

const SIGNIN_ERROR_URL = "/signin";

export default async function SignInPage(props: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const searchParams = await props.searchParams;

  const handleCredentialsSubmit = async (formData: FormData) => {
    "use server";
    try {
      await signIn("credentials", formData);
    } catch (error) {
      if (error instanceof AuthError) {
        return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
      }
      throw error;
    }
  };

  const handleGoogleSubmit = async () => {
    "use server";
    try {
      await signIn("google", {
        redirectTo: searchParams?.callbackUrl ?? "",
      });
    } catch (error) {
      if (error instanceof AuthError) {
        return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
      }
      throw error;
    }
  };

  let errorMessage: string | undefined;
  if (searchParams?.error) {
    if (searchParams.error === "CredentialsSignin") {
      errorMessage = "Invalid email or password.";
    } else if (searchParams.error === "AccessDenied") {
      errorMessage = "Access denied. Account not registered or authorized.";
    } else {
      errorMessage = "An error occurred during authentication.";
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white dark:bg-zinc-950">
      {/* Top Banner (Mobile) / Left Side Hero (Desktop) */}
      <div
        className="w-full md:w-1/2 h-56 sm:h-72 md:h-auto min-h-[220px] md:min-h-screen bg-cover bg-center relative flex items-center justify-center p-6"
        style={{ backgroundImage: "url('/background.png')" }}
      >
        {/* Soft overlay */}
        <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px]" />

        {/* Banner Text / Branding */}
        <div className="relative z-10 text-center text-white max-w-sm">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight drop-shadow-md">
            Noticeboard Portal
          </h2>
          <p className="text-xs sm:text-sm text-zinc-200 mt-2 font-medium drop-shadow">
            Stay updated with official announcements, policies, and notifications.
          </p>
        </div>
      </div>

      {/* Form Section (Bottom on Mobile / Right Side on Desktop) */}
      <div className="w-full md:w-1/2 flex-1 flex items-center justify-center p-6 sm:p-10 md:p-12 bg-white dark:bg-zinc-950">
        <LoginForm
          onCredentialsSubmit={handleCredentialsSubmit}
          onGoogleSubmit={handleGoogleSubmit}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
}
