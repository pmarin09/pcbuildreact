import React, { useState, useEffect } from "react"
import axios from "axios"
import { useHistory } from 'react-router-dom';

const Context  = React.createContext()

function ContextProvider({children}){
    
  const [users, setUsers]=useState([])
  const usersUrl = "http://localhost:3000/users.json"
  useEffect(()=>{
      fetch(usersUrl)
      .then (res => res.json())
      .then (data => setUsers(data))
      console.log(users)
  },[])
  

  const [allBuilds, setAllBuilds] = useState([])
    const [favoriteBuilds, setFavoriteBuilds] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:3000/pcbuilds.json`)
        .then (res => res.json())
        .then (data => setAllBuilds(data))
    },[])

    const [forums, setForums]=useState([])
    const forumsUrl = "http://localhost:3000/forums.json"
    useEffect(()=>{
        fetch(forumsUrl)
        .then (res => res.json())
        .then (data => setForums(data))
        console.log(forums)
    },[])

    const [discussions, setDiscussions]=useState([])
    const disscusionsUrl = "http://localhost:3000/discussions.json"
    useEffect(()=>{
        fetch(disscusionsUrl)
        .then (res => res.json())
        .then (data => setDiscussions(data))
        console.log(discussions)
    },[])

    const [posts, setPosts]=useState([])
    const postsUrl = "http://localhost:3000/posts.json"
    useEffect(()=>{
        fetch(postsUrl)
        .then (res => res.json())
        .then (data => setPosts(data))
        console.log(posts)
    },[])

    const [buildposts, setBuildPosts]=useState([])
    const buildpostsUrl = "http://localhost:3000/buildposts.json"
    useEffect(()=>{
        fetch(buildpostsUrl)
        .then (res => res.json())
        .then (data => setBuildPosts(data))
        console.log(buildposts)
    },[])

    const [parts, setParts]=useState([])
    const partsUrl = "http://localhost:3000/parts.json"
    useEffect(()=>{
        fetch(partsUrl)
        .then (res => res.json())
        .then (data => setParts(data))
        console.log(parts)
    },[])

    const [likes, setLikes]=useState([])
    const likesUrl = "http://localhost:3000/likes.json"
    useEffect(()=>{
        fetch(likesUrl)
        .then (res => res.json())
        .then (data => setLikes(data))
        console.log(likes)
    },[])

    function updateLikes(){
      setTimeout(() => {fetch(`http://localhost:3000/likes.json`)
      .then (res => res.json())
      .then (data => setLikes(data))
      },50)
     }

    const [favorites, setFavorites]=useState([])
    const favoritesUrl = "http://localhost:3000/favorites.json"
    useEffect(()=>{
        fetch(favoritesUrl)
        .then (res => res.json())
        .then (data => setFavorites(data))
        console.log(favorites)
    },[])

    function updateFavorites(){
      setTimeout(() => {fetch(`http://localhost:3000/favorites.json`)
      .then (res => res.json())
      .then (data => setFavorites(data))
      },50)
      }
    
    
    const[loggedInStatus, setLoggedInStatus]=useState("NOT_LOGGED_IN")
    const[user, setUser]=useState({})
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const history = useHistory()
  
    function checkLoginStatus() {
    axios
      .get("http://localhost:3000/logged_in", { withCredentials: true })
      .then(response => {
        if (
          response.data.logged_in &&
          loggedInStatus ==="NOT_LOGGED_IN"
        ) {
          setLoggedInStatus("LOGGED_IN")
          setUser(response.data.user)
          
        } else if (
          !response.data.logged_in &
          (loggedInStatus === "LOGGED_IN")
        ) {
          setLoggedInStatus("NOT_LOGGED_IN")
          setUser({})
        }
      })
      .catch(error => {
        console.log("check login error", error);
      });
  }
  
  function handleLogout() {
   setLoggedInStatus("NOT_LOGGED_IN")
   setUser({})
  }
  
  function handleLogin(data) {
    setLoggedInStatus("LOGGED_IN")
    setUser(data.user)
  }
  
  useEffect(()=>{
    checkLoginStatus()
  },[])

  function handleLogoutClick() {
    axios
      .delete("http://localhost:3000/logout", { withCredentials: true })
      .then(response => {
        handleLogout();
      })
      
      .catch(error => {
        console.log("logout error", error);
      });
      console.log(user)
    }

    
  function handleSuccessfulAuth(data) {
        handleLogin(data);
        
      }
    return(

            <Context.Provider value = {{
                users,
                user,
                allBuilds,
                setAllBuilds,
                favoriteBuilds,
                forums, 
                discussions,
                posts,
                buildposts,
                parts,
                likes,
                setLikes,
                updateLikes,
                favorites,
                favoritesUrl,
                setFavorites,
                updateFavorites,
                loggedInStatus,
                checkLoginStatus,
                handleLogout,
                handleLogoutClick,
                handleLogin,
                handleSuccessfulAuth
            
            }}>
                {children}
            </Context.Provider>
        )
}




export {ContextProvider, Context}