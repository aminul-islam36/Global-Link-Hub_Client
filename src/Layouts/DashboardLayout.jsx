import { Link, Outlet } from "react-router-dom";
import Navber from "../Components/Navber";
import { Download, ExternalLink, User } from "lucide-react";

const DashboardLayout = () => {
  return (
    <div className="max-w-7xl mx-auto bg-base-100">
      <Navber />
      <div className="min-h-screen flex flex-col lg:flex-row ">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-base-100 lg:border-r border-gray-200 p-5">
          <h2 className="text-xl font-bold mb-6">Dashboard</h2>

          <ul className="space-y-3">
            <li>
              <Link
                to="/dashboard/profile"
                className="hover:text-accent flex gap-2 items-center"
              >
                <User /> <span>Profile</span>
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/exportsGraph"
                className="hover:text-accent flex gap-2 items-center"
              >
                <ExternalLink /> Exports
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/importsGraph"
                className="hover:text-accent flex gap-2 items-center"
              >
                <Download /> imports
              </Link>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
