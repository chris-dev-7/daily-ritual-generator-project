import { useRef } from 'react'
import starSmall from '../assets/backgroundIcons/starSmall.svg'
import starLarge from '../assets/backgroundIcons/starLarge.svg'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { CSSPlugin } from 'gsap/CSSPlugin'



gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP, CSSPlugin)

export default function Header( {showIntro} ) {
  

//Refs for GSAP animation

  const sectionRef = useRef();
  const titleRef = useRef();
  const introRef = useRef();
  const p1Ref= useRef();
  const p2Ref = useRef();
  const p3Ref = useRef();
  const largeStarRightRef = useRef()
  const smallStarTopRef = useRef()
  const smallStarLeftImageRef = useRef()
  const largeStarBottomLeftRef = useRef()
  const largeStarTopLeftRef = useRef()
  const largeStarTopRightRef = useRef()
  const smallStarBottomRef = useRef()


//GSAP React Hook — SplitText after document.fonts.ready so .lines is never empty (avoids "GSAP target not found")
  useGSAP(() => {

    const mm = gsap.matchMedia()
    let cancelled = false

    const runScrollTriggerRefresh = () => {
      ScrollTrigger.refresh()
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/fb86602d-a441-46bd-a3c8-330d35972403',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'07926c'},body:JSON.stringify({sessionId:'07926c',location:'Header.jsx:runScrollTriggerRefresh',message:'ScrollTrigger.refresh after matchMedia',data:{stCount:ScrollTrigger.getAll().length},timestamp:Date.now(),hypothesisId:'H1',runId:'post-fix'})}).catch(()=>{});
      // #endregion
    }

    const buildAnimations = () => {
      if (cancelled) return
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/fb86602d-a441-46bd-a3c8-330d35972403',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'07926c'},body:JSON.stringify({sessionId:'07926c',location:'Header.jsx:buildAnimations',message:'fonts.ready — registering matchMedia + SplitText',data:{showIntro},timestamp:Date.now(),hypothesisId:'fonts',runId:'post-fix'})}).catch(()=>{});
      // #endregion

      mm.add('( max-width: 767px)', () => {

        if (!titleRef.current) return

        const headerRefSplit = SplitText.create(titleRef.current, { type: 'lines', autoSplit: true })
        let p1RefSplit
        let p2RefSplit
        let p3RefSplit
        const introMounted =
          introRef.current &&
          p1Ref.current &&
          p2Ref.current &&
          p3Ref.current
        if (introMounted) {
          p1RefSplit = SplitText.create(p1Ref.current, { type: 'lines', autoSplit: true })
          p2RefSplit = SplitText.create(p2Ref.current, { type: 'lines', autoSplit: true })
          p3RefSplit = SplitText.create(p3Ref.current, { type: 'lines', autoSplit: true })
        }

        if (!headerRefSplit.lines?.length) return
        gsap.set(headerRefSplit.lines, { opacity: 0, y: 50 })

        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 70%',
            end: 'top 30%',
            toggleActions: 'play reverse restart',
          },
        })
        headerTl.to(headerRefSplit.lines, { opacity: 1, y: 0, duration: 1 })

        const introLinesOk =
          introMounted &&
          p1RefSplit?.lines?.length &&
          p2RefSplit?.lines?.length &&
          p3RefSplit?.lines?.length
        if (introLinesOk) {
          const introTl = gsap.timeline({
            scrollTrigger: {
              trigger: introRef.current,
              start: 'top 50%',
              end: 'bottom 50%',
              toggleActions: 'play',
            },
          })
          introTl.fromTo(p1RefSplit.lines, { opacity: 0 }, { opacity: 1, duration: 1.5, x: 20 })
          introTl.to(p1RefSplit.lines, { opacity: 0 })
          introTl.fromTo(p2RefSplit.lines, { opacity: 0 }, { opacity: 1, duration: 1.5, x: -5 }, '>1')
          introTl.to(p2RefSplit.lines, { opacity: 0 })
          introTl.fromTo(p3RefSplit.lines, { opacity: 0 }, { opacity: 1, duration: 1.5, x: 4 }, '>1')
          introTl.to(p3RefSplit.lines, { opacity: 0 })
        }

        const topRightSmallStarTl = gsap.timeline({ repeat: -1, yoyo: true })
        topRightSmallStarTl.fromTo(smallStarTopRef.current, { scale: 1, duration: 2 }, { scale: 2, duration: 2 })

        const topLeftSmallStarTl = gsap.timeline({ repeat: -1, yoyo: true })
        topLeftSmallStarTl.fromTo(smallStarLeftImageRef.current, { scale: 2, duration: 2 }, { scale: 2.5, duration: 2 })

        const topRightLargeStarTl = gsap.timeline({ repeat: -1, yoyo: true })
        topRightLargeStarTl.fromTo(largeStarRightRef.current, { scale: 1.5, duration: 2 }, { scale: 1, duration: 2 })

        const bottomLeftLargeStarTl = gsap.timeline({ repeat: -1, yoyo: true })
        bottomLeftLargeStarTl.fromTo(largeStarBottomLeftRef.current, { scale: 1.5, duration: 2 }, { scale: 1, duration: 2 })
      })

      mm.add('(min-width: 768px)', () => {

        if (!titleRef.current) return

        const headerRefSplit = SplitText.create(titleRef.current, { type: 'lines', autoSplit: true })
        let p1RefSplit
        let p2RefSplit
        let p3RefSplit
        const introMounted =
          introRef.current &&
          p1Ref.current &&
          p2Ref.current &&
          p3Ref.current
        if (introMounted) {
          p1RefSplit = SplitText.create(p1Ref.current, { type: 'lines', autoSplit: true })
          p2RefSplit = SplitText.create(p2Ref.current, { type: 'lines', autoSplit: true })
          p3RefSplit = SplitText.create(p3Ref.current, { type: 'lines', autoSplit: true })
        }

        if (!headerRefSplit.lines?.length) return
        gsap.set(headerRefSplit.lines, { opacity: 0, y: 50 })

        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 70%',
            end: 'top 30%',
            toggleActions: 'play reverse restart',
          },
        })
        headerTl.to(headerRefSplit.lines, { opacity: 1, y: 0, duration: 1 })

        const introLinesOk =
          introMounted &&
          p1RefSplit?.lines?.length &&
          p2RefSplit?.lines?.length &&
          p3RefSplit?.lines?.length
        if (introLinesOk) {
          const introTl = gsap.timeline({
            scrollTrigger: {
              trigger: introRef.current,
              start: 'top 50%',
              end: 'bottom 50%',
              toggleActions: 'play',
            },
          })
          introTl.fromTo(p1RefSplit.lines, { opacity: 0 }, { opacity: 1, duration: 1.5, x: 40 })
          introTl.to(p1RefSplit.lines, { opacity: 0 })
          introTl.fromTo(p2RefSplit.lines, { opacity: 0 }, { opacity: 1, duration: 1.5, x: -15 }, '>1')
          introTl.to(p2RefSplit.lines, { opacity: 0 })
          introTl.fromTo(p3RefSplit.lines, { opacity: 0 }, { opacity: 1, duration: 1.5, x: 40 }, '>1')
          introTl.to(p3RefSplit.lines, { opacity: 0 })
        }

        const topRightSmallStarTl = gsap.timeline({ repeat: -1, yoyo: true })
        topRightSmallStarTl.fromTo(smallStarTopRef.current, { scale: 1 }, { scale: 2, duration: 2 })

        const bottomLeftStarTl = gsap.timeline({ repeat: -1, yoyo: true })
        bottomLeftStarTl.fromTo(largeStarBottomLeftRef.current, { scale: 2}, { scale: 1, duration: 2 })

        const topRightLargeStarTl = gsap.timeline({ repeat: -1, yoyo: true })
        topRightLargeStarTl.fromTo(largeStarRightRef.current, { scale: 1 }, { scale: 2, duration: 2 })

        const threeStarsTl = gsap.timeline({ repeat: -1, yoyo: true })
        if (largeStarTopLeftRef.current) {
          threeStarsTl.fromTo(largeStarTopLeftRef.current, { scale: 2 }, { scale: 1, duration: 2 })
        }
        if (largeStarTopRightRef.current) {
          threeStarsTl.fromTo(largeStarTopRightRef.current, { scale: 2 }, { scale: 1, duration: 2 }, '<')
        }
        if (smallStarBottomRef.current) {
          threeStarsTl.fromTo(smallStarBottomRef.current, { scale: 2 }, { scale: 1, duration: 2 }, '<')
        }
      })

      runScrollTriggerRefresh()
    }

    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(buildAnimations)
    } else {
      buildAnimations()
    }

    return () => {
      cancelled = true
      mm.revert()
    }
  }, { scope: sectionRef, dependencies: [showIntro] })

  return (
    <>

    <div className='star-capture-layer star container fixed w-screen h-screen pointer-events-none overflow-visible z-0'>
        <img src={starSmall} className='absolute opacity-70 right-[17%] top-[70%] md:right-[20%] md:top-[20%]' ref={smallStarTopRef} alt='' />
        <img src={starSmall} className='absolute opacity-70 right-[30%] md:right-[30%] md:top-[30%]' ref={smallStarLeftImageRef} alt='' />
        <img src={starLarge} className='absolute opacity-70 right-[40%] top-[60%] w-md md:right-[50%] md:top-[70%]' alt='4 pointed star' ref={largeStarBottomLeftRef} />
        <img src={starLarge} className='absolute opacity-70 left-[34%] w-md md:left-[70%] md:top-[60%]' ref={largeStarRightRef} alt='4 pointed star' />
        <img src={starLarge} className='hidden md:block absolute opacity-70 w-md md:left-[5%] md:top-[5%]' ref={largeStarTopLeftRef} alt='desktop: large top left star image' />
        <img src={starLarge} className='hidden md:block absolute opacity-70 w-md md:left-[75%] md:bottom-[65%]' ref={largeStarTopRightRef} alt='desktop:large top right hand side star image' />
        <img src={starSmall} className='hidden md:block absolute opacity-70 md:left-[35%] md:bottom-[30%]' ref={smallStarBottomRef} alt='desktop:small top right star image' />
    </div>

    <section ref={sectionRef} className='relative z-10'>

      <header id='header' className='min-h-screen flex flex-col justify-center items-center relative overflow-hidden'>
          <h1 ref={titleRef} className='header font-playfair text-white text-7xl relative text-center md:text-8xl'>
              Daily Ritual Generator
          </h1>
      </header>
      
     { showIntro ? <div ref={introRef} id='header-intro' className='font-roboto min-h-screen text-white flex flex-col gap-34 text-xl'>
        <div className='self-start pl-14'>
          <p ref={p1Ref} className='md:text-4xl'>
          From Sunrise to Sunset
          </p>
        </div>

        <div className='self-end pr-7'>
          <p ref={p2Ref} className='md:text-4xl'>
            Generate personalized self-care activities
          </p>
       </div>

        <div className='self-start pl-7 text-center'>
          <p ref={p3Ref} className='md:text-4xl'>
            customizing your perfectly tailored routine with a single click.
          </p>
        </div>
        
      </div> : null}


    </section>


   

</>
  
  )
}

