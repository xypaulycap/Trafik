import { useState } from 'react'
import { createContext } from 'react'

export const SubAdminContext = createContext()

const SubAdminContextProvider = (props) => {

    // const [saToken, setSaToken] = useState(localStorage.getItem('saToken') || null)
    const [saRole, setSaRole] = useState(localStorage.getItem('saRole') || null)
    const [maRole, setMaRole] = useState(localStorage.getItem('maRole') || null)
    const value = {

        // saToken,
        // setSaToken,
        saRole,
        setSaRole,
        maRole,
        setMaRole,
    }

    return (
        <SubAdminContext.Provider value={value}>
            {props.children}
        </SubAdminContext.Provider>
    )
}

export default SubAdminContextProvider