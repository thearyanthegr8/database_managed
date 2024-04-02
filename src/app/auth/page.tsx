import React from "react";
import LoginForm from "./LoginForm";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegisterForm from "./RegisterForm";

function page() {
  return (
    <main className="flex">
      <section className="w-1/2 h-screen bg-secondary hidden md:block"></section>
      <section className="w-full md:w-1/2 h-screen flex flex-col justify-center items-center gap-8 px-8">
        <Tabs defaultValue="login" className="w-full md:w-[20rem] lg:w-[25rem]">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="login" className="w-1/2">
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="w-1/2">
              Register
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="login"
            className="flex flex-col justify-start items-center gap-8"
          >
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome Back!
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and password below to login
              </p>
            </div>
            <LoginForm />
          </TabsContent>
          <TabsContent
            value="register"
            className="flex flex-col justify-start items-center gap-8"
          >
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an Account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your details below to create your account
              </p>
            </div>
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}

export default page;
