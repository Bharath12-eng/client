import React from "react";
import { useState } from "react";
import Qualification from "./qualifications";




const AddTabs = ()=>{
    const [tabs,settabs] = useState(0);
    const activaTab = (tabNumber)=>{
        settabs(tabNumber);
    }

    const showtabs = () =>{

        if(tabs===0  && response.data.savedata.step==="qualifications"){
          setActiveTab(tabs===1);

          console.log("qualification data")
         
        }else if(tabs===2 && response.data.savedata.step=="workhistory"){
          setActiveTab(tabs===2)
        }else if(tabs===3 && response.data.savedata.step=="otherDetails"){
           setActiveTab(tabs===3)
        }
    }
    return(
        <>
        <div className="category">
            <div onClick={()=>activaTab(0)} style={{"color": tabs==0 ? "Blue": ""}}>
                <h1>personalDetails</h1>
            </div>
            <div onClick={()=>activaTab(1)} style={{"color":tabs==1 ? "Blue" :""}}>
                <Qualification />
            </div>
            <div onClick={()=>activaTab(2)} style={{"color":tabs==2 ? "Blue" : ""}}>
                <h2>qualificactions</h2>
            </div>
            <div onClick={()=>activaTab(3)} style={{"color":tabs===3 ? "Blue" : ""}}>
                <h2>qualificactions</h2>
            </div>

            


        </div>
        </>
    )
}

export default AddTabs;