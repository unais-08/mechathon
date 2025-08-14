import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SECRET_CODE = import.meta.env.VITE_SECRET_CODE_TO_REGISTER_ADMIN; // Change this to your actual secret

const AdminAuthForm = ({
  error,
  success,
  loginForm,
  registerForm,
  setLoginForm,
  setRegisterForm,
  handleLogin,
  handleRegister,
  loading,
  showPassword,
  setShowPassword,
}) => {
  const [activeTab, setActiveTab] = useState("register");
  const [secretInput, setSecretInput] = useState("");
  const [isSecretVerified, setIsSecretVerified] = useState(false);
  const [secretError, setSecretError] = useState("");

  const handleTabChange = (tab) => {
    if (tab === "login" && !isSecretVerified) {
      setSecretError("Enter the secret code in Register tab first.");
      setActiveTab("register");
      return;
    }
    setSecretError("");
    setActiveTab(tab);
  };

  const handleSecretSubmit = (e) => {
    e.preventDefault();
    if (secretInput === SECRET_CODE) {
      setIsSecretVerified(true);
      setSecretError("");
      setActiveTab("login");
    } else {
      setSecretError("Invalid secret code.");
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Admin Access</CardTitle>
        <CardDescription className="text-center">
          Login or register for admin privileges
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="login"
              data-tab="login"
              onClick={() => handleTabChange("login")}
              disabled={!isSecretVerified}
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="register"
              onClick={() => handleTabChange("register")}
            >
              Register
            </TabsTrigger>
          </TabsList>

          {/* Error/Success Messages */}
          {error && (
            <Alert className="mt-4 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mt-4 border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">
                {success}
              </AlertDescription>
            </Alert>
          )}

          {secretError && (
            <Alert className="mt-4 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                {secretError}
              </AlertDescription>
            </Alert>
          )}

          {/* Register Tab */}
          <TabsContent value="register">
            {!isSecretVerified ? (
              <form onSubmit={handleSecretSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="secret-code">Enter Secret Code</Label>
                  <Input
                    id="secret-code"
                    type="password"
                    placeholder="Secret Code"
                    value={secretInput}
                    onChange={(e) => setSecretInput(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading || !secretInput}
                >
                  {loading ? "Verifying..." : "Verify"}
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={registerForm.name}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        name: e.target.value,
                      })
                    }
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="admin@club.com"
                    value={registerForm.email}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        email: e.target.value,
                      })
                    }
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Password</Label>
                  <Input
                    id="reg-password"
                    type="password"
                    placeholder="Min. 6 characters"
                    value={registerForm.password}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        password: e.target.value,
                      })
                    }
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm your password"
                    value={registerForm.confirmPassword}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    disabled={loading}
                    onKeyDown={(e) => e.key === "Enter" && handleRegister(e)}
                  />
                </div>
                <Button
                  onClick={handleRegister}
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Admin Account"}
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Login Tab */}
          <TabsContent value="login">
            {isSecretVerified ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@club.com"
                    value={loginForm.email}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, email: e.target.value })
                    }
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) =>
                        setLoginForm({
                          ...loginForm,
                          password: e.target.value,
                        })
                      }
                      disabled={loading}
                      onKeyDown={(e) => e.key === "Enter" && handleLogin(e)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <Button
                  onClick={handleLogin}
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </div>
            ) : (
              <div className="text-center text-sm text-gray-500 mt-4">
                Please enter the secret code in the Register tab first.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdminAuthForm;
