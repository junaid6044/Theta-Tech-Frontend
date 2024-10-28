"use client"
import * as z from "zod"
import React from 'react'
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa6"
import Link from "next/link"

// Validation schema using Zod
const SigninSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password should be at least 6 characters long"),
  
});

function SignInPage() {
  // Initialize the form with the schema and default values
  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: '',
      
    }
  });

  // Handle form submission
  function onSubmit(values: z.infer<typeof SigninSchema>) {
    console.log(values); // You can replace this with actual form submission logic
  }

  return (
    <>
      <div className="max-w-[1166px] my-2 mx-auto bg-black flex flex-wrap rounded-lg justify-between items-center">
        <div className="flex items-center  shadow-md rounded-lg
  overflow-hidden justify-center w-[20rem] mx-6 md:w-auto my-4 basis-[50%]">
          <div className=" text-muted hidden md:flex justify-center items-center flex-col h-dvh w-dvh">
            <h3 className="text-2xl font-semibold">Welcome!</h3>
            <p>enter your personal detail for login</p>
            <Link href={"/signup"}>
              <Button className="border-zinc-500 text-zinc-300 hover:border-zinc-200 hover:text-zinc-200 transition-colors border rounded-full px-8">Sign up</Button>
            </Link>
          </div>
        </div>
        <div className=" px-4 py-4 my-4 mx-4 md:w-1/2 w-[20rem] bg-white rounded-lg  h-dvh basis-[40%]">
          <h3 className="text-center text-2xl font-semibold">Sign In here</h3>
          <div className="flex justify-center items-center my-3">
            <Button variant={"outline"} className="rounded-full h-[2.5rem] w-[2.5rem] p-0 mx-2 border-zinc-400"><FaGoogle className="h-5 w-5" /></Button>
            <Button variant={"outline"} className="rounded-full h-[2.5rem] w-[2.5rem] p-0 mx-2 border-zinc-400"><FaFacebook className="h-5 w-5" /></Button>
          </div>
          <p className="text-center">or use this option</p>
          
          {/* Form using react-hook-form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> 
              <Button type="submit" className="w-full mt-4">Login</Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}

export default SignInPage;
