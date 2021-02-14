const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const allsliderBtn = document.getElementById("create-all-slider")
const sliderContainer = document.getElementById('sliders');
// selected image 
let sliders = [];
let allsliders = []


function previewImage(event,img1) {
 console.log("amare dobule click marse")
 console.log(img1)
 document.getElementById("single-viewer").innerHTML=`<img class="img-fluid img-thumbnail single-img-viewer" src="${img1}">`
 //document.getElementById("images-view-container").style.display="none"

}



// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '15674931-a9d714b6e9d654524df198e00&q';

// show images 
const showImages = (images) => {
 
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  
  const imagess = images
  
  imagess.forEach(image => {
    
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img class="img-fluid img-thumbnail" ondblclick= previewImage(event,"${image.webformatURL}") onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div)
    allsliders.push(image.webformatURL)
    
  })

}

//https://pixabay.com/api/?key=15674931-a9d714b6e9d654524df198e00&q=nature&image_type=photo&pretty=true
const getImages = (query) => {
  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data => showImages(data.hits))
    //.then(data => console.log(data.hits))
    
    .catch(err => console.log(err))
}

let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.toggle('added');
 
  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
  } else {
    
      const valueToRemove = img
     const filteredItems = sliders.filter(slider => slider !== valueToRemove)
    //alert('Hey, Already added !')
    sliders=filteredItems
  }
}
var timer



const createSlider = (imgArray,slideType) => {
  // check slider image length


if(slideType=="selected")
{
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }

}

  // crate slider previous next area
  const duration = document.getElementById('duration').value;
  if (duration>0){
  document.getElementById("single-viewer").innerHTML=""
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  // hide image aria
  imagesArea.style.display = 'none';
  //const duration = document.getElementById('duration').value || 1000;
  

    imgArray.forEach(slide => {
      let item = document.createElement('div')
      item.className = "slider-item";
      item.innerHTML = `<img class="w-100"
      src="${slide}"
      alt="">`;
      sliderContainer.appendChild(item)
    })
    changeSlide(0)
    timer = setInterval(function () {
      slideIndex++;
      changeSlide(slideIndex);
    }, duration);
  }

  else{
    alert(" sorry sir! duration time cannot be negative or null plz enter any positive duration")  
    document.getElementById("sliders-dot").innerHTML=""
    sliderContainer.innerHTML=""
  }



}



// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}


document.getElementById("search").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {   
   document.getElementById("search-btn").click();
  }
});




searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  getImages(search.value)
  sliders.length = 0;
  allsliders.length=0;
})


sliderBtn.addEventListener('click', function () {
  createSlider(sliders,"selected")
})



   allsliderBtn.addEventListener('click', function () {

   createSlider(allsliders,"all")
  
})

