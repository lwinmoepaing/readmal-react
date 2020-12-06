export interface characterType {
	id: string,
	name: string,
	color: string
}

// enum ContextDirection {
//     CENTER = "CENTER",
//     LEFT = "LEFT",
//     RIGHT = "RIGHT",
// }

// enum ContextMessageType {
//     AUDIO = 'AUDIO', 
//     MESSAGE = 'MESSAGE', 
//     THINKING_MESSAGE = 'THINKING_MESSAGE', 
//     IMAGE = 'IMAGE'
// }

export interface contextType {
	type: string,
	message: string,
	context_position: string,
	context_url: string,
	is_theme_change: boolean,
	is_theme_change_url: string,
	character: characterType
}

export class Character implements characterType {
    id: string
    name: string
    color: string

    constructor({id, name, color}: characterType) {
        this.id = id
        this.name = name
        this.color = color
    }
}

export class Context implements contextType {
    type: string
    message: string
    context_position: string
    context_url: string
    is_theme_change: boolean
    is_theme_change_url: string
    character: characterType
    
    constructor({
        type = 'MESSAGE',
        message = '',
        context_position = 'LEFT',
        context_url = '',
        is_theme_change = false,
        is_theme_change_url = '',
        character,
    }: contextType) {
        this.type = type
        this.message = message
        this.context_position = context_position
        this.context_url = context_url
        this.is_theme_change = is_theme_change
        this.is_theme_change_url = is_theme_change_url
        this.character = character
    }
}
const makeCharacter = (id: string, name: string, color: string): characterType => ({ id, name, color})

const makeContext = (
    message: string,
    character: characterType,
    context_position: string = 'LEFT',
    type: string = 'MESSAGE',
    context_url: string = '',
    is_theme_change: boolean = false,
    is_theme_change_url: string = '',
): contextType => {
    return {
        type,
        message,
        context_position,
        context_url,
        is_theme_change,
        is_theme_change_url,
        character,
    }
}

export const makeSampleContexts = (): contextType[] => {
  
    const [MgMg, AgAg, MiNi] = [
        new Character(makeCharacter('1', 'Mg Mg', 'red')),
        new Character(makeCharacter('2', 'Aung Aung', 'red')),
        new Character(makeCharacter('3', 'Mi ni', 'red')),
    ]

    const contextMessages = [
        new Context(makeContext('Hello', MgMg)),
        new Context(makeContext('Hello', MiNi, 'RIGHT')),
        new Context(makeContext('Hello', AgAg)),
    ]

    return contextMessages
}