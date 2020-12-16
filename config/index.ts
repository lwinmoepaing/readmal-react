export const BASE_API_URL = process.env.BASE_API_URL || ''

export const API_URL = process.env.API_URL || ''

export const BASE_URL = process.env.BASE_URL || ''

interface CategoryList {
     title: string
     value: string
}

export const CHARACTER_COLORS = [
     '#55efc4', '#81ecec', '#74b9ff', '#a29bfe', '#dfe6e9', '#00b894', '#00cec9', '#0984e3', '#6c5ce7', '#b2bec3', // American
     '#ffeaa7', '#fab1a0', '#ff7675', '#fd79a8', '#636e72', '#fdcb6e', '#e17055', '#d63031', '#e84393', // American
]

export const CATEGORY_LIST: CategoryList[] = [
     { title: 'ထိတ်လန့်ဖွယ်ဇာတ်လမ်း', value: 'Horror' },
     { title: 'ဟာသဇာတ်လမ်း',value: 'Comedy' },
     { title: 'ရိုမန်စ့်ဇာတ်လမ်း',value: 'Romance' },
     { title: 'စုံထောက်ဇာတ်လမ်း',value: 'Detective' },
]

export interface MetaDataType {
     itemCount: number
     perPage: number
     pageCount: number
     currentPage: number
     serialNumber: number
     hasPrevPage: boolean
     hasNextPage: boolean
     prevPage: string | null
     nextPage: string | null
}

export interface childrenProps {
     children?: JSX.Element | JSX.Element[] | string | string[] | Element;
}

export interface SideBarType {
     name: string
     icon: string
     url: string
}


// Side Bar Route List
const ADMIN_SIDE_BAR: SideBarType[] = [
     { name: 'Home', icon: 'dashboard', url: '/admin'}
]

const AUTHOR_SIDE_BAR: SideBarType[] = [
     { name: 'Home', icon: 'dashboard', url: '/author'},
     { name: 'About', icon: 'chat', url: '/author/about'},
]

const USER_SIDE_BAR: SideBarType[] = [
     { name: 'Home', icon: 'dashboard', url: '/user' }
]

const DEFAULT_SIDE_BAR: SideBarType[] = [
     { name: 'Home', icon: 'dashboard', url: '/'}
]

type roleType = 'author' | 'admin' | 'user'

export const getSideBar = (roleName : roleType): SideBarType[] => {
     const role = roleName?.toString()?.toLowerCase()
     switch(role) {
          case 'admin': 
               return ADMIN_SIDE_BAR
          case 'author':
               return AUTHOR_SIDE_BAR
          case 'user':
               return USER_SIDE_BAR 
          default:
               return DEFAULT_SIDE_BAR
     }
}

export const CarouselResponsive = {
     superLargeDesktop: {
       breakpoint: { max: 4000, min: 3000 },
       items: 4,
     },
     desktop: {
       breakpoint: { max: 3000, min: 1024 },
       items: 3,
     },
     tablet: {
       breakpoint: { max: 1024, min: 464 },
       items: 1.5,
     },
     mobile: {
       breakpoint: { max: 464, min: 0 },
       items: 1,
     },
}

export const translateErrorMessage = (mes: string): string => {
     let returnMessage = mes

     if (mes === 'There should be at least 80 line messages.') {
          returnMessage = 'အနည်းဆုံး စာကြောင်းရေ ဂ၀ ရှိဖို့လိုအပ်ပါသည်။'
     }

     if (mes === 'You need to publish previous episode first.') {
          returnMessage = 'အပိုင်းဟောင်း များကို အရင်တင်ပြီးမှ လက်ရှိအပုဒ်ကို Publish လုပ်ပေးပါ။'
     }

     if (mes === '"title" is not allowed to be empty') {
          returnMessage = 'ခေါင်းစဉ် ထည့်ရန်လိုအပ်ပါသည်။'
     }
     
     if (mes === 'There must be at least one published episode.') {
          returnMessage = 'အနည်းဆုံး အပိုင်း တစ်ပိုင်း ကို Publish တင်ပေးရန်လိုအပ်ပါသည်။'
     }

     if (mes === 'You had to make sure all episodes need to be published.') {
          returnMessage = 'အပိုင်း အားလုံးကို Publish တင်ပြီးမှ ဇတ်သိမ်းပေးနိုင်ပါမည်။'
     }
     
     if (mes === '"description" is not allowed to be empty') {
          returnMessage = 'အကြောင်းအရာ ထည့်ပေးရန်လိုအပ်ပါသည်။'
     }

     if (mes === 'Story has no episodes') {
          returnMessage = 'Story တွင် အပိုင်းလုံး၀ မရှိသေးပါ။'
     }
     
     return returnMessage
}