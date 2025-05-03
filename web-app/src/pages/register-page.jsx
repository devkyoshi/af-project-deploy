import { useEffect, useState } from "react";
import { Button, Form, Input, Alert } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context.jsx";
import { registerUser } from "../services/auth-service";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      await registerUser(values.email, values.password);
    } catch (err) {
      setError(getErrorMessage(err.code));
      setTimeout(() => setError(""), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getErrorMessage = (code) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "Email already exists";
      case "auth/invalid-email":
        return "Invalid email address";
      case "auth/weak-password":
        return "Password should be at least 6 characters";
      default:
        return "Registration failed. Please try again";
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
          <img src="/logo.png" alt="Logo" className="w-16 h-16 mx-auto" />
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            NationScope
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Create your account to get started
          </p>
        </div>

        {error && (
          <div className={"pb-2"}>
            <Alert
              id="error-alert"
              message={error}
              type="error"
              showIcon
              className="animate-in fade-in"
            />
          </div>
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
                id="email"
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
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
            >
              <Input.Password
                id="password"
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
              Create Account
            </Button>
          </Form>

          <div className="text-center text-sm text-gray-600 dark:text-gray-300 space-y-2 mt-4">
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/auth/login")}
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
