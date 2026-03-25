import React from "react";
import { auth, db } from "./firebase/init";
import "./App.css";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  async function updatePost() {
    const codedID = "shbOH3XIZqPbwiaIGOwt";
    const postRef = doc(db, "posts", codedID)
      const post = await getPostById(codedID)
    console.log(post)
    const newPost = {
      ...post,
      title: "Keep on going til you get a frontEND!!! job",
    }
    console.log(newPost)
    updateDoc(postRef,newPost)
  }

  function deletePost(){
       const codedID = "shbOH3XIZqPbwiaIGOwt";
    const postRef = doc(db, "posts", codedID)
deleteDoc(postRef)
  }

  function createPost() {
    const post = {
      title: "Keep on going finish strong!!!!!",
      description: "Longer Term Goal!!!!",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post);
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map((ele) => ({ ...ele.data(), id: ele.id }));
    console.log(posts);
  }

  async function getPostById(id) {
    // const codedID = "shbOH3XIZqPbwiaIGOwt";
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    
return postSnap.data();
  }

  async function getPostByUid() {
    const postCollection = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid),
    );
    const { docs } = await getDocs(postCollection);
    console.log(docs.map((docu) => docu.data()));
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setTimeout(() => {
        setLoading(false);
        if (user) {
          setUser(user);

          console.log(user.email[0].toUpperCase());
        } else {
          setUser({});
        }
      }, 1500);
    });
  }, []);

  function register() {
    createUserWithEmailAndPassword(auth, "email@abc.com", "abc123")
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login() {
    signInWithEmailAndPassword(auth, "email@abc.com", "abc123")
      .then(({ user }) => {
        console.log(user);

        setUser(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function logout() {
    signOut(auth);
    setUser({});
  }

  return (
    <div className="App">
      <nav className="nav__container">
        <button className="btn" onClick={register}>
          Register
        </button>
        <button className="btn" onClick={login}>
          Login
        </button>

        <button className={`btn ${loading ? "skeleton" : ""}`} onClick={logout}>
          {loading
            ? "Waiting..."
            : user?.email
              ? user.email[0].toUpperCase()
              : ""}
        </button>
        <button onClick={createPost}>Create Post</button>
        <button onClick={getAllPosts}>Get Posts</button>
        <button onClick={deletePost}>Delete!!!</button>
        <button onClick={updatePost}>update Post</button>
        <button onClick={getPostById}>Get Post by ID</button>
        <button onClick={getPostByUid}>Get Post by Uid</button>
      </nav>
    </div>
  );
}

export default App;
