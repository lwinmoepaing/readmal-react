import { useState, useEffect, useCallback } from 'react' 
import { API_URL, CHARACTER_COLORS } from '../../config'
import { characterType, contextType, makeContext, Character, Context } from '../../model/Context'
import { makeCharacter } from '../../model/Context'
import shortUUID from 'short-uuid'
import errorHandleHook from './errorHandleHook'
export interface EditorHook {
  isUpdatingEditor: boolean

  // Background Context 
  backgroundContextImage: string

  // Characters Data
  characterName: string
  characters: characterType[]
  selectedCharacter: characterType
  colors: string[]
  selectedColor: string

  // Character Methods
  onSelectColor: (color: string) => void
  onDeleteCharacter: (characterId: string) => void
  onChangeCharacterName(event: React.ChangeEvent<HTMLInputElement>) : void
  onCreateCharacter: () => void
  onSelectedCharacter: (characterId: string) => void

  // Messages Data
  messages: contextType[]

  // Character Methods
  onDeleteMessage: (messageId: string) => void
  onEditMessage: (message: contextType, serialNumber?: number) => void
  onCreateMessage: (inputValue: string, position: 'LEFT' | 'RIGHT' | 'CENTER') => void
}

interface EditorHookProps {
  context: contextType[] 
  episode_id: string
  backgroundImage: string
  token: string
}

export default function editorHook ({ context = [] , episode_id,  backgroundImage, token}: EditorHookProps): EditorHook {
  // When Updating Editor
  const [isUpdatingEditor, setIsUpdatingEditor ] = useState<boolean>(false)

  // Background Context Image
  const [ backgroundContextImage, setBackgroundContextImage] = useState<string>(backgroundImage)

  // Use Error Handler Hook
  const [ handleErrorMessage, clearMessage] = errorHandleHook()

  /**
   *  Characters Data
   */
  // Initial State For Characters
  const manageCharacter = context.length > 0 ? Array.from(new Set<any>(
      context.map(mes => JSON.stringify(mes.character)))
    ).map(cha => JSON.parse(cha)) 
    : []
  const [characterName, setCharacterName] = useState<string>('')
  const [characters, setCharacters] = useState<characterType[]>([...manageCharacter])
  const [selectedCharacter, setSelectedCharacter] = useState<characterType | null >(null)
  // Initial State For Character Colors
  const existingCharacterColors = characters.map(cha => cha.color)
  const manageColors = characters.length === 0 ? CHARACTER_COLORS : CHARACTER_COLORS.filter(color => !existingCharacterColors.includes(color))
  const [colors, setColors] = useState<string[]>(manageColors)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  /**
   * Message Datas
   */
  const [messages, setMessages] = useState<contextType[]>(context)

  // Charcters Changes
  // Color changes, eg, when remove users we need add old colorSet
  useEffect(() => {
    const existingCharacterColors = characters.map(cha => cha.color)
    const manageColors = characters.length === 0 ? CHARACTER_COLORS : CHARACTER_COLORS.filter(color => !existingCharacterColors.includes(color))
    setColors(manageColors)
    setSelectedColor(null)
    updateMessageToServer()
  }, [characters])

  /**
   * All Characters Methods
   */

  // When Fab Color Icon Selected
  const onSelectColor = useCallback((val: string) :void => {
    setSelectedColor(val === selectedColor ? null : val)
  }, [colors, selectedColor])

  // When Author Delete Character
  const onDeleteCharacter = useCallback((charId: string) => {
    setCharacters(characters.filter(char => char.id !== charId))
    setMessages(prev => prev.filter(message => message.character.id !== charId))
    if (selectedCharacter?.id === charId) setSelectedCharacter(null)
  }, [characters, messages, selectedCharacter])

  // When Character Form on Change
  const onChangeCharacterName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target 
    setCharacterName(value)
  }, [])

  // Create Characters
  const onCreateCharacter = useCallback(() => {
    try {
      const existingCharacter = characters.find(char => char.name === characterName.trim())
      if (!characterName.trim()) throw new Error('ဇာတ်ကောင် နာမည်ရိုက်ထည့်ပေးပါ')
      if (existingCharacter) throw new Error('ဇာတ်ကောင် နာမည်တူရှိပြီသားဖြစ်သည်။ ')
      if (!selectedColor) throw new Error('အရောင်ရွေးချယ်ပေးရန် လိုအပ်သည်')
      const newId = shortUUID().new()
      setCharacters([
        ...characters,
        makeCharacter( newId, characterName.trim(), selectedColor)
      ])
      setCharacterName('')
    } catch(e) {
      handleErrorMessage(e)
    }
  }, [characters, selectedColor, characterName])

  // On Selected Character, when user select to add new messages , eg. Left, right, center thining message
  const onSelectedCharacter = useCallback((charId: string) => {
    setSelectedCharacter(characters.find(char => char.id === charId))
  }, [characters, selectedCharacter])

  /**
   * All Messages Methods
   */

  // When Author Delete Message
  const onDeleteMessage = useCallback((mesId: string) => {
    setMessages(messages.filter(mes => mes.id !== mesId))
    updateMessageToServer(messages.filter(mes => mes.id !== mesId))
  }, [messages])

  const onEditMessage = useCallback((updatedMessage: contextType, serialNumber: number) => {
    const index = messages.findIndex(mes => mes.id === updatedMessage.id)
    // Af first we make updateMessage
    let returnMessage = [...messages]
    if (updatedMessage.context_position === 'CENTER') {
      updatedMessage.type = 'THINKING_MESSAGE'
    }
    returnMessage[index] = updatedMessage
    
    // If We need to change Position
    const changePosition = serialNumber - 1
    const isNeedToChangePosition = changePosition !== index
    const removeUpdateMessages = messages.filter(mes => mes.id !== updatedMessage.id)

    if (isNeedToChangePosition && serialNumber === messages.length) {
      // Go To Last Message
      returnMessage = [ ...removeUpdateMessages, updatedMessage]
    } else if ( isNeedToChangePosition && changePosition === 0 ) {
      // Go To First Message
      returnMessage = [ updatedMessage, ...removeUpdateMessages]
    } else if ( isNeedToChangePosition ) {
      // If Between two values
      returnMessage = [...removeUpdateMessages]
      returnMessage.splice(changePosition, 0, updatedMessage)
    }
    setMessages(returnMessage)
    updateMessageToServer(returnMessage)
  }, [messages])

  const onCreateMessage = useCallback(( inputMessage: string, position: 'LEFT' | 'RIGHT' | 'CENTER') => {
    try {
      if (!selectedCharacter) throw new Error('ဇာတ်ကောင်ရွေးရန်လိုအပ်ပါသည်')
      if (!inputMessage.trim()) throw new Error('စာသားကို ရိုက်ထည့်ပေးရန်လိုအပ်ပါသည်')

      const character = new Character(selectedCharacter)
      const newContext = new Context(makeContext(null, inputMessage, character, position))

      setMessages([... messages, newContext])
      updateMessageToServer([... messages, newContext])

    } catch (e) {
      handleErrorMessage(e)
      throw (e)
    }
  }, [messages, selectedCharacter])

  // Every Changes Character
  const updateMessageToServer = useCallback( async (gotMessage?: contextType[]) => {
      setIsUpdatingEditor(true)
      try {
          const url = `${API_URL}/episode/${episode_id}/update-context`
          const options = {
              method: 'PUT',
              headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({ context: gotMessage ? gotMessage :  messages })
          }
          const response = await fetch(url, options)
    
          const res = await response.json()
          setIsUpdatingEditor(false)
    
      } catch (e) {
          setIsUpdatingEditor(false)
      }
  }, [messages])


  return {
    isUpdatingEditor,
    
    backgroundContextImage,

    // All Character Data
    characterName,
    characters,
    selectedCharacter,
    colors,
    selectedColor,

    // Character Methods,
    onSelectColor,
    onDeleteCharacter,
    onChangeCharacterName,
    onCreateCharacter,
    onSelectedCharacter,
    
    // Messages Data
    messages,

    // Messages Methods
    onDeleteMessage,
    onEditMessage,
    onCreateMessage,
  }
}