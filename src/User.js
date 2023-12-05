import { createContext, useState } from 'react';

export const UserContext = createContext({
    num: 0,
    setNum: () => {}
});

export const UserContextProvider = (props) => {

    const setNum = (num) => {
      setState({...state, num: num})
    }
  
    const initState = {
      num: 0,
      setNum: setNum
    } 
  
    const [state, setState] = useState(initState)
  
    return (
      <UserContext.Provider value={state}>
        {props.children}
      </UserContext.Provider>
    )
  }
// export default UserContext;