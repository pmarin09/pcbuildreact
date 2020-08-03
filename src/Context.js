import React, { useState, useEffect } from "react"
import axios from "axios"
import { useHistory } from 'react-router-dom';

const Context  = React.createContext()

function ContextProvider({children}){

  //LIGHT AND DARK THEME
  
  const [theme, setTheme] = useState("light")
  const fpsbuildsurl = "http://fpsbuilds-back-staging.herokuapp.com"

  
  function toggleTheme(){
      const checkBox = document.getElementById("theme-checkbox")
      const hiddenCheckBox = document.getElementById('theme-checkbox-hidden')
      
    if(checkBox.checked == false){
      hiddenCheckBox.disabled = true;
      setTheme("dark")
       checkBox.checked = true
       addDarkTheme()
      
    } else if(checkBox.checked == true){
      hiddenCheckBox.disabled = false;
      setTheme("light")
       checkBox.checked = false 
       removeDarkTheme()
    }
    
    
      sendDarkTheme()
  }

  function sendDarkTheme (){
    const form = new FormData(document.getElementById("setDarkTheme"));
  fetch(`${fpsbuildsurl}/users/${user.id}`, {
    method: "PATCH",
    body:form
  });
 
}
  

  function addDarkTheme() {
    const x = document.getElementById("discussions-table");
    const y = document.getElementById("allforums-box");
    const z = document.getElementById("new-discussion-button")
    const p = document.getElementById("posts-container")
    const b = document.getElementById("build-form")
    const f = document.getElementById("create-build-table")
    if (x && loggedInStatus === "LOGGED_IN") {
      x.classList.add("dark");
      y.classList.add("dark");
      z.classList.add("dark");
    }else if(x) {
      x.classList.add("dark");
      y.classList.add("dark");
    } else if(p){
      p.classList.add("dark")
    }else if(f){
      b.classList.add("dark")
      f.classList.add("dark")
    }
  }
  function removeDarkTheme() {
    const x = document.getElementById("discussions-table");
    const y = document.getElementById("allforums-box");
    const z = document.getElementById("new-discussion-button")
    const p = document.getElementById("posts-container")
    const b = document.getElementById("build-form")
    const f = document.getElementById("create-build-table")
    if (x && loggedInStatus === "LOGGED_IN") {
      x.classList.remove("dark");
      y.classList.remove("dark");
      z.classList.remove("dark");
    }else if(x) {
      x.classList.remove("dark");
      y.classList.remove("dark");
    }
    else if(p){
      p.classList.remove("dark")
    }else if(b){
      b.classList.remove("dark")
      f.classList.remove("dark")
    }
  }

  function checkThemeStatus(){
 setTimeout( () =>{
    if(user.dark_theme === true){
      addDarkTheme()
      document.getElementById("theme-checkbox").checked = true
    } else if (user.dark_theme === false){
      document.getElementById("theme-checkbox").checked = false
      removeDarkTheme()
    }else{
      return false
    }},500)
  }
  /////

  const [users, setUsers]=useState([])
  const usersUrl = `${fpsbuildsurl}/users.json`
  useEffect(()=>{
      fetch(usersUrl)
      .then (res => res.json())
      .then (data => setUsers(data))
      console.log(users)
  },[])
  
  const [allBuilds, setAllBuilds] = useState([])
    const [favoriteBuilds, setFavoriteBuilds] = useState([])

    useEffect(()=>{
        fetch(`${fpsbuildsurl}/pcbuilds.json`)
        .then (res => res.json())
        .then (data => setAllBuilds(data))
    },[])

    const [forums, setForums]=useState([])
    const forumsUrl = `${fpsbuildsurl}/forums.json`
    useEffect(()=>{
        fetch(forumsUrl)
        .then (res => res.json())
        .then (data => setForums(data))
        console.log(forums)
    },[])

    const [discussions, setDiscussions]=useState([])
    const disscusionsUrl = `${fpsbuildsurl}/discussions.json`
    useEffect(()=>{
        fetch(disscusionsUrl)
        .then (res => res.json())
        .then (data => setDiscussions(data))
        console.log(discussions)
    },[])

    const [posts, setPosts]=useState([])
    const postsUrl = `${fpsbuildsurl}/posts.json`
    useEffect(()=>{
        fetch(postsUrl)
        .then (res => res.json())
        .then (data => setPosts(data))
        console.log(posts)
    },[])

    const [buildposts, setBuildPosts]=useState([])
    const buildpostsUrl = `${fpsbuildsurl}/buildposts.json`
    useEffect(()=>{
        fetch(buildpostsUrl)
        .then (res => res.json())
        .then (data => setBuildPosts(data))
        console.log(buildposts)
    },[])

    const [parts, setParts]=useState([])
    const partsUrl = `${fpsbuildsurl}/parts.json`
    useEffect(()=>{
        fetch(partsUrl)
        .then (res => res.json())
        .then (data => setParts(data))
        console.log(parts)
    },[])


    const [likes, setLikes]=useState([])
    const likesUrl = `${fpsbuildsurl}/likes.json`
    useEffect(()=>{
        fetch(likesUrl)
        .then (res => res.json())
        .then (data => setLikes(data))
        console.log(likes)
    },[])

    function updateLikes(){
      setTimeout(() => {fetch(`${fpsbuildsurl}/likes.json`)
      .then (res => res.json())
      .then (data => setLikes(data))
      },50)
     }

    const [favorites, setFavorites]=useState([])
    const favoritesUrl = `${fpsbuildsurl}/favorites.json`
    useEffect(()=>{
        fetch(favoritesUrl)
        .then (res => res.json())
        .then (data => setFavorites(data))
        console.log(favorites)
    },[])

    function updateFavorites(){
      setTimeout(() => {fetch(`${fpsbuildsurl}/favorites.json`)
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
      .get(`${fpsbuildsurl}/logged_in`, { withCredentials: true })
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
      .delete(`${fpsbuildsurl}/logout`, { withCredentials: true })
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
                fpsbuildsurl,
                theme,
                setTheme,
                checkThemeStatus,
                toggleTheme,
                users,
                setUsers,
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