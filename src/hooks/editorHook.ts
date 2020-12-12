import { useState, useEffect } from 'react' 
import { useSelector, useDispatch } from 'react-redux'
import { drawerToggle } from '../../store/actions/drawerActions'
import { State } from '../../store/configStore'

export default function editorHook (): any[] {
    
    const drawerData = useSelector((state: State) => state?.Drawer)

    const [open, setOpen] = useState(drawerData.drawerIsOpen);
  
    const dispatch = useDispatch()
  
    useEffect(() => {
      setOpen(drawerData.drawerIsOpen);
    }, [drawerData.drawerIsOpen])
  
    const toggleDrawer = () => {
      dispatch(drawerToggle())
    };

    return [
        open as boolean,
        toggleDrawer as () => void
    ] 
}