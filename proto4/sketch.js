let shapeClassifier;
let canvas;
let resultsDiv;
let inputImage;
let clearButton;
let label = 100;
let startButton;
let jessi;
let checkButton;
let ran;
let korean;
let next;
let r_audio;
let s_audio;
let e_audio;
let f_audio;
let a_audio;
let q_audio;
let t_audio;
let d_audio;
let ok_audio;
let re_audio;

function setup() {
  canvas = createCanvas(400,400);
  pixelDensity(1);
  
  let options = {
    inputs: [64, 64],
    task: "imageClassification",
  };
  shapeClassifier = ml5.neuralNetwork(options);
  const modelDetails = {
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'model/model.weights.bin',
  };
  shapeClassifier.load(modelDetails, modelLoaded);
  
  background(255);
  
  inputImage = createGraphics(64, 64);
  startButton = createButton(' ');
  startButton.parent('buttons');
  startButton.size(80,80);
  startButton.style("background: URL('play.png') no-repeat; border: none; cursor:pointer;")
  startButton.mousePressed(function(){
    ran = Math.floor(Math.random() * (8 - 0));
    if (ran == 0){
      jessi = 'r';
      korean = 'ㄱ';
      r_audio.play();
    } else if (ran == 1){
      jessi = 's';
      korean = 'ㄴ';
      s_audio.play();
    } else if (ran ==2){
      jessi = 'e';
      korean = 'ㄷ';
      e_audio.play();
    } else if (ran == 3){
      jessi = 'f';
      korean = 'ㄹ';
      f_audio.play();
    } else if (ran == 4){
      jessi = 'a';
      korean = 'ㅁ';
      a_audio.play();
    } else if (ran == 5){
      jessi = 'q';
      korean = 'ㅂ';
      q_audio.play();
    } else if (ran == 6){
      jessi = 't';
      korean = 'ㅅ';
      t_audio.play();
    } else if (ran == 7){
      jessi = 'd';
      korean = 'ㅇ';
      d_audio.play();
    }
    background(255);
    label = 100;
  })

  checkButton = createButton(' ');
  checkButton.parent('buttons');
  checkButton.size(80,80);
  checkButton.style("background: URL('check.png') no-repeat; border: none; cursor:pointer;")
  checkButton.mousePressed(function(){
    if (label == jessi) {
      ok_audio.play();
      console.log(label);
    }
      if (label != jessi){
      re_audio.play();
      console.log(label);
    }
  })
  clearButton = createButton(' ');
  clearButton.parent('buttons');
  clearButton.size(80,80);
  clearButton.style("background: URL('eraser.png') no-repeat; border: none; cursor:pointer;")
  clearButton.mousePressed(function() {
    background(255);
  })
}

function modelLoaded() {
  console.log('model ready!');
  classifyImage();
}

function classifyImage() {
  inputImage.copy(canvas, 0, 0, 400, 400, 0, 0, 64, 64);
  shapeClassifier.classify({image: inputImage}, gotResults);
}

function gotResults(err, results) {
  if (err) {
    console.error(err);
    return;
  }
  label = results[0].label;
  classifyImage();
}
function preload() {
  r_audio = loadSound("r.mp3");
  s_audio = loadSound("s.mp3");
  e_audio = loadSound("e.mp3");
  f_audio = loadSound("f.mp3");
  a_audio = loadSound("a.mp3");
  q_audio = loadSound("q.mp3");
  t_audio = loadSound("t.mp3");
  d_audio = loadSound("d.mp3");
  ok_audio = loadSound("ok.mp3");
  re_audio = loadSound("re.mp3");
}
function draw() {
  if (mouseIsPressed) {
    strokeWeight(35);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}