import React,{useEffect} from "react";
import Body from "./Body"


function Header(){
  
var [data ,update] = React.useState("Home");

useEffect(() => {
  console.log("hiii");
  async function fetchData() {
    const res = await fetch("/curr");
    res
      .json()
      .then((res) => {
         update(res.paths);
         console.log(res.paths);
    });
  }
  fetchData();
},[]);






  return <div>

 <div class= "header"> 
     <a href="javascript:void(0);" onClick={()=> {update("Home")}}>GRIP Finance Bank</a>
     <a id="header-link" href="javascript:void(0);" onClick={()=> update("View")}>| View Customers |</a>
     <a id="header-link" href="javascript:void(0);" onClick={()=> update("Transfer")}>| Transaction History |</a>
     <a id="header-link" href="javascript:void(0);" onClick={()=> update("About")}>| About |</a>  
</div>

   <Body num={data} />

 </div>


}

export default Header;
