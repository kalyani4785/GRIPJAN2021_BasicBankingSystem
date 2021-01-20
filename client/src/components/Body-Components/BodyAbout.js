import React from "react"
import pic from "./photo.jpeg"
import ReactDOM from "react-dom"


function BodyAbout() {
    // dkfjklsd

    return  <div class="container" style={{ textAlign: "center" }}>
            <img id="about-img" src={pic} />
            <div class="row icons">
            <div class="col-xs-3">
                <a href="https://github.com/kalyani4785/GRIPJAN2021_BasicBankingSystem" target="_blank"><i class="fab fa-github icon"></i></a><br></br>
                <h2>Github</h2>
                </div>
            <div class="col-xs-3">
                <a href="https://docs.google.com/document/d/1By6kaPKucAwuhO6IDKmxdStg59wExpWNtxeqZo4cg34/edit#heading=h.3di0ddshabli" target="_blank"><i class="far fa-file icon"></i></a><br></br>
                <h2>Resume</h2>
                </div>
            <div class="col-xs-3">
                <a href="https://www.stopstalk.com/user/profile/morningstar" target="_blank"><i class="fas fa-paper-plane icon"></i></a><br></br>
                <h2>Stopstalk</h2>
            </div>
            <div class="col-xs-3">
                <a href="https://www.linkedin.com/in/kalyani-kumari-5041151a0" target="_blank"><i class="fab fa-linkedin icon"></i></a><br></br>
                <h2>linkedin</h2>
            </div>
        </div>
        </div>



}
export default BodyAbout;