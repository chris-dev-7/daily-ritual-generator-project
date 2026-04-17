
//Saving the Daily Ritual Components
export const setDailyRitual = (key,value) => {

  try{
      window.localStorage.setItem(key, JSON.stringify(value))

  } catch(error) {
    console.log(error)
  }
  

}

// Getting the Daily Ritual Components
export const getDailyRitual = (key) => {

  try{
      const item = window.localStorage.getItem(key)

     return item ? JSON.parse(item) : []

  }catch(error){
    console.log(error)
  }
    
}