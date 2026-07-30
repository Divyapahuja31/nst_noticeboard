import { signIn } from "../auth"
import { isRedirectError } from "next/dist/client/components/redirect-error"

export function SignIn() {
  return (
    <form
      action={async (formData) => {
        "use server"
        const email = formData.get("email")
        if (!email || typeof email !== "string" || !email.trim()) {
          return
        }
        try {
          await signIn("resend", formData)
        } catch (error) {
          if (isRedirectError(error)) {
            throw error
          }
          console.error("Sign in error:", error)
          throw error
        }
      }}
    >
      <input
        type="email"
        name="email"
        placeholder="name@example.com"
        required
      />
      <button type="submit">Signin with Resend</button>
    </form>
  )
}