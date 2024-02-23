const Success = "Success";
const ERROR = "ERROR";


export function fetchUserData(users){
  return{
    type:Success,
    payload:users,
  }
}

export function showStatus(error){
  return{
    type:ERROR,
    payload:error
  }
}