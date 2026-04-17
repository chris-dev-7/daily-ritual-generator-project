import  html2canvas from 'html2canvas'

// generateLink function 

export const generateLink = ( selectedActivities, formattedDate) => {

  const ritualData = {
    activities: selectedActivities,
    date: formattedDate
  };

  const stringifiedRitualData = JSON.stringify(ritualData)

  const encodedData = encodeURIComponent(stringifiedRitualData)

  const base = import.meta.env.BASE_URL || '/'
  const baseTrimmed = base.replace(/\/$/, '')
  const pathPrefix = baseTrimmed ? `${baseTrimmed}/` : '/'
  return `${window.location.origin}${pathPrefix}?ritual=${encodedData}`
}


// exportPNG function 

 export async function exportToPngComponent (saveShareRef, formattedDate, shareUrl) {

 
    if(saveShareRef.current){

      window.scrollTo(0, 0)
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))

      const el = saveShareRef.current
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: null,
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc) => {
          const fixedStars = clonedDoc.querySelector('.ritual-capture-root .star-capture-layer')
          if (fixedStars && el) {
            fixedStars.style.position = 'absolute'
            fixedStars.style.top = '0'
            fixedStars.style.left = '0'
            fixedStars.style.width = `${el.scrollWidth}px`
            fixedStars.style.minHeight = `${el.scrollHeight}px`
          }
        },
      })

      //Canvas to Blob 

      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, 'image/png')
      })

      const file = new File([blob], `My-Daily-Ritual-${formattedDate}.png`, {type: 'image/png'} )

      //Download the Image
      const dataUrl = canvas.toDataURL('image/png')

      const link = document.createElement('a')
        link.href = dataUrl
        link.download = `My-Daily-Ritual-${formattedDate}.png`
        document.body.appendChild(link)
        link.click()
        link.remove()

        await shareRitual( `${shareUrl}`, formattedDate, file )

      
      
    }else{

    }
  }

  /* To Blob helper function

async function getRitualPngToBlob(saveShareRef){

  const canvas = await html2canvas(saveShareRef.current)
  
  const blob = await new Promise((resolve) => {
    canvas.toBlob(resolve, 'image/png')
  })

  return blob
}

*/



// shareRitual function 

export async function shareRitual ( shareUrl, formattedDate, imageFile ) {



  if(navigator.share){

    try {

     await navigator.share({
      title:'Daily Ritual Generator',
      text:`Check out my Personalized Daily Ritual for ${formattedDate}`,
      files: [imageFile],
      url: shareUrl 
    })

  } catch(error){
    await navigator.clipboard.writeText(
      `Check out my Personalized Daily Ritual for ${formattedDate} : ${shareUrl}`
    )
    
  }

  }else{
    await navigator.clipboard.writeText(
      `Check out my Personalized Daily Ritual for ${formattedDate} : ${shareUrl}`
    )
  }
}


// Complete shareDailyRitual Functionality

export const shareDailyRitual = async ( saveShareRef, selectedActivities) => {

  const date = new Date()
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short', 
    day:'numeric',
    year:'numeric'
  });

  const shareUrl = generateLink(selectedActivities, formattedDate)
  await exportToPngComponent(saveShareRef, formattedDate, shareUrl)

}