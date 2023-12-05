"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea";

const MAX_IMAGE_SIZE = 10000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const registerFormSchema = z.object({
    image: z
        .any()
        .refine((file) => file?.size <= MAX_IMAGE_SIZE, `Max image size is 10MB.`)
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), "Only .jpg, .jpeg, .png and .webp formats are supported."),
    name: z.string(),
    sex: z.string(),
    college: z.string(),
    introduction: z.string(),
});

type registerFormValues = z.infer<typeof registerFormSchema>;

// 从学信api拿数据
const defaultValues: Partial<registerFormValues> = {
    name: "",
    sex: "",
    college: "",
    introduction: "",
};

export default function RegisterForm() {
    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues,
        // mode: "onChange",
    });

    function onSubmit(values: registerFormValues) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-1/2">
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold">Image Photo</FormLabel>
                            <FormControl>
                                <Input type="file" className="w-1/4" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    disabled
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold">Name</FormLabel>
                            <FormControl>
                                <Input className="w-1/2" placeholder="name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    disabled
                    control={form.control}
                    name="college"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold">College</FormLabel>
                            <FormControl>
                                <Input className="w-1/2" placeholder="Educated at" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="introduction"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold">Introduction</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Tell us a little bit about yourself" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
