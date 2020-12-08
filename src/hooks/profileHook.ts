import { useState, useEffect } from 'react' 
import { useSelector } from 'react-redux'
import { State } from '../../store/configStore'
import { AuthReducerType } from '../../store/reducers/AuthReducer'

export default function profileHook (Auth?: AuthReducerType): AuthReducerType | null {
    const userData = useSelector((state: State) => state?.Auth)

    const [user, setUser] = useState<AuthReducerType | null>(Auth ?? null)
    
    useEffect(() => {
        setUser(userData)
    }, [userData])

    return user
}