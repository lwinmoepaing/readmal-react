export const BASE_API_URL = process.env.BASE_API_URL || ''

export const API_URL = process.env.API_URL || ''


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
     children: JSX.Element | JSX.Element[] | string | string[];
}

export interface SideBarType {
     name: string
     icon: string
     url: string
}


// Side Bar Route List
const ADMIN_SIDE_BAR: SideBarType[] = [
     { name: 'Home', icon: 'home', url: '/admin'}
]

const AUTHOR_SIDE_BAR: SideBarType[] = [
     { name: 'Home', icon: 'home', url: '/author'},
     { name: 'About', icon: 'home', url: '/author/about'},
]

const USER_SIDE_BAR: SideBarType[] = [
     { name: 'Home', icon: 'home', url: '/user' }
]

const DEFAULT_SIDE_BAR: SideBarType[] = [
     { name: 'Home', icon: 'home', url: '/'}
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