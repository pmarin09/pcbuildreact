import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom';

  const Context  = React.createContext()
  function ContextProvider({children}){
  //LIGHT AND DARK THEME
  const [theme, setTheme] = useState("light")
  const fpsbuildsurl ="https://fpsbuilds-back-prod.herokuapp.com"
  // "http://localhost:3000"
  // "https://fpsbuilds-back-staging.herokuapp.com"
  // "https://fpsbuilds-back-prod.herokuapp.com"
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
    const g = document.getElementById("build-section")
    if (x && loggedInStatus === "LOGGED_IN") {
      x.classList.add("dark");
      y.classList.add("dark");
      z.classList.add("dark");
    }else if(x) {
      x.classList.add("dark");
      y.classList.add("dark");
    } else if(p){
      p.classList.add("dark")
    }else if(b){
      b.classList.add("dark")
      f.classList.add("dark")
      g.classList.add("dark")
    }
  }
  function removeDarkTheme() {
    const x = document.getElementById("discussions-table");
    const y = document.getElementById("allforums-box");
    const z = document.getElementById("new-discussion-button")
    const p = document.getElementById("posts-container")
    const b = document.getElementById("build-form")
    const f = document.getElementById("create-build-table")
    const g = document.getElementById("build-section")
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
      g.classList.remove("dark")
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
  const adminId = 9
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
        console.log(allBuilds)
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
      fetch(`${fpsbuildsurl}/likes.json`)
      .then (res => res.json())
      .then (data => setLikes(data))
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
      fetch(`${fpsbuildsurl}/favorites.json`)
      .then (res => res.json())
      .then (data => setFavorites(data))
  }
  function updateBuildPosts(){
    fetch(`${fpsbuildsurl}/buildposts.json`)
    .then (res => res.json())
    .then (data => setBuildPosts(data))
}
  function updateUsers(){
    fetch(`${fpsbuildsurl}/users.json`)
    .then (res => res.json())
    .then (data => setUsers(data))
    }
  function updateImages(){
    setTimeout(() => {fetch(`${fpsbuildsurl}/pcbuilds.json`)
    .then (res => res.json())
    .then (data => setAllBuilds(data))
    },500)
    }
  function updateBuilds(){
    setTimeout(() => {fetch(`${fpsbuildsurl}/pcbuilds.json`)
    .then (res => res.json())
    .then (data => setAllBuilds(data))
    },500)
    }
  const[loggedInStatus, setLoggedInStatus]=useState("NOT_LOGGED_IN")
  const[user, setUser]=useState({})
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const history = useHistory()
  function handleLogout() {
   setLoggedInStatus("NOT_LOGGED_IN")
   setUser({})
   localStorage.removeItem("token")
   console.log(user)
  }
  function handleLogoutClick() {
    setLoggedInStatus("NOT_LOGGED_IN")
    setUser({})
    localStorage.removeItem("token")
    }
  //JWT Token Auth
  const [form, setForm] = useState("")
  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token){
      fetch(`${fpsbuildsurl}/auto_login`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(data => {
        setUser(data)
        console.log(user)
      })
      setLoggedInStatus("LOGGED_IN")
    }else if(!token){
    setLoggedInStatus("NOT_LOGGED_IN")
    console.log(user)
  }}, [])
  const handleLogin = (user) => {
    setUser(user)
  }
  const handleFormSwitch = (input) => {
    setForm(input)
  }
  const handleAuthClick = () => {
    const token = localStorage.getItem("token")
    fetch(`${fpsbuildsurl}/user_is_authed`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
  }
    return(
            <Context.Provider value = {{
                fpsbuildsurl,
                handleLogin,
                handleFormSwitch,
                handleAuthClick,
                handleLogoutClick,
                setLoggedInStatus,
                theme,
                setTheme,
                checkThemeStatus,
                toggleTheme,
                users,
                setUsers,
                user,
                setUser,
                adminId,
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
                updateUsers,
                updateImages,
                updateBuilds,
                updateBuildPosts,
                loggedInStatus
            }}>
                {children}
            </Context.Provider>
        )
}
export {ContextProvider, Context}