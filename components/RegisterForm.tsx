"use client";

import { useContext, useState, ChangeEvent } from "react";
import { RegisterContext } from "@/context/RegisterContext";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "./ui/textarea";

const MAX_IMAGE_SIZE = 15000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const registerFormSchema = z.object({
    image: z.any(),
    // FIXME:
    // .refine((file) => file?.size <= MAX_IMAGE_SIZE, `Max image size is 15MB.`)
    // .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), "Only .jpg, .jpeg, .png and .webp formats are supported."),
    name: z.string(),
    sex: z.string(),
    college: z.string(),
    level: z.string(),
    profession: z.string(),
    introduction: z.string(),
});

type registerFormValues = z.infer<typeof registerFormSchema>;

function getImageData(event: ChangeEvent<HTMLInputElement>) {
    const dataTransfer = new DataTransfer();

    Array.from(event.target.files!).forEach((image) => dataTransfer.items.add(image));

    const files = dataTransfer.files;
    const displayUrl = URL.createObjectURL(event.target.files![0]);

    return { files, displayUrl };
}

export default function RegisterForm() {
    // const { Register, setRegister } = useContext(RegisterContext);
    const [preview, setPreview] = useState("");

    // FIXME: hardcode for test
    const Register = {
        name: "张三",
        sex: "男",
        nationality: "汉",
        college: "北京大学",
        level: "本科",
        profession: "计算机科学与技术",
    };

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
        mode: "onSubmit",
    });

    function onSubmit(values: registerFormValues) {
        // TODO: Send to the database
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-1/2">
                <Avatar className="w-24 h-24">
                    <AvatarImage src={preview} />
                    <AvatarFallback>Image</AvatarFallback>
                </Avatar>
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { onChange, value, ...rest } }) => (
                        <>
                            <FormItem>
                                <FormLabel className="font-semibold">Circle Image</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        className="w-1/4 file:bg-blue-50 file:text-blue-700"
                                        {...rest}
                                        onChange={(event) => {
                                            const { files, displayUrl } = getImageData(event);
                                            setPreview(displayUrl);
                                            onChange(files);
                                        }}
                                    />
                                </FormControl>
                                <FormDescription>Choose best image that bring spirits.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        </>
                    )}
                />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field: { disabled, value, ...rest } }) => (
                        <FormItem>
                            <FormLabel className="font-semibold">Name</FormLabel>
                            <FormControl>
                                <Input type="text" className="w-1/2" disabled value={Register.name} {...rest} />
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
                    control={form.control}
                    name="college"
                    render={({ field: { disabled, value, ...rest } }) => (
                        <FormItem>
                            <FormLabel className="font-semibold">College</FormLabel>
                            <FormControl>
                                <Input type="text" className="w-1/2" disabled value={Register.college} {...rest} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="level"
                    render={({ field: { disabled, value, ...rest } }) => (
                        <FormItem>
                            <FormLabel className="font-semibold">Level</FormLabel>
                            <FormControl>
                                <Input type="text" className="w-1/2" disabled value={Register.level} {...rest} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="profession"
                    render={({ field: { disabled, value, ...rest } }) => (
                        <FormItem>
                            <FormLabel className="font-semibold">Profession</FormLabel>
                            <FormControl>
                                <Input type="text" className="w-1/2" disabled value={Register.profession} {...rest} />
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
