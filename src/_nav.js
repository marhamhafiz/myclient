import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilContact
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Contacts',
    to: '/contacts',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
]

export default _nav
