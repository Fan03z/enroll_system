"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import submitKey from "@/bin/Submit";
import { RegisterContext } from "@/context/RegisterContext";

export function InputWithButton() {
    const [InputKey, setInputKey] = useState("");
    const router = useRouter();
    const { Register, setRegister } = useContext(RegisterContext);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputKey(e.target.value);
    }

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        if (InputKey.length === 16) {
            let register = await submitKey(InputKey);

            if (register.name == undefined || register.name == "") {
                toast.error("Invalid key");
            } else {
                setRegister(register);
                router.push("/register");
            }
        } else {
            toast.error("Key must be 16 characters long");
        }
    }

    return (
        <div className="flex w-full max-w-lg items-center space-x-2">
            <Input type="type" placeholder="Key" value={InputKey} onChange={handleChange} className="w-fix" />
            <Button type="submit" onClick={handleSubmit}>
                Submit
            </Button>
        </div>
    );
}
