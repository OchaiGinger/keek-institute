import {
    UpdateAvatarCard,
    UpdateNameCard,
    UpdateUsernameCard,
    ChangeEmailCard,
    ChangePasswordCard,
    ProvidersCard,
    SessionsCard,
    DeleteAccountCard,
    UpdateFieldCard
} from "@daveyplate/better-auth-ui"

export default function CustomSettingsPage() {
    return (
        <div className="flex flex-col gap-6 max-w-xl mx-auto py-12 px-4">
            <UpdateAvatarCard />

            <UpdateNameCard />

            <UpdateUsernameCard />

            <ChangeEmailCard />

            <ChangePasswordCard />

            <ProvidersCard />

            <SessionsCard />

            <DeleteAccountCard />

            {/* <UpdateFieldCard
                field="company"
                label="Company"
                description="Update your company name"
                placeholder="Enter your current company name"
                type="string"
            /> */}
        </div>
    )
}