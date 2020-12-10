export const BASE_API_URL = process.env.BASE_API_URL || ''

export const API_URL = process.env.API_URL || ''

interface CategoryList {
     title: string
     value: string
}

export const CATEGORY_LIST: CategoryList[] = [
     { title: 'ထိတ်လန့်ကြောက်မက်ဖွယ်', value: 'Horror' },
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