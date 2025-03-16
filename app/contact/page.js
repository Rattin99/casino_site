"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Textarea } from "@/components/ui/textarea";

// Define the Zod schema for form validation
const ContactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(1, { message: "Message is required" }),
});

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form data:", data);
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-extrabold text-orange-500 tracking-tight sm:text-4xl">
              Contact Us
            </h2>
            <p className="mt-3 text-base text-gray-500">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum
            </p>
          </div>
          <div className="w-full md:w-1/2 mt-6 md:mt-0">
            <img src="/contactpage.png" alt="Contact Us" className="mx-auto" />
          </div>
        </div>
      </div>
      <div className="bg-orange-50">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <h2 className="w-full text-center text-orange-500 font-extrabold text-3xl">
            Get in touch
          </h2>
          <div className="mt-8 flex justify-center">
            <div className="w-full max-w-xl">
              <Card>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <CardContent>
                    {" "}
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                      >
                        Name
                      </label>
                      <Input id="name" name="name" {...register("name")} />
                      {errors.name && (
                        <p className="text-red-500">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <Input id="email" name="email" {...register("email")} />
                      {errors.email && (
                        <p className="text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                    <div className="mb-6">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="message"
                      >
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        {...register("message")}
                      />
                      {errors.message && (
                        <p className="text-red-500">{errors.message.message}</p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="w-full">
                    <Button
                      type="submit"
                      variant="primary"
                      className="bg-orange-500 text-white mx-auto"
                    >
                      Submit
                    </Button>{" "}
                  </CardFooter>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
