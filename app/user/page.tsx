import UserHubLayout from "@/components/layout/UserHubLayout"
import { UserDashboard } from "@/components/idea/UserDashboard"

export default function UserPages() {
    return (
        <UserHubLayout>
            <UserDashboard />
        </UserHubLayout>
    )
}