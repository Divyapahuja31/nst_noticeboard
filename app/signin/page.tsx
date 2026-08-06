import LoginForm from "@/components/LoginForm";


export default async function SignInPage({searchParams}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const { callbackUrl, error } = await searchParams;

  let errorMessage: string | undefined;
  if (error) {
    if (error === "CredentialsSignin") {
      errorMessage = "Invalid email or password.";
    } else if (error === "AccessDenied") {
      errorMessage = "Access denied. Account not registered or authorized.";
    } else {
      errorMessage = "An error occurred during authentication.";
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white dark:bg-zinc-950">
      {/* Top Banner (Mobile) / Left Side Hero (Desktop) */}
      <div
        className="w-full md:w-1/2 h-56 sm:h-72 md:h-auto min-h-55 md:min-h-screen bg-cover bg-center relative flex items-center justify-center p-6"
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
          callbackUrl={callbackUrl}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
}
