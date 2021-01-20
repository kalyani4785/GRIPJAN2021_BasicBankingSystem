import React from "react"
import ReactDOM from "react-dom"
import bank from "./bank.jpg"


function BodyHome(){

   return <div className="BodyHome" >
       <h1>This App is a Demo of "Basic Banking System"</h1>
       <h3>One can view customers , transfers funds in the system </h3>

       <img style={{textAlign:"center"}} src={bank} />

        <div id="BodyHomeSub"> 
            <h2>Developed By:Kalyani kumari</h2>
             <h2>Technologies Used: Node.js,React.js,Express.js,Mongoose,BootStrap,Html,Css</h2>
             <p>For TSF GRIP internship task--1</p>
             <h4>THIS IS DESKTOP VIEW WEB SITE .... PLEASE DO NOT OPEN IT IN MOBILE VIEW</h4>
       </div>
      
   </div>



}
export default BodyHome;