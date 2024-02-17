import { createContext, useState } from "react";

export const myContext = createContext();

const ContextProvider = (props) => {
  let [isLogin, setIsLogin] = useState(false);
  let [userId, setUserId] = useState("");

  const setIsLoginHandler = (state) => {
    setIsLogin(state);
  };

  const setUserIdHandler = (id) => {
    setUserId(id);
  };

  return (
    <myContext.Provider
      value={{ isLogin, setIsLoginHandler, userId, setUserIdHandler }}
    >
      {props.children}
    </myContext.Provider>
  );
};
export default ContextProvider;
