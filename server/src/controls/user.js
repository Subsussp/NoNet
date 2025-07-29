const users = require('../models/user.js')
const {auth,gen} = require("../utils/authpg.js");


let regestier =  async function (req, res,next) {
    let hashsalt = gen(req.body.psswd);
    let user = await users.findOne({Phonenumber:req.body.Phonenumber}).then((user)=>user).catch((err)=>{console.log(err)})
    if(user){
        return res.json({ msg: 'User exixts' })
    }
    
      try {  
          await users.create({
          name: req.body.username,
          Phonenumber:req.body.Phonenumber,
          email: req.body.email,
          hash: hashsalt.hash,
          salt: hashsalt.salt,
        });}
      catch(err){
          console.log(err)
      };
      return next()
      ;}


let patchuser = async function (req,res,next){
    const userin = users.findById(req.session.user._id)
    let newfields = {}
    let updateduser = req.body
    for(field in updateduser){
        if(updateduser[field] != userin[field] ){
            newfields[field] = updateduser[field]
        }}
        let upuser = await users.findOneAndUpdate({_id:req.session.user._id},{$set: newfields},{new:true}).then((usero) =>{ req.session.user = usero 
            return usero})
            
    return res.send(`
    <body>
          <div class="profile-container">
              <div class="profile-pic" alt="Profile Picture"></div>
              <h2>${upuser.username}</h2>
              
              <div class="profile-info">
                  
                  <label>Email:</label>
                  <p>${upuser.email}</p>
                  
                  <label>Phone Number:</label>
                  ${upuser.Phonenumber}
                  <button type="button">Save Changes</button>
              </div>
          </div>
      </body>
      `)
    }
    function showprofile(req, res) {
        let {name,Phonenumber,email,url} = req.session.user
        res.send(`
          <div class="profile-container">
              <img id="pic" class="profile-pic" src="${url}" alt="Profile Picture"></img>
              <input type='text' id='username'value='${name}' readonly>
               <button class="edit-btn" onclick="enableEdit('username')">Edit</button>
              <div class="profile-info">
                  
                  <label>Email:</label>
                  <p>${email}</p>
                  <label>Phone Number:</label>
                  <input type='tel' id='phone' value='${Phonenumber}' readonly>
                  <button class="edit-btn" onclick="enableEdit('phone')">Edit</button>
                  <button type="button" id='btn' >Save Changes</button>
              </div>
          </div>
          <script>
          function enableEdit(fieldId) {
            const inputField = document.getElementById(fieldId);
            inputField.removeAttribute("readonly");
            inputField.focus();

            // Reapply readonly when the input field loses focus
            inputField.addEventListener("blur", () => {
                inputField.setAttribute("readonly", true);
            }, { once: true });
        }
                  function openFileDialog() {
                    document.getElementById('imageInput').click();
    }
       async function updateImage(){
                const fileInput = document.getElementById('imageInput');
                const displayImage = document.getElementById('pic');
                if (fileInput.files && fileInput.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        displayImage.setAttribute('src',e.target.result)
                        displayImage.style.display = 'block';
                        patchphoto()
                    };
                    reader.readAsDataURL(fileInput.files[0]);
                }
        }
            function Deleteephoto() {
                const urL = document.getElementById("pic") ;
                if(!urL.getAttribute('src') == '') { 
                    urL.setAttribute('src','')
                    patchphoto()
                    urL.style.display = 'none';
                }
                
            }
          let btn = document.getElementById('btn');
          function patchphoto(){
                const urL = document.getElementById("pic").getAttribute('src').toString() ;
                 fetch("http://localhost:3001/profile", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        url: urL
                    })})
                .then(response => {
                    if (response.ok) {
                        alert("Profile updated successfully!");
                    } else {
                        alert("Error updating profile.");
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("Error updating profile.");
                });
                }
        let update = () => {
            const namew = document.getElementById("username").value.toString()
            const phone = document.getElementById("phone").value.toString() ;
            fetch("http://localhost:3001/profile", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: namew,
                    Phonenumber: phone
                    })})
            .then(response => {
                if (response.ok) {
                   alert("Profile updated successfully!");
                } else {
                    alert("Error updating profile.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Error updating profile.");
            });}
btn.addEventListener('click', update);
let publicPhoto = document.getElementById('pic')
            if(publicPhoto.getAttribute('src') != ''){
                    publicPhoto.style.display = 'block';
            }
          </script>
      `)}
module.exports = {patchuser,showprofile,regestier}