import React from 'react'

const Contacts = React.lazy(() => import('./views/contacts/Contact'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/contacts', name: 'Contacts', element: Contacts },
]

export default routes
