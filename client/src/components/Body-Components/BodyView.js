import React,{useEffect} from "react"
import ReactDOM, { render } from "react-dom"
import BodyTransfer from "./BodyTransfer";


function BodyView(){

    var [data,update] = React.useState();
    var [allow,updateAllow] = React.useState(false);
    var [allow2,updateAllow2] = React.useState(-1);
    var [data2,updateData2] = React.useState();
    var [allow3,updateAllow3] = React.useState(false);
    var [amt,updateamt] = React.useState(-1);
    var [ac2,updateac2] = React.useState(-1);
    var [view,update11]= React.useState("");
 
    function createOption(data) {
    
      return <option value={JSON.stringify(data)}>{data.name} | {data.account}</option>
  }


    async function fetchData2() {
      const res = await fetch("/transact/?from="+data2.account+"&to="+ac2.account+"&amount="+amt+"&ac1name="+data2.name+"&ac2name="+ac2.name);
      res
        .json()
        .then((res) => {
            update(res.foundItems);
          
      });
    }
    async function fundReset() {
      const res = await fetch("/resetD");
      res
        .json()
        .then((res) => {
            update(res.foundItems);
          
      });
    }


    
    function checkOut(ac1){
      var i,a=0;
      console.log(ac2);
      console.log(ac1);
          for(i=0;i<15;i++)
           { if(ac1 == data[i].account)
            {  
              if(data[i].current-amt >= 0)
                a=1;
            }
           
           }
        if(a === 1)
          {update11("transaction ... Done");
            fetchData2();  
            a=0;
        }
          else
           update11("Not possible");
                
    }



    function transfer(ac1){
      return <div style={{padding:"1rem",color:"black"}}>
          <label>From:- {ac1}</label>
          <label>To:-    <select style={{color:"black"}}  onChange={(event) => { updateac2(JSON.parse(event.target.value));console.log(event.target.value);}} >
                    <option value="" disabled selected hidden ></option>
                    { data.map(createOption) 
                    }
                    </select>
         </label>
          <label>Amount:- <input style={{color:"black"}} type="number" placeholder="Enter Amount" onChange={(event)=>{updateamt(event.target.value);update11("");}}  ></input></label>
          <button type="button" class="btn btn-danger" onClick={()=>{checkOut(ac1)}}>Transfer</button>
              <h1>{view}</h1>
         
      </div>

    }

    function display(data){
      return <div style={{borderStyle:"inset",color:"black",textAlign:"center"}}>
       <h3>Name:-        {data2.name}</h3>
       <h3>Accont No. :- {data2.account}</h3>
     
      <h3>Mob No.  :- {data2.mobile}</h3>
      <h3>Branch :- {data2.branch}</h3> 
      <h3>Current Bal :-  ₹{data2.current}</h3>
      <button type="button" class="btn btn-primary" onClick={()=>{updateAllow3(true)}}>Transfer Money</button>
     
      
      </div>
    }


   function createRows(data,index){
       return  <tr id="dataRow">
       <th scope="row" >{data.id}</th>
       <td>{data.name}</td>
       <td>{data.account}</td>
       <td>{data.mobile}</td>
       <td>{data.branch}</td>
      
      

       <td>
          {data.current}
         <a id="viewCustomer" href="javascript:void(0);" onClick={()=>{updateAllow2(true);updateData2(data);updateAllow3(false)}}> View </a>
       </td>
     </tr>;
   }
        
    
      useEffect(() => {
        async function fetchData() {
          const res = await fetch("/getd");
          res
            .json()
            .then((res) => {
                update(res.foundItems);
                updateAllow(true);
          });
        }
        fetchData();
      },[]);




   return <div class="container">
   <div class="row">
     <div class="col-xs-9">
       <table class="table table-bordered" >
         <thead>
           <tr id="dataColumns">
             <th scope="col">Id</th>
             <th scope="col">Customer Name</th>
             <th scope="col">Account Number</th>
             <th scope="col">Mobile No.</th>
             <th scope="col">Branch</th>
             <th scope="col">Balance</th>
           </tr>
         </thead>
         <tbody>
            { (allow === true)?  data.map((obj,index)=>createRows(obj,index)) 
            
            
            
            
            
            
            
            : <h1>Data Not Available</h1>} 
         </tbody>
       </table>
     </div>
     <div class="col-xs-3">
        
         
     <button type="button" class="btn btn-success" onClick={fundReset}>Reset Funds</button>

         {
           (allow2 === true) ? display(data2 ): <h1>Select to display</h1>

         }
         {
           (allow3 === true) ? transfer(data2.account) : <h1>...</h1>
         }
     </div>
   </div>


 </div>

}
export default BodyView;