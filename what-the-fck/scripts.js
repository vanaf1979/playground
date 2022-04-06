window.onload = () => {
    initDude();
    speech();
}

let running = false;
let timer = {};
let seconds = 0;
let wtfs = 0;
let score = {};


const speech = () => {
    const grammar = "#JSGF V1.0; grammar terms; public <terms> = 'hello';";
    const recognition = new webkitSpeechRecognition();
    const speechRecognitionList = new webkitSpeechGrammarList();

    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    const startBt = document.getElementById('start-test');
    const score = document.getElementById('score');
    startBt.addEventListener('click', () => {

        if (!running) {
            recognition.start();
            timer = setInterval(() => {
                seconds = seconds + 0.1;
                score.innerText = wtfs + ' Wtf\'s total / ' + (wtfs / seconds).toFixed(2).toString();
            }, 100);
            running = true;
            startBt.innerHTML = "Stop test";
        } else {
            recognition.stop();
            clearInterval(timer);
            seconds = 0;
            wtfs = 0;
            running = false;
            startBt.innerHTML = "Start test";
        }
    })

    recognition.addEventListener('result', () => {
        console.log(event.results[0][0].transcript)
        let newNrOfWtfs = (event.results[0][0].transcript.match(/hello/g) || []).length;
        if(newNrOfWtfs > wtfs) {
            animateDude();
        }
        wtfs = newNrOfWtfs;
    });

    recognition.addEventListener('nomatch', () => {
        console.log("I didn't recognise that term.");
    });

    recognition.addEventListener('error', () => {
        console.log('Error occurred in recognition: ' + event.error);
    });

}


const initDude = () => {
    gsap.set('#mouth-sad', {
        display: "none",
    });
    gsap.set('#brows-sad', {
        display: "none",
    });
}


const animateDude = () => {
    gsap.timeline({})
        .set('#mouth-happy', {
            display: "none",
        })
        .set('#mouth-sad', {
            display: "block",
        })
        .set('#brows-happy', {
            display: "none",
        })
        .set('#brows-sad', {
            display: "block",
        })
        .to('#face', {
            fill: 'rgb(255, 17, 0)',
            duration: 0.1,
        })
        .to('#face', {
            fill: "rgb(0, 196, 255)",
            duration: 0.1,
        }, '+=0.1')
        .set('#mouth-happy', {
            display: "block",
        })
        .set('#mouth-sad', {
            display: "none",
        })
        .set('#brows-happy', {
            display: "block",
        })
        .set('#brows-sad', {
            display: "none",
        })
}