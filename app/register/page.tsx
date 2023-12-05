import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <h2 className="mt-8 text-center text-3xl font-semibold tracking-tight text-gray-900 my-12">Register Form</h2>
            <RegisterForm />
        </main>
    );
}
