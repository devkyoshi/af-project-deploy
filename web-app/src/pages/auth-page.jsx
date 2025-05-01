import { useEffect, useState } from "react";
import { Button, Form, Input, Alert } from "antd";
import { FcGoogle } from "react-icons/fc";
import { loginUser, googleLogin } from "../services/auth-service";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth-context.jsx";

const LoginPage = () => {
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      await loginUser(values.email, values.password);
    } catch (err) {
      setError(getErrorMessage(err.code));
      setTimeout(() => setError(""), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
    } catch (err) {
      setError(getErrorMessage(err.code));
      setTimeout(() => setError(""), 5000);
    }
  };

  // Error message mapping function
  const getErrorMessage = (code) => {
    switch (code) {
      case "auth/invalid-credential":
        return "Invalid email or password";
      case "auth/too-many-requests":
        return "Too many attempts. Please try again later";
      case "auth/popup-closed-by-user":
        return "Google login popup was closed";
      default:
        return "Login failed. Please try again";
    }
  };

  useEffect(() => {
    if (currentUser) {
      const redirectTo = location.state?.from?.pathname || "/dashboard";
      navigate(redirectTo, { replace: true });
    }
  }, [currentUser, navigate, location.state]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900 p-4">
      <div className="w-full max-w-md space-y-6 animate-in fade-in">
        <div className="text-center">
          <img src="/logo.png" alt="Logo" className="w-16 h-16 mx-auto " />
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            NationScope
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Enter your credentials to access your account
          </p>
        </div>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            className="animate-in fade-in"
          />
        )}

        <div className="rounded-xl border bg-white dark:bg-neutral-800 dark:border-neutral-700 p-6 shadow-sm">
          <Form layout="vertical" onFinish={handleSubmit} autoComplete="off">
            <Form.Item
              label={
                <span className="text-sm font-medium dark:text-white">
                  Email
                </span>
              }
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Invalid email address" },
              ]}
            >
              <Input
                placeholder="Enter your email"
                className="rounded-lg h-10 dark:border-neutral-700 dark:text-white dark:bg-neutral-800"
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-sm font-medium dark:text-white">
                  Password
                </span>
              }
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                className="rounded-lg h-10 dark:border-neutral-700 dark:text-white dark:bg-neutral-800"
              />
            </Form.Item>

            <Button
              htmlType="submit"
              block
              loading={isSubmitting}
              className="h-10 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors border-none"
            >
              Sign In
            </Button>
          </Form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-neutral-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-neutral-800 text-gray-500 dark:text-gray-300">
                OR
              </span>
            </div>
          </div>

          <Button
            onClick={handleGoogleLogin}
            block
            className="h-10 rounded-lg flex items-center justify-center gap-2 bg-white dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600 border border-gray-300 dark:border-neutral-600 hover:border-gray-400 font-medium transition-colors"
          >
            <FcGoogle className="w-5 h-5" />
            Continue with Google
          </Button>
        </div>

        {/* <div className="text-center text-sm text-gray-600 dark:text-gray-300 space-y-2">
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            Forgot Password?
          </button>
          <p className="mt-2">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Create account
            </button>
          </p>
        </div>*/}
      </div>
    </div>
  );
};

export default LoginPage;
