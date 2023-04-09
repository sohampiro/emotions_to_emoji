//https://teachablemachine.withgoogle.com/models/-W1YMhq9x/
Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
}) 
var camera=document.getElementById("camera")
Webcam.attach("#camera")
function snapt(){
    Webcam.snap(function(data_uri){
        document.getElementById("picture").innerHTML="<img id='captured_image' src= '"+data_uri+"'>"
        //"<img id='captured_image' src= ' " + data_uri + " '> "
    })
}
//model programming starts now
console.log("version-",ml5.version)
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/-W1YMhq9x/model.json",modelloaded)
function modelloaded(){
    console.log("model loaded successfully")
}
prediction1=""
prediction2=""
function speak(){
    var synth=window.speechSynthesis
    speak1="The first prediction is"+prediction1
    speak2="And the second prediction is"+prediction2
    var utterThis=new SpeechSynthesisUtterance(speak1+speak2)
    synth.speak(utterThis)
}
function check(){
    img=document.getElementById("captured_image")
    //classifier is the variable that holds the model
    //img is the variable that holds the picture
    classifier.classify(img,got_result)
}
function got_result(error,results){
if (error) {
    console.error(error)
} else {
    console.log(results)
    //[0].label
    //[1].label
    prediction1=results[0].label
    prediction2=results[1].label
    document.getElementById("emotion1").innerHTML=prediction1
    document.getElementById("emotion2").innerHTML=prediction2
    speak()
    if (prediction1=="happy ") {
        document.getElementById("emoji1").innerHTML="&#128512;"
    }
    if (prediction1=="sad") {
        document.getElementById("emoji1").innerHTML="&#128549;"
    }
    if (prediction1=="sleepy") {
        document.getElementById("emoji1").innerHTML="&#128564;"
    }

    if (prediction2=="happy ") {
        document.getElementById("emoji2").innerHTML="&#128512;"
    }
    if (prediction2=="sad") {
        document.getElementById("emoji2").innerHTML="&#128549;"
    }
    if (prediction2=="sleepy") {
        document.getElementById("emoji2").innerHTML="&#128564;"
    }
}
}