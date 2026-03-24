import React from 'react';
import { auth } from './firebase/init';
import './App.css';
import { createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut} from 'firebase/auth';
function App() {
  const[user, setUser] = React.useState({}) 
  const[loading,setLoading] = React.useState(true)
  React.useEffect(() =>{
    
    onAuthStateChanged(auth, (user) =>{
     setTimeout(() => {
      
       setLoading(false)
       if(user){
         setUser(user)
         
         console.log(user.email[0].toUpperCase())
        }
        else{
          setUser({})
        }
      }, 1500);
      
    })
  }, [])
  
  function register(){
    createUserWithEmailAndPassword(auth,'email@abc.com','abc123')
    .then((user) => {
    console.log(user)
  })
  .catch((error) =>{
    console.log(error)
  })

  }

  function login(){
    signInWithEmailAndPassword(auth,'email@abc.com','abc123')
  .then(({user}) => {
    console.log(user)
   
    setUser(user)
  })
  .catch((error) =>{
    console.log(error.message)
  })
  }

  function logout(){
    signOut(auth)
    setUser({})
  }
 


  
  return(

  
    <div className="App">
      <nav className='nav__container'>

    <button className='btn' onClick={register}>Register</button>
    <button className='btn' onClick= {login}>Login</button>
 
    <button
     className={`btn ${loading? 'skeleton': ''}`} onClick={logout}
     >
     {loading ? 'Waiting...' :user?.email ?
     user.email[0].toUpperCase() : '' } 
    </button>  


      </nav>
    </div>
  );
}

export default App;
