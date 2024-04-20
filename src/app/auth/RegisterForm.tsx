"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import LabelledInput from "@/components/custom/labelled-form-input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/types/database.types";
import { registerSchema } from "@/lib/schemas/auth.schema";

function RegisterForm() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      mobile: 0,
      email: "",
      password: "",
      type: "CUSTOMER",
    },
  });

  const [hide, setHide] = useState(true);
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const supabase = createClientComponentClient<Database>();

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    console.log(values);
    setLoading(true);
    try {
      const register = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        phone: values.mobile.toString(),
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (register.data.user) {
        await supabase.from("users").insert({
          user_id: register.data.user.id,
          name: values.name,
          mobile: values.mobile.toString(),
          email: values.email,
        });

        if (values.type === "CUSTOMER") {
          await supabase.from("customers").insert({
            user_id: register.data.user.id,
          });
        } else {
          await supabase.from("suppliers").insert({
            user_id: register.data.user.id,
          });
        }
      }

      router.refresh();
    } catch (e: any) {
      toast({
        title: "Unable to register",
        description: e.response.data.error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full md:w-[20rem] lg:w-[25rem] flex flex-col gap-4"
      >
        <LabelledInput
          control={form.control}
          name="name"
          label="Name"
          placeholder={"John Doe"}
          isDisabled={loading}
          required
        />
        <LabelledInput
          control={form.control}
          name="email"
          label="Email"
          placeholder={"johndoe@gmail.com"}
          isDisabled={loading}
          required
        />
        <LabelledInput
          control={form.control}
          name="mobile"
          label="Mobile"
          placeholder={"9876543210"}
          type="number"
          isDisabled={loading}
          required
        />
        <div className="relative w-full">
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
        <div className="flex flex-col gap-2">
          <Label>Type *</Label>
          <Select
            onValueChange={(e) => form.setValue("type", e)}
            disabled={loading}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CUSTOMER">Customer</SelectItem>
              <SelectItem value="SUPPLIER">Supplier</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" disabled={loading}>
          Register
        </Button>
      </form>
    </Form>
  );
}

export default RegisterForm;
