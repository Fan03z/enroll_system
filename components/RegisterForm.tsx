"use client";

import { useContext } from "react";
import { RegisterContext } from "@/context/RegisterContext";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
    level: z.string(),
    profession: z.string(),
    introduction: z.string(),
});

type registerFormValues = z.infer<typeof registerFormSchema>;

export default function RegisterForm() {
    const { Register, setRegister } = useContext(RegisterContext);

    // FIXME: hardcode for test
    // const Register = {
    //     name: "张三",
    //     sex: "男",
    //     nationality: "汉",
    //     college: "北京大学",
    //     level: "本科",
    //     profession: "计算机科学与技术",
    // };

    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        // 从学信网API拿数据
        defaultValues: {
            name: Register.name,
            sex: Register.sex,
            college: Register.college,
            level: Register.level,
            profession: Register.profession,
        },
        mode: "onChange",
    });

    function onSubmit(values: registerFormValues) {
        // TODO: Send to the database
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
                                <Input type="text" className="w-1/2" defaultValue={Register.name} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="sex"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold">Gender</FormLabel>
                            <Select disabled onValueChange={field.onChange} defaultValue={Register.sex}>
                                <FormControl>
                                    <SelectTrigger className="w-1/6">
                                        <SelectValue />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="男">男</SelectItem>
                                    <SelectItem value="女">女</SelectItem>
                                </SelectContent>
                            </Select>
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
                                <Input className="w-1/2" defaultValue={Register.college} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    disabled
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold">Level</FormLabel>
                            <FormControl>
                                <Input className="w-1/2" defaultValue={Register.level} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    disabled
                    control={form.control}
                    name="profession"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold">Profession</FormLabel>
                            <FormControl>
                                <Input className="w-1/2" defaultValue={Register.profession} {...field} />
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
