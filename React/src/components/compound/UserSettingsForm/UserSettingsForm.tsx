import User from "../../../types/UserType";
import UserCredentialsForm from "./UserCredentialsForm/UserCredentialsForm";
import UserImagesForm from "./UserImagesForm/UserImagesForm";

<<<<<<< HEAD
function UserSettingsForm({ user, setUser }: {user: User, setUser: Function}) {
    return (
        <div className="p-3">
            <UserCredentialsForm user={user} setUser={setUser} />
            <UserImagesForm user={user} setUser={setUser} />
=======
function UserSettingsForm({ user }: {user: User}) {
    return (
        <div className="p-3">
            <UserCredentialsForm user={user} />
            <UserImagesForm user={user} />
>>>>>>> abaed7c59c6df70ac2f869cac4e74f293032e48e
        </div>
    );
}

export default UserSettingsForm;