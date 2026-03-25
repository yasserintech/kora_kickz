import { ResetPasswordFlow } from "@/components/reset-password-flow"

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen bg-white py-16">
      <div className="container mx-auto space-y-8 px-4">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-600">Password Recovery</p>
          <h1 className="mt-4 text-4xl font-extrabold text-black md:text-5xl">Reset Your Password</h1>
          <p className="mt-4 text-lg text-gray-700">
            Parents can request a password reset email or set a new password after opening their secure recovery link.
          </p>
        </div>

        <ResetPasswordFlow />
      </div>
    </main>
  )
}
