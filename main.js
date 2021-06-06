ShineLikeRainbows = "";
CarmenSandiego = "";
leftWristY = 0;
leftWristX = 0;
rightWristY = 0;
rightWristX = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song = "";
song_2 = "";

function setup(){
    canvas = createCanvas(600 ,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

}

function preload(){
    ShineLikeRainbows = loadSound("SLR.mp3");
    CarmenSandiego = loadSound("CS.mp3")
}

function draw(){
    image(video, 0, 0, 600, 500);
    song = ShineLikeRainbows.isPlaying();
    song_2 = CarmenSandiego.isPlaying();
    fill("blue");
    stroke("purple");

    if(scoreLeftWrist>0.2){
        circle(leftWristX-20,leftWristY, 20);
        CarmenSandiego.stop();
    }

    if(song = "false"){
        ShineLikeRainbows.play();
       document.getElementById("change").innerHTML = "Shine Like Rainbows";
    }

    if(scoreRightWrist>0.2){
        circle(rightWristX-20, rightWristY-20);
        ShineLikeRainbows.stop();
    }

    if(song = "false"){
        CarmenSandiego.play();
        document.getElementById("change").innerHTML = "Carmen Sandiego"
    }
}

function modelLoaded(){
    console.log("Model Loaded properly");
}

function gotPoses(result){
    if(result.length>0){

        console.log(result);

        leftWristX = result[0].pose.leftWrist.x;
        leftWristY = result[0].pose.leftWrist.y;
        rightWristX = result[0].pose.rightWrist.x;
        rightWristY = result[0].pose.rightWrist.y;

        scoreLeftWrist = result[0].pose.keypoints[9].score;
        scoreRightWrist = result[0].pose.keypoints[9].score;       
    }

}