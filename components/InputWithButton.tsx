"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import submitKey from "@/bin/Submit";
import { RegisterContext } from "@/context/RegisterContext";
import axios from "axios";

export function InputWithButton() {
    const [InputKey, setInputKey] = useState("");
    const [IsSubmit, setIsSubmit] = useState(false);
    const router = useRouter();
    const { Register, setRegister } = useContext(RegisterContext);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputKey(e.target.value);
    }

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        let IsAdmin: boolean = false;

        await axios.get("/api/validate").then((res) => {
            let i = 0;
            while (res.data[i] != undefined) {
                if (res.data[i].key == InputKey) {
                    IsAdmin = true;
                    router.push("/admin");
                }
                i++;
            }
        });

        if (!IsAdmin) {
            if (InputKey.length === 16) {
                setIsSubmit(true);

                let register = await submitKey(InputKey);

                if (register.name == undefined || register.name == "") {
                    toast.error("Invalid key");
                    setIsSubmit(false);
                } else {
                    setRegister(register);
                    router.push("/register");
                }
            } else {
                toast.error("Key must be 16 characters long");
            }
        }
    }

    return (
        <div className="flex w-full max-w-lg items-center space-x-2">
            <Input type="type" placeholder="Key" value={InputKey} onChange={handleChange} className="w-fix" />
            {IsSubmit ? (
                <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sumiting
                </Button>
            ) : (
                <Button type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            )}
        </div>
    );
}
