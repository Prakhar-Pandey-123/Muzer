"use client"

import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {session?.user ? (
                <>
                    {/* Dashboard */}
                    <h1>Welcome {session.user.name}</h1>

                    <button
                        className="m-2 p-2 bg-blue-400"
                        onClick={() => signOut()}
                    >
                        Log Out
                    </button>
                </>
            ) : (
                <>
                    {/* Login Part */}
                    <h1>Please Login</h1>

                    <button
                        className="m-2 p-2 bg-blue-400"
                        onClick={() => signIn()}
                    >
                        Sign In
                    </button>
                </>
            )}
        </div>
    );
}