import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import SideBarItem from './SideBarItem'
import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import Router from 'next/router'
import { logout } from '../../../store/actions/authAction';
import { makeStyles } from '@material-ui/core';
import Icon from '@material-ui/core/Icon'
import { AuthReducerType } from '../../../store/reducers/AuthReducer'
import { SideBarType, getSideBar } from '../../../config/index'
import profileHook from '../../hooks/profileHook';

interface SideBarProps {
    Auth?: AuthReducerType
}

const SideBar = ({ Auth }: SideBarProps ) : JSX.Element => {
    const classes = useStyle()

    const dispatch = useDispatch()

    const toLogout = useCallback( async () => {
        await dispatch(logout())
        Router.push('/')
    }, [])

    const [sideBars, setSideBar] = useState<SideBarType[]>(getSideBar(Auth?.authInfo?.role))

    useEffect(() => {
        setSideBar(getSideBar(Auth?.authInfo?.role))
    }, [Auth])

    return (
        <>
            <List>
                {sideBars.map((sideBar, index) => (
                    <SideBarItem {...sideBar} key={`${sideBar?.name}_${sideBar?.url}`} />
                ))}
            </List>
            <Divider />
            <List>
                <ListItem button onClick={toLogout} className={classes.logoutBtn}>
                    <ListItemIcon><Icon className={classes.logoutBtn}>exit_to_app</Icon></ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </>
    )
}

const useStyle = makeStyles((theme) => ({
    logoutBtn: {
        color: '#f50057'
    }
}))

export default SideBar