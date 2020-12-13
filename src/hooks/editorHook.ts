import { useState, useEffect, useCallback } from 'react' 
import { CHARACTER_COLORS } from '../../config'
import { characterType, contextType } from '../../model/Context'
import { makeCharacter } from '../../model/Context'
import shortUUID from 'short-uuid'
import errorHandleHook from './errorHandleHook'
export interface EditorHook {
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

  // Messages Data
  messages: contextType[]

  // Character Methods
  onDeleteMessage: (messageId: string) => void
}

interface EditorHookProps {
  context: contextType[] 
  episode_id: string
  backgroundImage: string
}

export default function editorHook ({ context = [] , episode_id,  backgroundImage}: EditorHookProps): EditorHook {
  // Background Context Image
  const [backgroundContextImage, setBackgroundContextImage] = useState<string>(backgroundImage)

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
  }, [characters, messages])

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

  /**
   * All Messages Methods
   */

  // When Author Delete Message
  const onDeleteMessage = useCallback((mesId: string) => {
    setMessages(messages.filter(mes => mes.id !== mesId))
  }, [messages])

  return {
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
    
    // Messages Data
    messages,

    // Messages Methods
    onDeleteMessage,
  }
}