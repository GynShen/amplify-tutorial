import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from "./types/auth-types";
import { RegisterFormSchema } from "./types/auth-types";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function RegisterComponent() {
  const navigate = useNavigate();
  const registerForm = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: RegisterFormSchema) => {
    try {
      const response = await axios.post(`${API_URL}/users/register`, {
        userName: values.username,
        userPassword: values.password,
      });

      if (response.data.code === 1) {
        toast("Success", {
          description: "Register successful. You may login now",
        });
        navigate("/auth/login");
        return;
      } else if (response.data.msg === "Username is taken") {
        toast("Error", {
          description: "Username is taken. Please try another username",
        });
        return;
      }

      throw Error("Error signing up. Please try again later");
    } catch (error) {
      console.log(error);
      toast("Error", {
        description: "Error signing up. Please try again later",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-gray-500">Enter your information to get started</p>
        </div>

        <Form {...registerForm}>
          <form
            onSubmit={registerForm.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={registerForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
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
              Register
            </Button>
          </form>
        </Form>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <a href="/auth/login" className="text-blue-600 hover:underline">
            Login here
          </a>
        </div>
      </div>
    </div>
  );
}

export default RegisterComponent;
