
  var maxHealth = 100;
  export var currentHealth;

  var maxExercise = 100;
  export var currentExercise;

  var maxSleep = 100;
  export var currentSleep;
  
  var maxCalories = 1250;
 export var currentCalories;


export function createSpawn(){
  currentHealth = maxHealth;
  currentExercise = maxExercise;
  currentSleep = maxSleep;
  currentCalories = maxCalories;
  
  console.log(currentCalories);
}

export function changeCurrentCalories(cals){
  if(currentCalories + cals <= maxCalories){
    currentCalories += cals;
  }else if(currentCalories + cals < 0){
    currentCalories = 0;
  }else{
    currentCalories = maxCalories;
  }
  console.log("Calories: " + currentCalories);
}

export function changeCurrentHealth(health){
  console.log(health);
  console.log("checking health");
  if(currentHealth + health <= maxHealth && currentHealth + health > 0){
    console.log("I think I should be adding health");
    currentHealth += health;
    
  }else if(currenthealth + health < 0){
    currentHealth = 0;
    
  }else{
    console.log("lots of health");
    currentHealth = maxHealth;
    
  }
  console.log("Health: " + currentHealth);
}