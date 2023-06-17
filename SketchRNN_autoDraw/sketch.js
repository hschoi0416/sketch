let sketchRNN;
let currentStroke;
let x, y;
let nextPen = 'down';
let seedPoints = [];
let personDrawing = false;

function preload() {
  sketchRNN = ml5.sketchRNN('strawberry'); //ml5에서 불러온 Sketch RNN 모델에서 strawberry을 로드한다.
}

function setup() {
  let canvas = createCanvas(400, 400); //캔버스를 생성한다.

  const button = createButton(''); //버튼생성
  button.position(10, 10); //버튼위치
  button.size(80,80);//버튼크기
  button.style("position:relative; background: URL('eraser.png') no-repeat; border: none; cursor:pointer;");
  button.mousePressed(resetDrawing) //버튼을 누르면 캔버스 리셋

  canvas.mousePressed(startDrawing);//마우스를 누르면 사용자 그림 시작
  canvas.mouseReleased(sketchRNNStart);//마우스 뗄 때 sketchRNN모델이 그림을 완성해준다.
  background(255);//배경 색깔 지정
  console.log('model loaded');
  sel = createSelect();//드롭다운 리스트 생성
  sel.position(-325,-250)//드롭다운 리스트 위치 지정
  sel.style("position:relative;")//드롭다운 리스트 스타일 지정

  sel.option('alarm_clock');//드롭다운 리시트 항목 추가
  sel.option('bird');
  sel.option('butterfly');
  sel.option('cat');
  sel.option('face');
  sel.option('flower');
  sel.option('hand');
  sel.option('pig');
  sel.option('rabbit');
  sel.option('sea_turtle');
  sel.option('strawberry');
  sel.selected('strawberry');
  sel.changed(mySelectEvent);//항목에서 선택하면 mySelectEvent호출
}

function mySelectEvent(){ //선택된 항목의 모델을 불러온다.
  let item = sel.value();
  sketchRNN = ml5.sketchRNN(item);
}

function resetDrawing() { //캔버스 그림초기화, seedPoints리스트 초기화
    background(254);
    seedPoints = [];
    sketchRNN.reset();
}

function startDrawing() { 
  personDrawing = true; //사용자 그림 상태
  x = mouseX; //마우스의 x좌표 저장
  y = mouseY; //마우스의 ㅛ좌표 저장
}

function sketchRNNStart() {//모델이 그림 생성하기 시작
  personDrawing = false; //사용자 그림 그리는 상태를 해제
  
  //RDP Line Simplication 수행
  const rdpPoints = [];
  const total = seedPoints.length;
  const start = seedPoints[0];
  const end = seedPoints[total - 1];
  rdpPoints.push(start);
  rdp(0, total - 1, seedPoints, rdpPoints);
  rdpPoints.push(end);
  
  // 단순화된 경로 그리기
  background(255);
  stroke(0);
  strokeWeight(4);
  beginShape();
  noFill();
  for (let v of rdpPoints) {
    vertex(v.x, v.y); 
  }
  endShape();
  
  // 경로의 끝에서 시작하기
  x = rdpPoints[rdpPoints.length-1].x;
  y = rdpPoints[rdpPoints.length-1].y;
  
  // seedpath 생성
  const seedPath = [];
  // SketchRNN 상태로 변환
  for (let i = 1; i < rdpPoints.length; i++) {
    let strokePath = {
      dx: rdpPoints[i].x - rdpPoints[i-1].x,
      dy: rdpPoints[i].y - rdpPoints[i-1].y,
      pen: 'down'
    }
    seedPath.push(strokePath);
  }
  sketchRNN.generate(seedPath, gotStrokePath);
}


function draw() {
  stroke(0);
  strokeWeight(4);

  if (personDrawing) { //사용자가 그림을 그리는 상태일 때
    line(mouseX, mouseY, pmouseX, pmouseY); //현재 마우스 위치와 이전 마우스 위치를 연결하여 사용자의 그림을 그린다.
    seedPoints.push(createVector(mouseX, mouseY)); //사용자의 그림 좌표를 seedPoints 배열에 추가.
  } else if (currentStroke) { //Sketch RNN 모델로 생성된 스트로크 정보가 있는 경우
    if (nextPen == 'end') { //다음 펜 상태가 'end'인 경우
      sketchRNN.reset(); //Sketch RNN 모델을 리셋
      //sketchRNNStart();
      currentStroke = null; //현재 스트로크 정보를 초기화
      nextPen = 'down'; //다음 펜 상태를 'down'으로 설정
      return;
    }
    if (nextPen == 'down') {//다음 펜 상태가 'down'인 경우
      line(x, y, x + currentStroke.dx, y + currentStroke.dy);
    }
    x += currentStroke.dx; //x 좌표에 dx를 더한다.
    y += currentStroke.dy; //y 좌표에 dy를 더한다.
    nextPen = currentStroke.pen; //다음 펜 상태를 현재 스트로크의 펜 상태로 설정
    currentStroke = null; //현재 스트로크 정보를 초기화
    sketchRNN.generate(gotStrokePath); //Sketch RNN 모델로 새로운 스트로크 정보를 생성
  }
}

function gotStrokePath(error, strokePath) {
  if (error) {
    console.error(error);
    return;
  }
  currentStroke = strokePath;
}