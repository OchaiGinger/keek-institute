import { OrganizationSwitcher, SignedIn } from "@daveyplate/better-auth-ui"

export default function UserDashboard() {
    return (
        <SignedIn>
            <p>
                Only signed-in ADMIN users will see this!
                {/* <OrganizationSwitcher /> */}
            </p>
        </SignedIn>
    )
}