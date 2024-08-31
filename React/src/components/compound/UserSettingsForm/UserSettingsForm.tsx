import User from "../../../types/UserType";
import UserCredentialsForm from "./UserCredentialsForm/UserCredentialsForm";
import UserImagesForm from "./UserImagesForm/UserImagesForm";

function UserSettingsForm({ user, setUser }: {user: User, setUser: Function}) {
    return (
        <div className="p-3">
            <UserCredentialsForm user={user} setUser={setUser} />
            <UserImagesForm user={user} setUser={setUser} />
        </div>
    );
}

export default UserSettingsForm;