import playList from './playList.js';

const time = document.querySelector('.time');
const isDate = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const nameUser = document.querySelector('.name');
const body = document.querySelector('body');
const greetingContainer = document.querySelector('.greeting-container');

// Погода
const weatherIcon = document.querySelector('.weather-icon');
const weatherBlock = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const nameSpeedWind = document.querySelector('.name-wind');
const nameHumidity = document.querySelector('.name-humidity');
const speedWind = document.querySelector('.speed-wind');
const humidity = document.querySelector('.air-humidity');
const error = document.querySelector('.error');
const inputCity = document.querySelector('.city')
const changeQuote = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const quoteAuthor = document.querySelector('.author');
const sliderButton = document.querySelector('.slider-icons');
// Плеер
const playerBlock = document.querySelector('.player');
const play = document.querySelector('.play');
const playListContainer = document.querySelector('.play-list');
const prevAudio = document.querySelector('.play-prev');
const nextAudio = document.querySelector('.play-next');
const timeLineTrack = document.querySelector('.timeline-track');
const timeTrack = document.querySelector('.time-track');
const timeDuration = document.querySelector('.time-duration');
const volumeTrack = document.querySelector('.volume-track');
const trackLabel = document.querySelector('.timeline-track-label');
const popUp = document.querySelector('.pop-up');
const config = document.querySelector('.config');
const showItems = document.querySelector('.settings__show-items');
const quoteBlock = document.querySelector('.quote-block');




localStorage.setItem('langEn', 'en');

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.innerHTML = `${currentTime}`;
  setTimeout(showTime, 1000);
}

class Momentum {
  constructor() {

    this.showDate();
    this.setBgGreet();
    this.getName();
  }

  getStorage(key) {
    return localStorage.getItem(key);
  }
  setStorage(key, value) {
    localStorage.setItem(key, value);
  }


  showDate() {
    const date = new Date();
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    if (this.getStorage('langEn') === 'en') {
      const currentDate = date.toLocaleDateString('en-En', options);
      isDate.innerText = currentDate;
    } else {
      const currentDate = date.toLocaleDateString('ru-RU', options);
      isDate.innerText = currentDate;
    }



  }




  setBgGreet() {
    let today = new Date(),
      hour = today.getHours();
    let random = Math.floor(Math.random() * 20) + 1;
    this.setStorage('img', random);

    if (this.getStorage('langEn') === 'en') {

      if (hour < 6) {

        document.body.style.backgroundImage =
          `url("https://raw.githubusercontent.com/webj0ker/stage1-tasks/assets/images/night/${random}.webp")`;
        document.body.style.backgroundSize = 'cover';
        greeting.textContent = 'Good Night, ';
        document.body.style.color = 'white';
        this.setStorage('greeting', 'night');

      } else if (hour < 12) {

        document.body.style.backgroundImage =
          `url("https://raw.githubusercontent.com/webj0ker/stage1-tasks/assets/images/morning/${random}.webp")`;
        document.body.style.backgroundSize = 'cover';
        greeting.textContent = 'Good Morning, ';
        this.setStorage('greeting', 'morning');
      } else if (hour < 18) {

        document.body.style.backgroundImage =
          `url("https://raw.githubusercontent.com/webj0ker/stage1-tasks/assets/images/afternoon/${random}.webp")`;
        document.body.style.backgroundSize = 'cover';
        greeting.textContent = 'Good Afternoon, ';
        this.setStorage('greeting', 'afternoon');
      } else {

        document.body.style.backgroundImage =
          `url("https://raw.githubusercontent.com/webj0ker/stage1-tasks/assets/images/evening/${random}.webp")`;
        document.body.style.backgroundSize = 'cover';

        greeting.textContent = 'Good Evening, ';
        document.body.style.color = 'white';
        this.setStorage('greeting', 'night');
      }

    } else {

      if (hour < 6) {
        document.body.style.backgroundImage =
          `url("https://raw.githubusercontent.com/webj0ker/stage1-tasks/assets/images/night/${random}.webp")`;
        document.body.style.backgroundSize = 'cover';
        greeting.textContent = 'Доброй ночи, ';
        document.body.style.color = 'white';
        this.setStorage('greeting', 'night');

      } else if (hour < 12) {

        document.body.style.backgroundImage =
          `url("https://raw.githubusercontent.com/webj0ker/stage1-tasks/assets/images/morning/${random}.webp")`;
        document.body.style.backgroundSize = 'cover';
        greeting.textContent = 'Доброе утро, ';
        this.setStorage('greeting', 'morning');
      } else if (hour < 18) {

        document.body.style.backgroundImage =
          `url("https://raw.githubusercontent.com/webj0ker/stage1-tasks/assets/images/afternoon/${random}.webp")`;
        document.body.style.backgroundSize = 'cover';
        greeting.textContent = 'Добрый день, ';
        this.setStorage('greeting', 'afternoon');
      } else {

        document.body.style.backgroundImage =
          `url("https://raw.githubusercontent.com/webj0ker/stage1-tasks/assets/images/evening/${random}.webp")`;
        document.body.style.backgroundSize = 'cover';
        greeting.textContent = 'Добрый вечер, ';
        document.body.style.color = 'white';
        this.setStorage('greeting', 'evening');
      }
    }


  }

  getName() {
    if (localStorage.getItem('name') === '') {
      nameUser.placeholder = '[Enter Name]'
    } else {
      nameUser.value = localStorage.getItem('name');
    }
  }

  setName(e) {

    localStorage.setItem('name', e.target.value);
    // nameUser.blur();
  }

  // if (e.type === 'keypress') {
  //     if (e.which == 13 || e.keyCode == 13) {
  //         localStorage.setItem('name', e.target.value);
  //         nameUser.blur();
  //     }
  // } else {
  //     localStorage.setItem('name', e.target.value);
  // }


  async getWeather() {
    let city = this.getStorage('city') || 'Minsk';
    inputCity.value = city;
    // if (getStorage(name))
    // console.log(this.getStorage('langEn'));
    let lang = this.getStorage('langEn');

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=61ab5c53a33d1fc3bac2b2d639c991de&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === 200) {
      nameSpeedWind.textContent = `Wind speed: `;
      nameHumidity.textContent = `Humidity: `;
      weatherIcon.style.display = 'inline';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${Math.round(data.main.temp)}°C`;
      weatherDescription.textContent = data.weather[0].description;
      humidity.textContent = `${data.main.humidity}%`;
      if (lang === 'en') {
        nameSpeedWind.textContent = `Wind speed: `;
        nameHumidity.textContent = `Humidity: `;
        speedWind.textContent = `${Math.round(data.wind.speed)}m/s`;

      } else {
        nameSpeedWind.textContent = `Скорость ветра: `;
        nameHumidity.textContent = `Влажность: `;
        speedWind.textContent = `${Math.round(data.wind.speed)}м/с`;
      }

      error.textContent = ` `;
    } else {
      nameSpeedWind.textContent = ` `;
      nameHumidity.textContent = ` `;
      temperature.textContent = ' ';
      weatherIcon.style.display = 'none';
      temperature.textContent = ' ';
      weatherDescription.textContent = ' ';
      speedWind.textContent = ' ';
      humidity.textContent = ' ';
      error.textContent = `${data.message}`;
    }


  }

  async getQuote() {

    const url = `js/quotes.json`;
    const res = await fetch(url);
    const data = await res.json();
    const random = Math.floor(Math.random() * data.length);
    // console.log(this.lang);

    // console.log(data[random]);
    if (localStorage.getItem('langEn') === 'en') {
      // console.log(this.getLang());

      quote.textContent = `"${data[random].en.text}"`;
      quoteAuthor.textContent = data[random].en.author;
    } else {
      quote.textContent = `"${data[random].ru.text}"`;
      quoteAuthor.textContent = data[random].ru.author;
    }

  }


}

const momentum = new Momentum();

// momentum.getWeather(inputCity.value);
momentum.getWeather();

inputCity.addEventListener('keydown', event => {

  if (event.key === 'Enter') {
    // momentum.getWeather(inputCity.value, 'en');

    localStorage.setItem('city', inputCity.value);
    inputCity.value = localStorage.getItem('city');
    momentum.getWeather();
  }

})

nameUser.addEventListener('keypress', momentum.setName);
nameUser.addEventListener('change', momentum.setName);
nameUser.addEventListener('blur', momentum.setName);

momentum.getQuote();

showTime();

// getWeather(inputCity.value, 'en')
let imgNumber = momentum.getStorage('img')


function plusCounter() {
  let currentCount = +momentum.getStorage('img');
  return function () {
    if (currentCount === 20) {
      currentCount = 0;
    }

    currentCount++;
    momentum.setStorage('img', currentCount);

    return currentCount;

  };
}
let nextSlide = plusCounter();

function minusCounter() {
  let currentCount = +momentum.getStorage('img');

  return function () {
    if (currentCount === 1) {
      currentCount = 21;
    }

    currentCount--;
    momentum.setStorage('img', currentCount);
    return currentCount;

  };

}
let prevSlide = minusCounter();

changeQuote.addEventListener('click', momentum.getQuote)

sliderButton.addEventListener('click', event => {

  let greeting = momentum.getStorage('greeting');

  if (event.target.classList.contains('slide-next')) {

    const img = new Image();
    img.src = `https://raw.githubusercontent.com/webj0ker/stage1-tasks/assets/images/${greeting}/${nextSlide()}.webp`;


    img.addEventListener('load', () => {
      body.style.backgroundImage = `url("${img.src}")`;
    })
  }
  if (event.target.classList.contains('slide-prev')) {

    const img = new Image();
    img.src = `https://raw.githubusercontent.com/webj0ker/stage1-tasks/assets/images/${greeting}/${prevSlide()}.webp`;
    img.addEventListener('load', () => {
      body.style.backgroundImage = `url("${img.src}")`;
    })
  }


})
const audio = new Audio();

let isPlay = false;
let trackNumber = 0;
let activeAudio;



function playAudio() {
  audio.src = playList[trackNumber].src;
  audio.currentTime = 0;
  audio.play();
  isPlay = true;
  play.dataset.track = playList[trackNumber].title;
  activeAudio = audio;
  timeDuration.innerHTML = playList[trackNumber].duration;
  timeLine();
  musicName();
  activeTrack();
  timeUpdate()


}

function pauseAudio() {
  audio.pause();
  isPlay = false;
}

function player() {
  if (!isPlay) {
    playAudio()

  } else {
    pauseAudio()
    isPlay = false
  }
}

function toggleBtn() {
  play.classList.toggle('pause');
  player()
}
play.addEventListener('click', toggleBtn);

function lists(name) {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = name;
  playListContainer.append(li);
}

playList.forEach(el => {
  lists(el.title)
})

function validTrackNumber(number) {
  let limit = playList.length - 1;
  if (number < 0) return limit;
  if (number > limit) return 0;
  return number;
}

function playPrev() {
  trackNumber = validTrackNumber(trackNumber - 1);
  playAudio();
}

function playNext() {
  trackNumber = validTrackNumber(trackNumber + 1);
  playAudio();
}

prevAudio.addEventListener('click', playPrev)
nextAudio.addEventListener('click', playNext)

const audioTrack = document.querySelectorAll('.play-item');

function activeTrack() {
  // console.log(audioTrack);
  audioTrack.forEach(el => {
    if (el.innerText === play.dataset.track) {
      el.classList.add('item-active');
    } else {
      el.classList.remove('item-active');
    }
    console.log(el.innerText);


  })


}


const buttonVolume = document.querySelector('.btn-volume');

function trackVolume(event) {
  console.log(event.target)
  // buttonVolume.classList.toggle('.button-volume-mute');
  if (event.target.classList.contains('button-volume')) {
    console.dir(activeAudio);
    activeAudio.volume = 0;
    buttonVolume.classList.remove('button-volume');
    buttonVolume.classList.add('button-volume-mute');
    volumeTrack.value = 0;

  } else {
    activeAudio.volume = 1;
    buttonVolume.classList.add('button-volume');
    buttonVolume.classList.remove('button-volume-mute');
    volumeTrack.value = 50;
  }
}

buttonVolume.addEventListener('click', trackVolume);

function timeLine() {
  activeAudio.ontimeupdate = timeLineAudio;

  function timeLineAudio() {

    let duration = activeAudio.duration || 0;
    let current = activeAudio.currentTime || 0;
    console.log(duration);
    console.log(current);
    timeLineTrack.value = (100 * activeAudio.currentTime) / activeAudio.duration;
    timeTrack.innerHTML = `${formatTime(current)}`;

  }
}


function musicName() {
  trackLabel.innerText = play.dataset.track;
}

volumeTrack.oninput = volume;


function volume(params) {
  let v = this.value
  activeAudio.volume = v / 100;

}

function formatTime(time) {
  let minutes = Math.round(time / 120)
  let seconds = Math.round(time % 60)
  return `${zero(minutes)}:${zero(seconds)}`
}

function zero(number) {
  number = number.toString()
  if (number.length === 1) return `0${number}`
  return number
}


// buttonClose.addEventListener('click', () => {
// 	document.body.classList.remove('not-scroll');
// 	coverElem.classList.add('hidden');
// 	formElem.classList.add('hidden');
// 	backToStep1();
// });

console.log(`Привет!, Прошу Вас проверить мою работу в последний день проверки дедлайна... Буду очень вам признателен, пожалуйста оставьте видными контакты, чтоб я мог Вас поблагодарить через 👍gratitude.  `)

config.addEventListener('click', () => {
  show()
})


function show() {
  if (popUp.classList.contains('hide')) {
    popUp.classList.remove('hide')
  } else {
    popUp.classList.add('hide')
  }
}



function hideItems() {

}

showItems.addEventListener('click', event => {

  let temp = event.target;
  console.log(temp);

  if (event.target.dataset.class === 'greeting-container') {
    if (!event.target.checked) {
      greetingContainer.classList.add('hide')
    } else {
      greetingContainer.classList.remove('hide')
    }

  }
  if (event.target.dataset.class === 'time') {
    if (!event.target.checked) {
      time.classList.add('hide')
    } else {
      time.classList.remove('hide')
    }

  }
  if (event.target.dataset.class === 'date') {
    if (!event.target.checked) {
      isDate.classList.add('hide')
    } else {
      isDate.classList.remove('hide')
    }

  }
  if (event.target.dataset.class === 'quotes') {
    if (!event.target.checked) {
      quoteBlock.classList.add('hide')
    } else {
      quoteBlock.classList.remove('hide')
    }

  }
  if (event.target.dataset.class === 'weather') {
    if (!event.target.checked) {
      weatherBlock.classList.add('hide')
    } else {
      weatherBlock.classList.remove('hide')
    }

  }
  if (event.target.dataset.class === 'player') {
    if (!event.target.checked) {
      playerBlock.classList.add('hide')
    } else {
      playerBlock.classList.remove('hide')
    }

  }
})
