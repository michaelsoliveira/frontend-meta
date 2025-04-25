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
            {JSON.stringify(session, null, 2)}
        </div>
    )
}