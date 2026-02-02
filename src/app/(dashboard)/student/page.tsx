import { SignedIn } from "@daveyplate/better-auth-ui"

export default function UserDashboard() {
    return (
        <SignedIn>
            <p>
                Only signed-in STUDENT users will see this!
            </p>
        </SignedIn>
    )
}