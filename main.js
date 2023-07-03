function setup(){
     canvas = createCanvas(700,500)
     canvas.center()
     background("black")
     video = createCapture(VIDEO);
     video.hide();
     posenet = ml5.poseNet(video,modeLoaded)
     posenet.on('pose',gotResults)
}


leftWristX = 0
leftWristY = 0
rightWristX = 0
rightWristY = 0
music1 = ""
leftWrist_SCORE = 0
rightWrist_SCORE = 0

function preload(){
    music1 = loadSound("music.mp3")
}

function play_sound(){
    music1.play()
    music1.setVolume(1)
    music1.rate(1)
}

function modeLoaded(){
     console.log("MODEL LOADED")
   }
   
   function draw(){
     image(video,0,0,700,500)
    if(leftWrist_SCORE >0.2){
      fill("#FF0000");
      stroke("#FF0000");
      circle(leftWristX, leftWristY, 20);

      number_LWY = Number(leftWristY)
      decimal_removed_LWY = floor(number_LWY)
      volume = decimal_removed_LWY/500
      document.getElementById("volume").innerHTML = "VOLUME : "+volume
      music1.setVolume(volume)
    }

    if(rightWrist_SCORE > 0.2){

      circle(rightWristX, rightWristY, 20);

      if(rightWristY > 0 && rightWristY <=100){
        music1.rate(0.5)
        document.getElementById("speed").innerHTML = "SPEED : 0.5x"
      }

      else if(rightWristY > 100 && rightWristY <=200){
        music1.rate(1)
        document.getElementById("speed").innerHTML = "SPEED : Normal"
      }

     else if(rightWristY > 200 && rightWristY <=300){
        music1.rate(1.5)
        document.getElementById("speed").innerHTML = "SPEED : 1.5x"
      }

      else if(rightWristY > 300 && rightWristY <=400){
        music1.rate(2)
        document.getElementById("speed").innerHTML = "SPEED : 2x"
      }

      else if(rightWristY > 400 && rightWristY <=500){
        music1.rate(2.5)
        document.getElementById("speed").innerHTML = "SPEED : 2.5x"
      }
    
    }
    

   }

   function gotResults(results){
      if(results.length > 0){
        console.log(results)

        leftWrist_SCORE = results[0].pose.keypoints[9].score
        rightWrist_SCORE = results[0].pose.keypoints[10].score

      leftWristX = results[0].pose.leftWrist.x
      leftWristY = results[0].pose.leftWrist.y
      rightWristX = results[0].pose.rightWrist.x
      rightWristY = results[0].pose.rightWrist.y

      console.log("LWX = ", leftWristX  , "LWY = " , leftWristY , "RWX = " , rightWristX , "RWY = " , rightWristY)
      }

   };