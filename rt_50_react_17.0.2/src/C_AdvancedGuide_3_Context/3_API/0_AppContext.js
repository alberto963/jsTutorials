import { createContext } from 'react'

const defaultValue = { user: 'logo192.png', size: 25, updateSize: () => { } }
export const AppContext = createContext(defaultValue)

/* FROM REACT DOC:
    The defaultValue argument is only used when a component does not have a matching Provider above it in the tree.
    This default value can be helpful for testing components in isolation without wrapping them.

    NOTE: passing undefined as a Provider value does not cause consuming components to use defaultValue.
*/

// The following are used for multiple context
export const AppUserContext = createContext('logo192.png')
export const AppSizeContext = createContext(25)