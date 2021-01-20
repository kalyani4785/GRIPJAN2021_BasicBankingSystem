import { json } from "body-parser";
import React,{useEffect} from "react"
import ReactDOM from "react-dom"


function BodyTransfer() {

    var [data, update] = React.useState();
    var [allow, updateAllow] = React.useState(false);
    var [ac1,updateac1] = React.useState({});
    var [ac2,updateac2] = React.useState({});
    var [amt,updateamt] = React.useState(-1);
    var [done,updatedone] = React.useState(false);

    var[history,updateHistory] = React.useState();
    var[hist,updateHist] = React.useState(false);



   
    function createRows(data,index){
        return  <tr id="dataRow" style={{color:"black"}}>
        <th scope="row" style={{textAlign:"center"}} >{index}</th>
        <td>{data.from}</td>
        <td>{data.to}</td>
        <td>{data.date} </td>
        <td>{data.time}</td>
        <td>{data.amount}</td> 
      </tr>;
    }
   
            

    async function fetchAgain() {
        const res = await fetch("/transacHistory");
        res
          .json()
          .then((res) => {
           if(res.code === 1)
           updateHistory(res.foundItems);
            {updateHist(true);}
            console.log(res.foundItems);
             
        });
      }


    async function checkOut() {
        updateHist(false);
        const res = await fetch("/transact/?from="+ac1.account+"&to="+ac2.account+"&amount="+amt+"&ac1name="+ac1.name+"&ac2name="+ac2.name);
        res
          .json()
          .then((res) => {
               updatedone(true);
               update(res.foundItems);
               fetchAgain();
               var i;
               for(i=0;i<15;i++)
                 {  
                     if(res.foundItems[i].account === ac1.account )
                        updateac1(res.foundItems[i]);
                        if(res.foundItems[i].account === ac2.account )
                        updateac2(res.foundItems[i]);
                          
                 }
            
        });
      }


    useEffect(() => {
        async function fetchData() {
            const res = await fetch("/getd");
            res
                .json()
                .then((res) => {
                    update(res.foundItems);
                    updateAllow(true);
                    console.log(res.foundItems);
                });
        }
        fetchData();
    }, []);
    useEffect(() => {
        async function fetchData() {
            const res = await fetch("/transacHistory");
            res
                .json()
                .then((res) => {
                      updateHistory(res.foundItems);
                    console.log(res);
                    if(res.code === 1)
                    {updateHist(true);} 
                 
                    
                });
        }
        fetchData();
    }, []);
    


    function createOption(data) {
    
        return <option value={JSON.stringify(data)}>{data.name} | {data.account}</option>
    }








    return <div class="container">
        <div class="row">
            <div class="col-xs-6">

                <select id="selectOption" style={{ width: "50rem", fontSize: "2rem", paddingLeft: "5%" }} onChange={(event) => { updateac1(JSON.parse(event.target.value)); updatedone(false)}} >
                    <option value="" disabled selected hidden >From:-</option>
                    {
                        (allow === true) ? data.map(createOption) :
                            <h1>No data available</h1>
                    }

                 
                </select>

            </div>
            <div class="col-xs-6">

                <select id="selectOption" style={{ width: "50rem", fontSize: "2rem", paddingLeft: "5%" }} onChange={(event) => { updateac2(JSON.parse(event.target.value)) ;updatedone(false)}} >
                    <option value="" disabled selected hidden >To:-</option>
                    {
                        (allow === true) ? data.map(createOption):
                            <h1>No data available</h1>
                    }
                </select>

            </div>
        </div>
        <div  style={{textAlign:"center",padding:"3rem"}}>   
        <label style={{fontSize:"3rem",color:"black"}}>Amount:- <input style={{color:"black"}} type="number" placeholder="Enter Amount" onChange={(event)=>{updateamt(event.target.value);updatedone(false)}} ></input></label>
         <br></br>

         {
           (ac1 !== null && ac2 !== null && amt !== -1&& amt>0 && ac1 !== ac2) ? 
                    ((ac1.current - amt) >= 0 )   ? 
                    <button type="button" class="btn btn-danger" onClick={()=>{checkOut();}}>Confirm</button>
                    
                    : <h1 style={{color:"black"}}>Not Enough money in {ac1.name}'s account for transfer</h1> 
                         :  <div></div>
                      
         }
          { (done === true) ?<div> <h1 style={{color:"white"}}>  ***....Transaction Sucessfull....***</h1> 
          <h2 style={{color:"black"}}>{ac1.name}'s Bal : {ac1.current }</h2> 
          <h2 style={{color:"black"}}>{ac2.name}'s Bal : {ac2.current }</h2> 
          </div>
          : <div></div>}
        
        </div>
{/* history */}
<div class="container" style={{textAlign:"center",backgroundColor:"white"}}>
 <h1 >___Transaction History___</h1>  
<table class="table table-bordered" style={{textAlign:"center",marginBottom:"20%"}}> 
         <thead>
           <tr id="dataColumns" style={{textAlign:"center",color:"yellowgreen"}}>
             <th scope="col" style={{textAlign:"center"}}>Sl. No. </th>
             <th scope="col">From</th>
             <th scope="col">To</th>
             <th scope="col">Date </th>
             <th scope="col">Time</th>
             <th scope="col">Amount</th>
           
           </tr>
         </thead>
         <tbody>
            { (hist === true)?  history.map((obj,index)=>createRows(obj,index))       
            
            : <h1>The Funds has been reset. So, Data is not available</h1>} 
         </tbody>
       </table>
       </div>



{/* ------------ */}
    </div>



}
export default BodyTransfer;