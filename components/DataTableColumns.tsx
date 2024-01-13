"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import toast from "react-hot-toast";

export type Register = {
    id: string;
    name: string;
    age: number;
    sex: "男" | "女";
    college: string;
    level: string;
    profession: string;
    status: "pending" | "pass" | "reject";
};

export const columns: ColumnDef<Register>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
    },
    {
        accessorKey: "name",
        header: () => <div className="text-center ">Name</div>,
        cell: ({ row }) => {
            return <div className="text-center  font-medium">{row.getValue("name")}</div>;
        },
    },
    {
        accessorKey: "age",
        header: ({ column }) => {
            return (
                <div className="flex justify-center">
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Age
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            return <div className="text-center  font-medium">{row.getValue("age")}</div>;
        },
    },
    {
        accessorKey: "sex",
        header: () => <div className="text-center ">Gender</div>,
        cell: ({ row }) => {
            return <div className="text-center  font-medium">{row.getValue("sex")}</div>;
        },
    },
    {
        accessorKey: "college",
        header: () => <div className="text-center ">College</div>,
        cell: ({ row }) => {
            return <div className="text-center  font-medium">{row.getValue("college")}</div>;
        },
    },
    {
        accessorKey: "level",
        header: () => <div className="text-center ">Level</div>,
        cell: ({ row }) => {
            return <div className="text-center  font-medium">{row.getValue("level")}</div>;
        },
    },
    {
        accessorKey: "profession",
        header: () => <div className="text-center">Professional</div>,
        cell: ({ row }) => {
            return <div className="text-center font-medium">{row.getValue("profession")}</div>;
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <div className="flex justify-center">
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Status
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            switch (row.getValue("status")) {
                case "pending":
                    return <div className="text-center text-slate-400 font-medium">pending</div>;
                case "pass":
                    return <div className="text-center text-green-500 font-medium">pass</div>;
                case "reject":
                    return <div className="text-center text-red-500 font-medium">reject</div>;
            }
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem
                            onClick={() => {
                                axios.post("/api/update/pass", row.original).then((res) => {
                                    if (res.status === 200) {
                                        toast.success("Success to pass");
                                        location.reload();
                                    } else {
                                        toast.error("Failed to pass");
                                    }
                                });
                            }}
                        >
                            Pass
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                axios.post("/api/update/reject", row.original).then((res) => {
                                    if (res.status === 200) {
                                        toast.success("Success to reject");
                                        location.reload();
                                    } else {
                                        toast.error("Failed to pass");
                                    }
                                });
                            }}
                        >
                            Reject
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                // FIXME: 这里跳转查看具体的信息路由
                            }}
                        >
                            View details
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
