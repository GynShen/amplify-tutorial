import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, LoginFormSchema } from "./types/auth-types";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useLocalStorage } from "@uidotdev/usehooks";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function LoginComponent() {
  const navigate = useNavigate();
  const loginForm = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [_, setUserId] = useLocalStorage("userId", null);

  const onSubmit = async (values: LoginFormSchema) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, {
        userName: values.username,
        userPassword: values.password,
      });

      if (response.data.code === 1) {
        toast("Success", {
          description: "Login successful",
        });
        setUserId(response.data.data);
        navigate("/");
        return;
      } else if (response.data.msg === "Wrong password") {
        toast("Error", {
          description: "Password or Username is incorrect",
        });
        return;
      }
      throw Error("Error signing in");
    } catch (error) {
      console.log(error);
      toast("Error", {
        description: "Error signing in. Please try again later",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-gray-500">Please login to your account</p>
        </div>

        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={loginForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full uppercase">
              Login
            </Button>
          </form>
        </Form>
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <a href="/auth/register" className="text-blue-600 hover:underline">
            Register here
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
