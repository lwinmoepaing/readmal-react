import shortUUID from 'short-uuid'

export interface characterType {
	id: string,
	name: string,
	color: string
}

export interface contextType {
    id: string,
	type: string,
	message: string,
	context_position: "LEFT" | "CENTER" | "RIGHT",
    context_url: string,
    has_audio: boolean,
    audio_url: string,
	is_theme_change: boolean,
    theme_change_url: string,
    is_show_character: boolean,
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
    id: string
    type: string
    message: string
    context_position: "LEFT" | "CENTER" | "RIGHT"
    context_url: string
    has_audio: boolean
    audio_url: string
    is_theme_change: boolean
    theme_change_url: string
    character: characterType

    // Custom Type 
    // It is not access from server side data
    is_show_character: boolean = true

    constructor({
        id,
        type = 'MESSAGE',
        message = '',
        context_position = 'LEFT',
        context_url = '',
        has_audio = false,
        audio_url = '',
        is_theme_change = false,
        theme_change_url = '',
        character,
    }: contextType) {
        this.id = id 
        this.type = type
        this.message = message
        this.context_position = context_position
        this.context_url = context_url
        this.has_audio = has_audio
        this.audio_url = audio_url
        this.is_theme_change = is_theme_change
        this.theme_change_url = theme_change_url
        this.character = character
    }

}

export const makeCharacter = (id: string, name: string, color: string): characterType => ({ id, name, color })

export const makeContext = (
    id: string ,
    message: string,
    character: characterType,
    context_position: 'LEFT' | 'RIGHT' | 'CENTER' = 'LEFT',
    type: string = 'MESSAGE',
    context_url: string = '',
    is_theme_change: boolean = false,
    theme_change_url: string = '',
    is_show_character: boolean = true
): any  => {
    id = id || shortUUID().new();

    return {
        id,
        type,
        message,
        context_position: context_position?.toUpperCase(),
        context_url,
        is_theme_change,
        theme_change_url,
        character,
        is_show_character
    }
}

export const makeSampleContexts = (): contextType[] => {
  
    const [MgMg, AgAg, MiNi] = [
        new Character(makeCharacter('1', 'မောင်မောင်', '#405caa')),
        new Character(makeCharacter('2', 'အောင်ကောင်း', '#9cd6d3')),
        new Character(makeCharacter('3', 'မိနီ', '#ffff1e')),
    ]

    const contextMessages = [
        new Context(makeContext(null, 'ဒီလမ်းက လူခြေတိတ်နေတာပဲနော်', MgMg)),
        new Context(makeContext(null, 'နင်တို့ကလည်းဟာ ဒီအချိန်ကြီးမှ ကားပျက်ကတယ်လို့', MiNi, 'RIGHT')),
        new Context(makeContext(null, 'ဘာလား မိနီ', AgAg)),
        new Context(makeContext(null, 'နင်ပါလာလို့လေ ငါတို့ဘာသာသွားတုန်းက အကောင်းကြီး', AgAg)),
        new Context(makeContext(null, 'ဟေ့ကောင်တွေ ဟိုနားက သစ်ပင်ကြီးနောက်မှာ ငါတခုခုတွေ့လိုက်သလို့ပဲ', MgMg, 'RIGHT')),
    ]

    return contextMessages
}