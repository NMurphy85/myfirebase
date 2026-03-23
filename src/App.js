import React, { useState } from 'react';
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
      setLoading(false)
      console.log(user.email[0].toUpperCase())
      if (user){
        setUser(user)
      }
    })
  }, [])
  
  function register(){
    console.log(user)
  createUserWithEmailAndPassword(auth,'email@abc.com','abc123')
  .then((user) => {
    console.log(user)
  })
  .catch((error) =>{
    console.log(error)
  })

  }

  function login(user){
    signInWithEmailAndPassword(auth,'email@abc.com','abc123')
  .then(({user}) => {
    console.log(user)
   setUser(user)
  })
  .catch((error) =>{
    console.log(error.message)
  })
  }

  function logout(user){
signOut(auth)
console.log(user.email)
setUser({})
  }
  return (
    <div className="App">
      <nav className='nav__container'>

    <button className='btn skeleton' onClick={register}>Register</button>
    <button className='btn skeleton' onClick= {login}>Login</button>
    <button className='btn skeleton' onClick={logout}>{user.email}</button>  
 
      </nav>
    </div>
  );
}

export default App;
