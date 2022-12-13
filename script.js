// Write your JavaScript code here!
//2 remaining issues 1 is scripthelper returns an error when it gets imported
// 2 is that json does not return a variable
function addDestinationInfo(num) {
    // Here is the HTML formatting for our mission target div.
    let divTarget = document.getElementById("missionTarget")
    console.log(divTarget)
    fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){    
        return response.json()
    }).then(function(json){
    divTarget.innerHTML +=` 
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${json[num].name} </li>
                     <li>Diameter: ${json[num].diameter} </li>
                     <li>Star: ${json[num].star}</li>
                     <li>Distance from Earth: ${json[num].distance} </li>
                     <li>Number of Moons: ${json[num].moons} </li>
                 </ol>
                 <img src="${json[num].image}">
    `
    })
}
 
 function validateInput(testInput) {
        if(testInput[0] === "" || testInput[1]=== "") {
            window.alert("please make sure the pilot's and copilot's names are filled out correctly")
            return false
    }else if(isNaN(testInput[2]) === true || isNaN(testInput[3])=== true){
        console.log(isNaN(testInput[2]))
        console.log(isNaN(testInput[3]))

            window.alert("Please make sure a number is entered for fuel level & cargo mass")
            return false
    }else{
        return true
    }

}


 
 
 function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    //why list???? does it really matter when its already listed in html?
    //need to check fuel & mass
    if(fuelLevel >= 1000 && cargoLevel <= 1000){
        document.innerHTML = ""
        document.innerHTML += `
        <h2 style="color:green">Shuttle is ready for launch!</h2>
        <li>Pilot ${pilot} is ready for launch</li>
        <li>Co-Pilot ${copilot} is ready for launch</li>
        <li>Fuel Level high enough for launch</li>
        <li>Cargo mass low enough for launch</li>
        `
        //need to put the && first
    }else if(fuelLevel < 1000 && cargoLevel >1000){
        document.innerHTML = ""
        document.innerHTML += `
        <h2 style="color:red">Shuttle is NOT ready to launch</h2>
        <li>Pilot ${pilot} is ready for launch</li>
        <li>Co-Pilot ${copilot} is ready for launch</li>
        <li>Fuel Level too low for launch</li>
        <li>Cargo mass too high for launch</li>
        `
    }else if(fuelLevel < 1000) {
        document.innerHTML = ""
        document.innerHTML += `
        <h2 style="color:red">Shuttle is NOT ready to launch</h2>
        <li>Pilot ${pilot} is ready for launch</li>
        <li>Co-Pilot ${copilot} is ready for launch</li>
        <li>Fuel Level too low for launch</li>
        <li>Cargo mass low enough for launch</li>
        `
    }else if (cargoLevel > 1000){
        document.innerHTML = ""
        document.innerHTML += `
        <h2 style="color:red">Shuttle is NOT ready to launch</h2>
        <li>Pilot ${pilot} is ready for launch</li>
        <li>Co-Pilot ${copilot} is ready for launch</li>
        <li>Fuel Level is high enough for launch</li>
        <li>Cargo mass too high for launch</li>
        `
    }    
 }
 
 async function myFetch() {
     console.log("test")
     let planetsReturned;
     let response = await fetch('https://handlers.education.launchcode.org/static/planets.json')
     planetsReturned = await response.json()
    console.log(planetsReturned)
     return planetsReturned;
 }
 
 function pickPlanet(planets) {
    let randomNum = Math.random()*5
    randomNum = Math.round(randomNum)
    return randomNum
 }
window.addEventListener("load", function() {
    // let formId = document.getElementById("formField")
    // function handleForm(event) { event.preventDefault(); } 
    // formId.addEventListener('submit', handleForm);
    let planetNum = pickPlanet()
    addDestinationInfo(planetNum)

    
 });
window.addEventListener("submit",function(event){
    event.preventDefault()
    let formInfo = (document.querySelectorAll("form"))
    let formData = new FormData(formInfo[0])
    let dataArray = []
    dataArray.push(formData.get("pilotName"))
    dataArray.push(formData.get("copilotName"))
    dataArray.push(Number(formData.get("fuelLevel")))
    dataArray.push(Number(formData.get("cargoMass")))
    console.log(formData)
    console.log(dataArray)
    if (validateInput(dataArray) === true){
    let launchInfoHtml = document.getElementById("launchStatusCheck")
    console.log(launchInfoHtml)
       formSubmission(launchInfoHtml,dataArray,dataArray[0],dataArray[1],dataArray[2],dataArray[3])
    }
})