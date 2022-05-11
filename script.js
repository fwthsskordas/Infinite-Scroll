const imageContainer=document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready=false;
let imagesLoaded=0;
let totalImages=0;
let photosArray = [];


// unsplash API
const count=30;
const apiKey='PfG3_HjPV5vfIxdU2rSmKB606joiP5Dc_02q7r2b3GA';
const apiUrl=`https://api.unsplash.com/photos/random/?;client_id=${apiKey}&count=${count}`


// check if all were loaded
function imageLoaded(){
  imagesLoaded++;
   if (imagesLoaded===totalImages){
     ready =true;
     loader.hidden= true;
    }
}

function setAttributes(element, setAttributes){
    for(const key in setAttributes){
        element.setAttribute(key, setAttributes[key]);
    }
}

// create elements for link and photos
function displayPhotos(){
    imagesLoaded=0;
    totalImages = photosArray.length;
       
    photosArray.forEach((photo)=> {
        //create <a> to link to unsplash
        const item = document.createElement('a');
    
        setAttributes(item, { href: photo.links.html,targer: 'blanket',
        });

        // create <img> for photo
        const img=document.createElement('img');

        setAttributes(img, {
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description,
        })

        
        
        //eventlistener, check when each is finished loading
        img.addEventListener('load', imageLoaded);


        // put the image  inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);




    });
}

// get photos from the API

async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        
        displayPhotos();
        
    } catch (error) {
        // catch the error
    }
}


// eventlistener(scroll on the bottom and load more random photos)
window.addEventListener('scroll', ()=>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
        ready=false;
        getPhotos();
    }
})

// on load
getPhotos();




