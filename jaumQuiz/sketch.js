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
  canvas = createCanvas(400,400); //400,400크기의 캔버스 생성
  pixelDensity(1); //화면의 픽셀밀도와 일치 해체
  
  let options = {
    inputs: [64, 64], //학습 이미지 크기 64,64로 지정
    task: "imageClassification",
  };
  shapeClassifier = ml5.neuralNetwork(options); //ml을 위한 라이브러리 임포트
  const modelDetails = {
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'model/model.weights.bin',
  };
  shapeClassifier.load(modelDetails, modelLoaded); //학습된 모델 불러오기
  
  background(255); //캔버스 배경 색 지정
  
  inputImage = createGraphics(64, 64); 
  startButton = createButton(' '); //시작 버튼 생성
  startButton.parent('buttons'); 
  startButton.size(80,80); //버튼 사이즈 지정
  startButton.style("background: URL('play.png') no-repeat; border: none; cursor:pointer;") //버튼 스타일 지정
  startButton.mousePressed(function(){
    ran = Math.floor(Math.random() * (8 - 0)); //랜덤 숫자 생성 후 숫자에 따른 자음을 변수에 지정하도록 함
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
    label = 100; //label 100으로 초기화
  })

  checkButton = createButton(' '); //확인 버튼 생성
  checkButton.parent('buttons');
  checkButton.size(80,80);
  checkButton.style("background: URL('check.png') no-repeat; border: none; cursor:pointer;")
  checkButton.mousePressed(function(){ //그림과 학습모델 결과가 일치, 불일치 판단
    if (label == jessi) {
      ok_audio.play();
      console.log(label);
    }
      if (label != jessi){
      re_audio.play();
      console.log(label);
    }
  })
  clearButton = createButton(' '); //지우개 버튼 생성
  clearButton.parent('buttons');
  clearButton.size(80,80);
  clearButton.style("background: URL('eraser.png') no-repeat; border: none; cursor:pointer;")
  clearButton.mousePressed(function() {
    background(255);
  })
}

function modelLoaded() { //학습된 모델 불러오기
  console.log('model ready!');
  classifyImage();
}

function classifyImage() {
  inputImage.copy(canvas, 0, 0, 400, 400, 0, 0, 64, 64); //분류 이미지 크기 지정
  shapeClassifier.classify({image: inputImage}, gotResults);
}

function gotResults(err, results) {
  if (err) {
    console.error(err);
    return;
  }
  label = results[0].label; //라벨에 모델의 결과 할당
  classifyImage();
}
function preload() { //사운드 파일 preload
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
function draw() { //그리기 실행
  if (mouseIsPressed) {
    strokeWeight(35); //굵기 설정
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}