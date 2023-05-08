import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => { 
    const getLightModeFromStorage = () => localStorage.getItem('light-mode') !== 'night';
    const getTokenFromStorage = () => localStorage.getItem('token');
    const getRoleFromStorage = () => localStorage.getItem('role');
    const getUIDFromStorage = () => localStorage.getItem('uid');

    const [lightMode, setLightMode] = useState(getLightModeFromStorage());
    const [token, setToken] = useState(getTokenFromStorage());
    const [role, setRole] = useState(getRoleFromStorage);
    const [uid, setUid] = useState(getUIDFromStorage);

    const toggleLightMode = () => { 
        localStorage.setItem('light-mode', lightMode ? 'night' : 'day');
        setLightMode(getLightModeFromStorage());
    }
    const addToken = (newToken) => { 
        localStorage.setItem('token', newToken);
        setToken(newToken);
    }
    const removeToken = () => { 
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('uid');

        setToken(getTokenFromStorage);
        setRole(getRoleFromStorage);
        setUid(getUIDFromStorage);
    }

    const changeRole = (newRole) => { 
        localStorage.setItem('role', newRole);
        setRole(getRoleFromStorage);
    }

    const changeUid = (newUid) => { 
        localStorage.setItem('uid', newUid);
        setUid(getUIDFromStorage);
    }

    return <GlobalContext.Provider value={{ lightMode, toggleLightMode, token, addToken, removeToken, role, changeRole, uid, changeUid }}>
        {children}
    </GlobalContext.Provider>
}

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalContextProvider }
export default useGlobalContext