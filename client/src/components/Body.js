import React,{useEffect} from "react";
import ReactDOM from "react-dom";
import BodyTransfer from "./Body-Components/BodyTransfer";
import BodyHome from "./Body-Components/BodyHome";
import BodyAbout from "./Body-Components/BodyAbout";
import BodyView from "./Body-Components/BodyView";



function Body(props){
  





 if(props.num === "Home")
    return <div><BodyHome /></div>;
else if(props.num === "About")
    return <div><BodyAbout /></div>;
else if(props.num === "Transfer")
    return <div><BodyTransfer /></div>;
else if(props.num === "View")
    return <div><BodyView /></div> ;
else 
   return <div id="aky" > ...$$$... </div>;



}

export default Body;