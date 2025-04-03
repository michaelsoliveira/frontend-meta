import SignInViewPage from "@/features/auth/components/sign-in";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Autenticação | Login',
    description: 'Página de login para autenticação'
};

export default function Home() {
    return <SignInViewPage />
}