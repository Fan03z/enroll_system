import { DataTable } from "@/components/DataTable";
import { Register, columns } from "@/components/DataTableColumns";
import axios from "axios";

async function getData(): Promise<Register[]> {
    // FIXME: axios库会报错
    // const response = await axios.get("/api/admin", {
    //     headers: {
    //         Accept: "application/json",
    //     },
    // });
    // const responseData = response.data;

    const response = await fetch("http://localhost:3000/api/admin", {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
        next: { revalidate: 0 },
    });

    const responseData = await response.json();

    return responseData;
}

export default async function AdminPage() {
    const data = await getData();

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <DataTable columns={columns} data={data} />
        </main>
    );
}
