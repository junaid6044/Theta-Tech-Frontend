"use client";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa6";
import Link from "next/link";

// Validation schema using Zod
const SignupSchema = z
  .object({
    email: z.string().email("Invalid email"),
    name: z
      .string()
      .min(2, "Name should have at least 2 characters.")
      .max(50, "Maximum length should be 50 characters")
      .refine(
        (value) => /^[a-zA-Z]+[-'s]?[a-zA-Z]+$/.test(value),
        "Name should contain only alphabets and may include hyphens, apostrophes, or spaces."
      ),
    password: z
      .string()
      .min(6, "Password should be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function SignupPage() {
  // Initialize the form with the schema and default values
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Handle form submission
  function onSubmit(values: z.infer<typeof SignupSchema>) {
    console.log(values); // You can replace this with actual form submission logic
  }

  return (
    <>
      <div className="max-w-[1166px] my-2 mx-auto bg-black flex flex-wrap rounded-lg justify-between items-center">
        <div
          className="flex items-center  shadow-md rounded-lg
  overflow-hidden justify-center w-[20rem] mx-6 md:w-auto my-4 basis-[50%]
"
        >
          <div
            className=" text-muted hidden md:flex justify-center items-center flex-col h-dvh w-dvh"
          >
            <h3 className="text-2xl font-semibold">Already have an account?</h3>
            <p className ="py-4">
              To keep connected with us please log in with your personal info
            </p>
            <Link href={"/login"}>
              <Button className="border-zinc-500 text-zinc-300 hover:border-zinc-200 hover:text-zinc-200 transition-colors border rounded-full py-6 px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
        <div
          className="px-4 py-4 my-4 mx-4 md:w-1/2 w-[20rem] bg-white rounded-lg  h-dvh basis-[40%]"
        >
          <h3 className="text-center text-2xl font-semibold ">Register Here</h3>
          <div className="flex justify-center items-center my-3">
            <Button
              variant={"outline"}
              className="rounded-full h-[2.5rem] w-[2.5rem] p-0 mx-2 border-zinc-400
"
            >
              <FaGoogle className="h-5 w-5 text-[#4285F4] text-2xl" />
            </Button>
            <Button
              variant={"outline"}
              className="rounded-full h-[2.5rem] w-[2.5rem] p-0 mx-2 border-zinc-400;
"
            >
              <FaFacebook className="h-5 w-5 text-blue-600" />
            </Button>
          </div>
          <p className="text-center">or use this option</p>

          {/* Form using react-hook-form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-4">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
