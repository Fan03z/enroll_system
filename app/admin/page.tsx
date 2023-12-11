import { DataTable } from "@/components/DataTable";
import { Register, columns } from "@/components/DataTableColumns";

function getData(): Register[] {
    // FIXME: hardcode 这里应该从数据库的api拿
    return [
        {
            id: "1",
            name: "张三",
            age: 20,
            sex: "男",
            college: "北京大学",
            level: "本科",
            profession: "计算机科学与技术",
            status: "pending",
        },
        {
            id: "2",
            name: "李四",
            age: 21,
            sex: "男",
            college: "清华大学",
            level: "本科",
            profession: "应用数学",
            status: "pass",
        },
    ];
}

export default function AdminPage() {
    const data = getData();

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <DataTable columns={columns} data={data} />
        </main>
    );
}
