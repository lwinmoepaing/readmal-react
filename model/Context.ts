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
	context_position: "left" | "center" | "right",
	context_url: string,
	is_theme_change: boolean,
    is_theme_change_url: string,
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
    context_position: "left" | "center" | "right"
    context_url: string
    is_theme_change: boolean
    is_theme_change_url: string
    character: characterType

    // Custom Type 
    // It is not access from server side data
    is_show_character: boolean = true

    constructor({
        type = 'MESSAGE',
        message = '',
        context_position = 'left',
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

const makeCharacter = (id: string, name: string, color: string): characterType => ({ id, name, color })

const makeContext = (
    id: string ,
    message: string,
    character: characterType,
    context_position: string = 'left',
    type: string = 'MESSAGE',
    context_url: string = '',
    is_theme_change: boolean = false,
    is_theme_change_url: string = '',
    is_show_character: boolean = true
): any  => {
    id = id || shortUUID().new();

    return {
        id,
        type,
        message,
        context_position: context_position?.toLowerCase(),
        context_url,
        is_theme_change,
        is_theme_change_url,
        character,
        is_show_character
    }
}

export const makeSampleContexts = (): contextType[] => {
  
    const [MgMg, AgAg, MiNi] = [
        new Character(makeCharacter('1', 'မောင်မောင်', '#405caa')),
        new Character(makeCharacter('2', 'အောင်ကောင်း', '#265856')),
        new Character(makeCharacter('3', 'မိနီ', '#ffff1e')),
    ]

    const contextMessages = [
        new Context(makeContext(null, 'သာကြီးတို့နေကောင်းကြလား', MgMg)),
        new Context(makeContext(null, 'နင်တို့ကလည်းဟာ အဲ့လောက်ကြာနေကြတာလား', MiNi, 'RIGHT')),
        new Context(makeContext(null, 'ဘာလား မိနီ', AgAg)),
        new Context(makeContext(null, 'နင် မိတ်ကပ်ပြင်ရင် ဒီထက်တောင်ကြာသေးတယ်', AgAg)),
        new Context(makeContext(null, 'ဟုတ်တယ် ဒီလောက်လေးတော့ စောင့်သင့်ပါတယ်ဟာ', MgMg)),
    ]

    return contextMessages
}