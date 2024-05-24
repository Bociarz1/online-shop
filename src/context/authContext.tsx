import {createContext, ReactNode, useEffect, useState} from "react";

const AuthContext: React.Context<any> = createContext(null);
const AuthProvider = ({ children }: {children: ReactNode}) => {
  const [authUser, setAuthUser] = useState({
    username: "",
    password: "",
  });
  const [availableUsers,setAvailableUsers] = useState<{
    username: "",
    password: "",
  }[]>([]);

  useEffect(() => {
    try {
      const availableUsersFromLocalStorage = JSON.parse(localStorage.getItem('availableUsers') || '[]');
      const authUserFromLocalStorage = JSON.parse(localStorage.getItem('username') || '{"username": "", "password": ""}');

      setAvailableUsers(availableUsersFromLocalStorage);
      setAuthUser(authUserFromLocalStorage);
    } catch (error) {
      console.error('Error parsing localStorage data', error);
      setAvailableUsers([]);
      setAuthUser({ username: "", password: "" });
    }
  }, []);
  async function login(loginData:{username:string;password: string}): void {
    setAuthUser(() => {
      localStorage.setItem('username',JSON.stringify(loginData));
    const isUserRegister: boolean = availableUsers.filter(item => item.username === loginData.username).length > 0
    !isUserRegister && alert('użytkownik nie jest zarejestrowany');
      return loginData
    })
  }
  function logout(): void {
    setAuthUser({username:"", password: ""})
    localStorage.removeItem('username');
  }
  function register(loginData:{username:string;password: string}): void {
  setAvailableUsers((prev: any) => {
    const updateAvailableUsers = [...prev,loginData];
    localStorage.setItem('availableUsers',JSON.stringify(updateAvailableUsers));
    return updateAvailableUsers
  })
    setAuthUser(() => {
      localStorage.setItem('username',JSON.stringify(loginData));
      return loginData
    })
  }

  return (
    <AuthContext.Provider value={{ authUser, login, register,logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
