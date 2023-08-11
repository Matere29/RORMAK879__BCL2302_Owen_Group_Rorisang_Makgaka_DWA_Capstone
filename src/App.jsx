import React from 'react'
import SignIn from './components/SignIn';
import Preview from './components/Preview';
import Season from './components/Season'
import Episodes from './components/Episodes';
import { supabase } from './components/SignIn';
import Hero from './components/Hero';
import logo from './components/favicon_package_v0.16/logo.png'
import { FaBars, FaTimes} from 'react-icons/fa'
import { useRef} from 'react'
import './styles/main.css'
// import GenreSort from './components/GenreSort';

 
function App() {
 
  const navRef = useRef()
  const [user, setUser] = React.useState('NoneUserLoggedIn')
  const [search, setSearch] = React.useState('');
  const [phase, setPhase] = React.useState('signUpPhase')
  const [phaseState, setPhaseState] = React.useState({
 
    Preview: [],
    searchPreview: [],
    Season: '',
    Episode: ''
  });
  


  function HandleSearch(event) {
    setSearch(event.target.value);
  }


  React.useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
         console.log("User signed in successfully:", session.user.email);
         setUser(session.user.email)
        setPhase('startPhase')
      }
    });
    return () => {
      authListener.unsubscribe;
    };
  }, []);

  React.useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then(res => res.json())
      .then(data => {
        if (phase === 'startPhase') {
          setPhaseState(prevState => ({
            ...prevState,
            Preview: data
          }))
          setPhase('preview')
          setPhaseState(prevState => ({
            ...prevState,
            searchPreview: data
          }))
        }
      })
  }, [phase])

  console.log(phaseState.Preview)
  console.log(phase)



  async function HandlePreviewClick(event) {
    if (phase === 'preview') {
      const buttonId = event.currentTarget.id
      const showTitle = event.currentTarget.title
   
      if (buttonId) {
        try {
          const response = await fetch(`https://podcast-api.netlify.app/id/${buttonId}`);
          const data = await response.json();
          setPhaseState(prevState => ({
            ...prevState,
            Season: data.seasons
          }))
          setPhase('seasonPage')
        } catch (error) {
          console.error('Error fetching Preview data:', error.message);
        }
      }
    }
  }


  function HandleSeasonClick(event) {
    if (phase === 'seasonPage') {
      const seasonButtonId = event.currentTarget.id
      const seasonTitle = event.currentTarget.title
      if (seasonButtonId) {
        try {
          const seasonArray = phaseState.Season[seasonButtonId].episodes
          setPhaseState(prevState => ({
            ...prevState,
            Episode: seasonArray
          }))
          setPhase('episodePage')
        } catch (error) {
          console.error('Error fetching Preview data:', error.message);
        }
      }
    }
  }
  
  const FilteredElements = phaseState.Preview.filter((book) => book.title.toLowerCase().includes(search.toLowerCase()));
  function handleGenreButtonClick(event){
    const selectedGenre = event.target.value
    console.log(selectedGenre)
    setPhaseState(prevPhase => ({
      ...prevPhase,
      Preview: phaseState.Preview.filter((book) => book.genres.includes(1))
    }))
  }
  function sortByAscending() {
    setPhaseState(prevPhase => ({
      ...prevPhase,
      Preview: phaseState.Preview.sort((a, b) => a.title.localeCompare(b.title))
    }))
  }
  function sortByDescending() {
    setPhaseState(prevPhase => ({
      ...prevPhase,
      Preview: phaseState.Preview.sort((a, b) => b.title.localeCompare(a.title))
    }))
  }
  function sortByLatest() {
    setPhaseState(prevPhase => ({
      ...prevPhase,
      Preview: phaseState.Preview.sort((a, b) => new Date(b.updated) - new Date(a.updated))
    }))
  }
  function sortByOldest() {
    setPhaseState(prevPhase => ({
      ...prevPhase,
      Preview: phaseState.Preview.sort((a, b) => new Date(a.updated) - new Date(b.updated))
    }))
  }

  function HandleBack() {
    if (phase === "seasonPage") {
      setPhase('preview')
    }
    else if (phase === 'episodePage') {
      setPhase('seasonPage')
    }
    else if (phase === 'preview') {
      setPhase('signUpPhase')
    }

  }
  const showNavbar = () => {
    navRef.current.classList.toggle('responsive_nav')
  }
  const buttonStyle = {
    backgroundColor: '#3498db',
    color: '#ffffff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '25%',
  };
  return (
    <>
  
      {(phase !== 'signUpPhase' && phase !== 'startPhase') &&
       <>
       
       <header>
       <img src={logo} alt='logo' className='nav-logo' />
       <h3>Podcast</h3>
       <nav ref={navRef}>
        <a href="#">Home</a>
        <a href="#">About</a>
        {/* <a href="#">Login</a> */}
        
       
            <button style={buttonStyle} className="backButton" onClick={HandleBack}>
              {phase === 'preview' ? 'LOGOUT' : 'BACK'}</button>
              <h4>User : {user}</h4>
        {phase === "preview" && <input className='input-box'onChange={HandleSearch} placeholder="Search..." value={search} type='text'/>}
      <button className='nav-btn nav-close-btn' onClick={showNavbar}>
        <FaTimes />
      </button>
       </nav>
       <button className="nav-btn" onClick={showNavbar}>
       <FaBars />
       </button>
       </header>

      {phase === "preview" &&
          <div>
            <button style={buttonStyle}onClick={sortByAscending}>A-Z</button>
            <button style={buttonStyle}onClick={sortByDescending}>Z-A</button>
            <button style={buttonStyle}onClick={sortByLatest}>Latest</button>
            <button style={buttonStyle}onClick={sortByOldest}>Oldest</button>
          </div>
          }
          {/* <GenreSort /> */}
       
          <Hero />
      </>
  
      }
       <div className='DisplayStage'>
        <div className='Display'>
      
      { phase === 'signUpPhase' ? <SignIn />   :
        phase ===  'preview' ?  <Preview   
                                     HandlePreviewClick={HandlePreviewClick}   
                                     Preview={FilteredElements} /> :
        phase === "seasonPage"  ? <Season
                                    HandleSeasonClick={HandleSeasonClick}
                                    Preview={phaseState.Season}/> :
        phase === "episodePage" ?  <Episodes
                                    Preview={phaseState.Episode}
                                    email={user}
                                    /> : console.log('No data Found')
      }
      </div>
     </div>
    </>

  )
}

export default App;