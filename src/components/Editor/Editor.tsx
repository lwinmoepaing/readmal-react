import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import MessageIcon from '@material-ui/icons/Message'
import ImageIcon from '@material-ui/icons/Image'
import Character from './Character'
import MessageEditor from './MessageEditor'
import editorHook from '../../hooks/editorHook'
import { contextType } from '../../../model/Context'

interface EditorProps {
    context: contextType[]
    episodeId: string
    backgroundImage: string
}

export default function Editor({context, episodeId, backgroundImage}: EditorProps) {
  const classes = useStyles();
  const [tabIndicator, setTabIndicator] = React.useState('message');

  const useEditorHook = editorHook({ context, episode_id: episodeId, backgroundImage})

  const onChangeTab = useCallback((event, newValue) => {
    setTabIndicator(newValue);
  }, [])

  return (
    <div>
        <div className={classes.EditorContainer}>
            <div className={tabIndicator === 'character' ? null : classes.Hidden}> 
              <Character editorHook={useEditorHook} />
            </div>
            <div className={tabIndicator === 'message' ? null : classes.Hidden}> 
              <MessageEditor editorHook={useEditorHook} />
            </div>
            <div className={tabIndicator === 'image' ? null : classes.Hidden}> Image Component </div>
        </div>

        <BottomNavigation
            value={tabIndicator}
            onChange={onChangeTab}
            showLabels
            className={[classes.bottomNavigator, 'mmFont'].join(' ')}
        >
            <BottomNavigationAction value="character"  label="ကာရိုက်တာ" icon={<AccountCircleIcon />} />
            <BottomNavigationAction value="message" label="စကားပြော" icon={<MessageIcon />} />
            {/* <BottomNavigationAction value="image" label="ပုံထည့်မယ်" icon={<ImageIcon />} /> */}
        </BottomNavigation>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
    // Button Navigator Container
    bottomNavigator: {
    },
  
    // Editor Container
    EditorContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      height: `calc(100vh - 155px)`,
      overflowY: 'auto',
      overfloxX: 'hidden'
    },
  
    // Hidden Component
    Hidden: {
      display: 'none'
    }
  }));