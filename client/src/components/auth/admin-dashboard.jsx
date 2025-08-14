import { LogOut, Settings, Mail, User } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Admin Dashboard Component
const AdminDashboard = ({ handleLogout, success, adminData }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Mechanical Engineering Club Management
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium text-gray-900">{adminData?.name}</p>
              <p className="text-sm text-gray-600">{adminData?.email}</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">
              {success}
            </AlertDescription>
          </Alert>
        )}

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-600" />
                Manage Blogs
              </CardTitle>
              <CardDescription>
                Create, edit, and publish blog posts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Go to Blogs</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-green-600" />
                Sponsor Requests
              </CardTitle>
              <CardDescription>
                Review and manage sponsorship requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                View Requests
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-purple-600" />
                Admin Settings
              </CardTitle>
              <CardDescription>
                Manage admin accounts and settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="secondary">
                Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Quick Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-medium text-gray-600">Total Blogs</h3>
              <p className="text-2xl font-bold text-blue-600">12</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-medium text-gray-600">Pending Requests</h3>
              <p className="text-2xl font-bold text-orange-600">5</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-medium text-gray-600">Active Sponsors</h3>
              <p className="text-2xl font-bold text-green-600">8</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-medium text-gray-600">Club Members</h3>
              <p className="text-2xl font-bold text-purple-600">150</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
