"use client";

import React, { createContext, useState } from "react";
import registerData from "@/interface/registerData";

const RegisterContext = createContext({
    Register: {
        name: "",
        sex: "",
        nationality: "",
        college: "",
        level: "",
        profession: "",
    },
    setRegister: (_: registerData) => {},
});

const RegisterContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [Register, setRegister] = useState<registerData>({
        name: "",
        sex: "",
        nationality: "",
        college: "",
        level: "",
        profession: "",
    });

    return <RegisterContext.Provider value={{ Register, setRegister }}>{children}</RegisterContext.Provider>;
};

export { RegisterContextProvider, RegisterContext };
