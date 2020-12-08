// Material Ui
import { Typography } from '@material-ui/core'

import { AuthReducerType } from '../../../store/reducers/AuthReducer'

interface ProfileProps {
    user: AuthReducerType
}

const Profile = ({ user } : ProfileProps ) => {
    return (
        <>
            <h1> User </h1>
            <Typography component="p">
                Name: { user?.authInfo?.name }
            </Typography>
            <Typography component="p">
                Role: { user?.authInfo?.role?.toLowerCase() }
            </Typography>
            <Typography component="p">
                Email: { user?.authInfo?.email }
            </Typography>
        </>
    )
}

export default Profile