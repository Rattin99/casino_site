import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const Dashboard = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");

  if (!token) {
    redirect("/admin-panel");
  }

  try {
    jwt.verify(token.value, JWT_SECRET);
  } catch (err) {
    redirect("/admin-panel");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-800">Admin Dashboard</span>
            </div>
            <div className="flex items-center">
               <form action={async () => {
                 'use server';
                 const { cookies } = await import("next/headers");
                 (await cookies()).delete('admin_token');
                 const { redirect } = await import("next/navigation");
                 redirect('/admin-panel');
               }}>
                <button type="submit" className="text-gray-600 hover:text-red-500 font-medium">
                  Logout
                </button>
               </form>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <h2 className="text-2xl text-gray-400 font-semibold">
              Welcome to the Admin Dashboard
            </h2>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
