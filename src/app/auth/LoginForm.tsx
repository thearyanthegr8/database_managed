"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import LabelledInput from "@/components/custom/labelled-form-input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/types/database.types";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { UserAtom } from "@/atoms";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const supabase = createClientComponentClient<Database>();
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useAtom(UserAtom);

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const { data } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      setUser(data?.user);
      router.refresh();
    } catch (error: any) {
      toast({
        title: "Unable to login",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  const [hide, setHide] = useState(true);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full md:w-[20rem] lg:w-[25rem] flex flex-col gap-4"
      >
        <LabelledInput
          control={form.control}
          name="email"
          label="Email"
          placeholder={"johndoe@gmail.com"}
          isDisabled={loading}
          required
        />
        <div className="relative w-full mb-4">
          <LabelledInput
            control={form.control}
            placeholder="********"
            label="Password"
            name="password"
            type={hide ? "password" : "text"}
            id="password"
            isDisabled={loading}
            required
            tooltip="Password must be at least 8 characters long"
          />
          {hide ? (
            <EyeIcon
              className="absolute cursor-pointer top-1/2 right-2"
              onClick={() => setHide(false)}
            />
          ) : (
            <EyeOffIcon
              className="absolute cursor-pointer top-1/2 right-2"
              onClick={() => setHide(true)}
            />
          )}
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
