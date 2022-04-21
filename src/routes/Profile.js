import { authService } from 'fbase';
import { useNavigate  } from 'react-router-dom';

const Profile = ()=>{
    const navigate = useNavigate ();

    const onLogOutClick = ()=>{
        authService.signOut();
        navigate("/");
    }
    return(
        <>  
            <h1>Profile</h1>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
};
export default Profile;