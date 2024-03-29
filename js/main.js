// VARIABLES PARA MEDIAQUERYS
let mediaMobile = window.matchMedia("(max-width: 768px)");
let mediaIpad = window.matchMedia("(min-width: 769px) and (max-width : 1024px)");
let mediaDesktop = window.matchMedia("(min-width: 1025px)");

let days = document.getElementsByClassName('days')[0];
let daysB = document.getElementsByClassName('days')[1];
let hours = document.getElementsByClassName('hours')[0];
let hoursB = document.getElementsByClassName('hours')[1];
let minutes = document.getElementsByClassName('minutes')[0];
let minutesB = document.getElementsByClassName('minutes')[1];
let seconds = document.getElementsByClassName('seconds')[0];
let secondsB = document.getElementsByClassName('seconds')[1];

let cardBottomDays = document.getElementsByClassName('card-bottom')[0];
let cardBottomHours = document.getElementsByClassName('card-bottom')[1];
let cardBottomMinutes = document.getElementsByClassName('card-bottom')[2];
let cardBottomSeconds = document.getElementsByClassName('card-bottom')[3];
let title = document.getElementById('title');


//Event Listener
document.addEventListener('DOMContentLoaded',Counter);

function timeLeft(endtime){

    let t = Date.parse(endtime) - Date.parse(new Date());
    let seconds = Math.floor( (t/1000) % 60 );
    let minutes = Math.floor( (t/1000/60) % 60 );
    let hours = Math.floor( (t/(1000*60*60)) % 24 );
    let days = Math.floor( t/(1000*60*60*24) );

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
};
  
  
function Counter() {

    let today = new Date();
    let deadline = 'January 1 ' + (today.getFullYear() + 1) + " 00:00:00";
    
    if (today.getMonth() == 0 && today.getDate() == 1) {
        deadline = 'January 1 ' + (today.getFullYear()) + " 00:00:00";
    };

    let setClock = function(newyear){

        let timeinterval = setInterval(function(){

            let t = timeLeft(newyear);

            t.days < 364 ? title.textContent = "far from New Year": title.textContent = title.textContent;
            t.days < 210 ? title.textContent = "still far from new year": title.textContent = title.textContent;
            t.days < 120 ? title.textContent = "getting close to new year": title.textContent = title.textContent;
            t.days < 30 ? title.textContent = "Almost new year": title.textContent = title.textContent;

            let secondsVal = seconds.textContent;
            let minutesVal = minutes.textContent;
            let hoursVal = hours.textContent;
            let daysVal = days.textContent;


            days.textContent = t.days;
            daysB.textContent = t.days;
            hours.textContent = t.hours;
            hoursB.textContent = t.hours;
            minutes.textContent = ('0'+ t.minutes).slice(-2);
            minutesB.textContent = ('0'+ t.minutes).slice(-2);
            seconds.textContent = ('0'+ t.seconds).slice(-2);
            secondsB.textContent = ('0'+ t.seconds).slice(-2);

            fliping( cardBottomDays, daysB, t.days, daysVal, days);
            fliping( cardBottomHours, hoursB, t.hours, hoursVal, hours);
            fliping( cardBottomMinutes, minutesB, ('0'+ t.minutes).slice(-2), minutesVal, minutes);
            fliping( cardBottomSeconds, secondsB, ('0'+ t.seconds).slice(-2), secondsVal, seconds);

            if(t.total<=0){

                cardBottomSeconds.classList.remove('fliping');

                clearInterval(timeinterval);
                let now = new Date();

                let yearStr = now.getFullYear().toString();
                title.textContent = "Happy new year!!"

                days.textContent = yearStr[0];
                daysB.textContent = yearStr[0];
                hours.textContent = yearStr[1];
                hoursB.textContent = yearStr[1];
                minutes.textContent = yearStr[2];
                minutesB.textContent = yearStr[2];
                seconds.textContent = yearStr[3];
                secondsB.textContent = yearStr[3];

            }
        },1000);
    };
    
    setClock(deadline);
};

function fliping(cardBottom,valueB,tValue,lastVal,nowVal){

    if(lastVal != nowVal.textContent){

        cardBottom.classList.add('fliping');
        valueB.textContent = '';
        
        cardBottom.addEventListener('transitionend',()=>{

            cardBottom.classList.remove('fliping');
            valueB.textContent = tValue; 
        }); 
    };
}
