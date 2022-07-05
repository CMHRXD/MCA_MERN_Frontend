//User Profile Panel
import ChangeProfileForm from "../components/ChangeProfileForm";
import ChangePswForm from "../components/ChangePswForm";

const ProfileAdministrator = ({view}) => {

    return (
        <div className=''>
            {view == "profile" ? <ChangeProfileForm /> : <ChangePswForm />}
        </div>
    )
}
export default ProfileAdministrator;