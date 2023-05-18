import { createContext,useState,useEffect, Children } from "react";

const DataContext=createContext({})

export const DataProvider=()=>{
    return(
        <DataContext.Provider value={{

        }}>
            {Children}
        </DataContext.Provider>
    )
}