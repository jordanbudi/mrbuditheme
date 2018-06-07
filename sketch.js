var beat, beatVolume, beatPan, beatRate, beatButtonPlay, beatButtonBegin, beatButtonBackFive;
var r, g, b, a;
var amplitude, level, beatSize;


function preload(){
    beat = loadSound("/sound/adonis-budisantoso.m4a")
    //beat = loadSound("/sound/humble.m4a")
    //beat = loadSound("/sound/travis-scott.mp3")
}

function setup(){
    createCanvas(620,380).parent("sketch-holder");
    background(0);
    
    //Button to start playing the song
    //triggers the togglePlaying() function
    beatButtonPlay = createButton(" Play ");
    beatButtonPlay.mousePressed(togglePlaying);

    //Button to start song from beginning
    //triggers the backToBegginning() function
    // beatButtonBegin = createButton("Restart");
    // beatButtonBegin.mousePressed(backToBeginning);

    // //Button to rewind the song
    // //triggers the backFive() function
    // beatButtonBackFive = createButton("Rewind");
    // beatButtonBackFive.mousePressed(backFive);

    beatRate = 1;
    beatPan = 0;
    
    //beatVolume = createSlider(0, 1, .5, .05);
    // beatRate = createSlider(0.5, 1.5, 1, .05);
    // beatPan = createSlider(-1, 1, 0, .05);

    
    

    for(var beatSeconds = 0; beatSeconds < beat.duration(); beatSeconds+=.48){
        beat.addCue(beatSeconds, smallSquares);
    }

    for(var beatSeconds = 0; beatSeconds < beat.duration(); beatSeconds+=.001){
        beat.addCue(beatSeconds, centerSquare);
    }

     amplitude = new p5.Amplitude();

}

function draw(){
    // beat.setVolume(beatVolume.value());
    // beat.rate(beatRate.value());
    // beat.pan(beatPan.value());

    beat.setVolume(beatVolume);
    beat.rate(beatRate);
    beat.pan(beatPan);
    
    level = amplitude.getLevel();
    beatSize = map(level, 0, 1, 5, 25);


    //risingRed();

    if(beat.currentTime() > beat.duration()-0.5){
        //beatButtonPlay.html("Play")
        backToBeginning();
    }
}

function togglePlaying(){
    if(!beat.isPlaying()){
        beat.play();
        beatButtonPlay.html("Pause");
    }
    else{
        beat.pause();
        beatButtonPlay.html("Play ");
    }
}

function backToBeginning(){
    beat.jump(0);
}

function backFive(){
    beat.jump(beat.currentTime()-5);
}

function smallSquares(){
    noStroke();
    for(var row = 40; row < height; row+=60){
        //fill(random(150,255),random(0,150),random(0,150));
        for(var col = 40; col < width; col+=60){
            fill(random(0,255),random(0,255),random(0,255));
            rect(col, row, 40, 40);
        }
    }
}

function centerSquare(){
    //background(0);
    var normalBlack = 250;

    rectMode(CENTER);

    fill(0);
    rect(width/2, height/2, normalBlack, normalBlack);

    fill(0, 255, 0);
    rect(width/2, height/2, beatSize*15, beatSize*15);
}

function risingRed(){
    if(beat.currentTime() < 6.2){
        background(100-beat.currentTime()*30);
        fill(255,0,0);
        noStroke();
        //speed of rising rectangle
        rectMode(CORNER);
        rect(0, height-beat.currentTime()*65, width, height);
    }
}

