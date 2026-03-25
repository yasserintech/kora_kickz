import { ParentDashboard } from "@/components/parent-dashboard"

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-white py-16">
      <div className="container mx-auto space-y-8 px-4">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-600">Parent Dashboard</p>
          <h1 className="mt-4 text-4xl font-extrabold text-black md:text-5xl">View Your Family's Registration Activity</h1>
          <p className="mt-4 text-lg text-gray-700">
            Parents can sign in to review registered classes, payment status, and any waiting list entries connected to their account.
          </p>
        </div>

        <ParentDashboard />
      </div>
    </main>
  )
}
