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
sound = ""

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
     fill("#FF0000");
     stroke("#FF0000");
      circle(leftWristX, leftWristY, 20);

      number_LWY = Number(leftWristY)
      decimal_removed_LWY = floor(number_LWY)
      volume = decimal_removed_LWY/500
      document.getElementById("volume").innerHTML = "VOLUME : "+volume
      music1.setVolume(volume)
   }

   function gotResults(results){
      if(results.length > 0){
        console.log(results)

      leftWristX = results[0].pose.leftWrist.x
      leftWristY = results[0].pose.leftWrist.y
      rightWristX = results[0].pose.rightWrist.x
      rightWristY = results[0].pose.rightWrist.y

      console.log("LWX = ", leftWristX  , "LWY = " , leftWristY , "RWX = " , rightWristX , "RWY = " , rightWristY)
      }

   }