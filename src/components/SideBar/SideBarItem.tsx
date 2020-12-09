import { SideBarType } from "../../../config"
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon'
import Link from 'next/link'

const SideBarItem = (props: SideBarType): JSX.Element => {
    const { name, icon, url } = props
    return (
        <Link href={url} passHref>
            <ListItem button>
                <ListItemIcon>
                    <Icon>{icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={name} />
            </ListItem>
        </Link>
    )
}

export default SideBarItem