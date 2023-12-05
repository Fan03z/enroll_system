import { InputWithButton } from "@/components/InputWithButton";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <h4 className="mt-8 text-center text-3xl font-semibold tracking-tight text-gray-900 my-12">Fill in Xuexin key</h4>
            <InputWithButton />
        </main>
    );
}
