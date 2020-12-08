import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import Router from 'next/router'
import { logout } from '../../../store/actions/authAction';
import { makeStyles } from '@material-ui/core';
import Icon from '@material-ui/core/Icon'
import { AuthReducerType } from '../../../store/reducers/AuthReducer'

interface SideBarProps {
    Auth?: AuthReducerType
}

const SideBar = ( { Auth } : SideBarProps) : JSX.Element => {
    const classes = useStyle()

    const dispatch = useDispatch()

    const toLogout = useCallback( async () => {
        await dispatch(logout())
        Router.push('/')
    }, [])

    return (
        <>
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
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