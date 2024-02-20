import { createContext, useState } from "react";

export const myContext = createContext();

const ContextProvider = (props) => {
  let [isDataChanged, setISDataChanged] = useState(false);

  const toggleDataChanged=()=>{
    setISDataChanged((isDataChanged)=>!isDataChanged)
  }

  return (
    <myContext.Provider
      value={{ isDataChanged, toggleDataChanged }}
    >
      {props.children}
    </myContext.Provider>
  );
};
export default ContextProvider;
