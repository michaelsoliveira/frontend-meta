import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth'
import { signOut } from 'next-auth/react';
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const session = await auth();
    if (!session?.user) {
        return redirect('/')
    }

    return (
        <div>
            Usuário: {session.user.username}
        </div>
    )
}