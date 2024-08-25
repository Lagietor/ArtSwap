import User from "../../../types/UserType";
import UserCredentialsForm from "./UserCredentialsForm/UserCredentialsForm";
import UserImagesForm from "./UserImagesForm/UserImagesForm";

function UserSettingsForm({ user }: {user: User}) {
    return (
        <div className="p-3">
            <UserCredentialsForm user={user} />
            <UserImagesForm user={user} />
        </div>
    );
}

export default UserSettingsForm;