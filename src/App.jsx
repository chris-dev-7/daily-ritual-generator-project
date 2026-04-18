import Header from './components/Header.jsx'
import Button from './components/Button.jsx'
import ActivityCard from './components/ActivityCard.jsx'
import {  useState, useLayoutEffect } from 'react'
import morningRoutineActivities from './data/morningRoutineActivities.js'
import creativityActivities from './data/creativityActivities.js'
import movementActivities from './data/movementActivities.js'
import mindfulnessActivities from './data/mindfulnessActivities.js'
import eveningWindDownActivities from './data/eveningWindDownActivities.js'
import { usePersistedState } from './utilities/usePersistedState.jsx'
import { useRef } from 'react'
import { shareDailyRitual } from './utilities/shareUtils.jsx'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { CSSPlugin } from 'gsap/CSSPlugin'




gsap.registerPlugin( ScrollTrigger, SplitText, CSSPlugin, useGSAP )



function App(){

const [selectedActivities, setSelectedActivities] = usePersistedState('key',[]);
const [hasGenerated, setHasGenerated] = useState(false)
const [ showIntro, setShowIntro  ] = useState(true)

//GSAP Animation Ref 

const desktopViewTitleRef = useRef()

//GSAP Plug in Configuration

useGSAP(() => {

  const mm = gsap.matchMedia()
  let cancelled = false

  const buildDesktopTitle = () => {
    if (cancelled) return
    mm.add('(min-width: 768px)', () => {

      if (!desktopViewTitleRef.current) return

      const desktopTitleSplit = SplitText.create(desktopViewTitleRef.current, { type: 'lines'})

      if (!desktopTitleSplit.lines?.length) return

      gsap.set(desktopTitleSplit.lines, { opacity: 0})

      const desktopTitleTl = gsap.timeline({
        scrollTrigger: {
          trigger: desktopViewTitleRef.current,
          start: 'top 40%',
          toggleActions: 'play reverse play reverse'
        }
      })

      desktopTitleTl.to(desktopTitleSplit.lines, { opacity: 1,duration: 2})

    })
    ScrollTrigger.refresh()
  }

  if (typeof document !== 'undefined' && document.fonts?.ready) {
    document.fonts.ready.then(buildDesktopTitle)
  } else {
    buildDesktopTitle()
  }

  return () => {
    cancelled = true
    mm.revert()
  }
})




function generateRandomActivities(){

    const allRitualActivities = [ morningRoutineActivities,creativityActivities,movementActivities,mindfulnessActivities,eveningWindDownActivities  ];
    const categoryNames = [ 'Morning Ritual', 'Creativity', 'Movement', 'Mindfulness', 'Evening Wind Down']
    const randomlySelectedActivities = allRitualActivities.map((categoriesArray, index) => {
        
    const randomActivityIndex = Math.floor(Math.random() * categoriesArray.length)


      if(selectedActivities[index]?.isLocked ){
          return selectedActivities[index]
      }else{
           return {category: `${categoryNames[index]}`,
                  ...categoriesArray[randomActivityIndex], 
                 isLocked:false
                }
      }
    })
    
    setSelectedActivities(randomlySelectedActivities)  

  }

  // Activity Card Toggle + isLocked Logic 

  const activityCardToggleLock = (index) => {
    const selectedActivitiesArray = selectedActivities.map((activity, mappedIndex) => {

    return {
      ...activity,
      isLocked: index == mappedIndex ? !activity.isLocked : activity.isLocked
    }
  })

  setSelectedActivities(selectedActivitiesArray) 
}

//Button Click Logic: generate new activities OR save & share when all locked
const handleGeneratedClick = async () => {
  if (checkIfAllLocked()) {
    await shareDailyRitual(saveShareRef, selectedActivities)
    return
  }
  generateRandomActivities()
  setHasGenerated(true)
  setShowIntro(false)
}


//Checks if all components are locked
const checkIfAllLocked = () => {
  return  selectedActivities.length > 0 && 
          selectedActivities.every((activity) => activity.isLocked)

}

// useRef for Saving/Sharing Feature 

const saveShareRef = useRef()

  useLayoutEffect(() => {
    const ritualParam = new URLSearchParams(window.location.search).get('ritual')
    if (!ritualParam) return
    try {
      const decoded = decodeURIComponent(ritualParam)
      const data = JSON.parse(decoded)
      if (!Array.isArray(data.activities) || data.activities.length === 0) return
      setSelectedActivities(data.activities)
      setHasGenerated(true)
      setShowIntro(false)
      const cleanUrl = new URL(window.location.href)
      cleanUrl.searchParams.delete('ritual')
      const next =
        cleanUrl.pathname +
        (cleanUrl.searchParams.toString() ? `?${cleanUrl.searchParams}` : '') +
        cleanUrl.hash
      window.history.replaceState({}, '', next)
    } catch {
      /* invalid share link */
    }
  }, [])

// Component Return

  return (
    <div
      ref={saveShareRef}
      className="ritual-capture-root relative min-h-screen bg-[radial-gradient(rgb(251,113,133),rgb(253,186,116))]"
    >
      
      <Header showIntro={showIntro} /> 

      <h1 className='hidden md:block font-playfair text-white text-7xl text-center py-2' ref={desktopViewTitleRef}>
        Daily Ritual Generator
      </h1>

      <div className='hidden md:flex md:justify-center md:gap-4'>
        {
          selectedActivities.map((activity, index) => {
            return <ActivityCard 
            key={activity.id}  
            category={activity.category}
            name={activity.name} 
            description={activity.description}
            duration={activity.duration}
            isLocked={activity.isLocked}
            onToggle={() => {activityCardToggleLock(index)}}
            />
          })
        }

      </div>

      {/* Mobile only: 2 rows */}
      <div className='md:hidden space-y-2 px-2 pt-1 pb-2'>
        <div className='flex justify-center gap-2'>
          {selectedActivities.slice(0, 3).map((activity, index) => (
            <ActivityCard
              key={activity.id}
              category={activity.category}
              name={activity.name}
              description={activity.description}
              duration={activity.duration}
              isLocked={activity.isLocked}
              onToggle={() => activityCardToggleLock(index)}
            />
          ))}
        </div>
        <div className='flex justify-center gap-2'>
          {selectedActivities.slice(3, 5).map((activity, index) => (
            <ActivityCard
              key={activity.id}
              category={activity.category}
              name={activity.name}
              description={activity.description}
              duration={activity.duration}
              isLocked={activity.isLocked}
              onToggle={() => activityCardToggleLock(index + 3)}
            />
          ))}
        </div>
      </div>

      <Button onClick={handleGeneratedClick} hasGenerated={hasGenerated}
               allLocked={checkIfAllLocked()} lockedActivities={selectedActivities} />
      <p className='text-white text-xl text-center tracking-widest font-roboto pt-2 pb-4 md:pt-0 md:pb-0'>REDD-DESIGN</p>
  
    </div>
  
  )
}

export default App