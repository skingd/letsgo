import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import * as spawns from "../common/spawn.js";
import { today } from "user-activity";
import { goals } from "user-activity";

const mainLoopWait = 1000; //300000
var recordedActiveMinutes = 0;
var usableMinutes = 0;

console.log("Steps: " + today.local.steps);
console.log("Calories: " + today.local.calories + "/ Burned: " + goals.calories);

spawns.createSpawn();

let mybutton = document.getElementById("feedbutton");
var spawnHealthLabel = document.getElementById("spawnHealth");
spawnHealthLabel.text = "Health: " + spawns.currentHealth;


async function mainLoop() {
  var healthCycle = 0;
  while(true){
    spawns.changeCurrentCalories(-5);
    
    getActivity();
    //console.log("Calories: " + spawns.currentCalories);
    var y = await wait("Executing");
    healthCycle++;
    if(healthCycle === 12){
      console.log('Increased minutes');
      var healthIncrease = usableMinutes * 2;
      console.log("Health to add: " + healthIncrease);
      console.log('increase health');
      spawns.changeCurrentHealth(healthIncrease);
      console.log("done changing health");
      usableMinutes = 0;
      spawns.changeCurrentHealth(-2);
      spawnHealthLabel.text = "Health: " + spawns.currentHealth;
      healthCycle = 0;
    }
  }
}

function getActivity(){
  var diffActiveMinutes = today.local.activeMinutes - recordedActiveMinutes;
  console.log("Active Minutes: " + recordedActiveMinutes);
  if(diffActiveMinutes > 0){
    console.log("inside active if");
    usableMinutes += diffActiveMinutes;
    recordedActiveMinutes = today.local.activeMinutes;
  }
  console.log("Total Active Minutes: " + recordedActiveMinutes + " | " + "Usable Active Minutes: " + usableMinutes);
}


mybutton.onactivate = function(evt) {
  console.log("CLICKED!");
  feedSpawn();
}

function feedSpawn(){
  spawns.changeCurrentCalories(350);
}

function wait(x){
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, mainLoopWait);
  });
}

mainLoop();