let r = []; //ㄱ 부터 ㅎ 까지 변수 설정
let s = []; //해당 프로젝트에서는 ㅇ 까지만 학습 후 사용
let e = []; 
let f = []; 
let a = []; 
let q = []; 
let t = [];
let d = [];
//let w = [];
//let c = [];
//let z = [];
//let x = [];
//let v = [];
//let g = [];


function preload() { //데이터셋 불러오기 //이미지 파일 형식이 예를 들어 ㄱ이면 
    //'r0001'부터 'r0300'까지 되어있으므로 모든 파일들을 순차적으로 로드
    for (let i = 0; i < 100 ; i++) {
        let index = nf(i + 1, 4, 0);
        r[i] = loadImage(`data/r${index}.png`);
        s[i] = loadImage(`data/s${index}.png`);
        e[i] = loadImage(`data/e${index}.png`);
        f[i] = loadImage(`data/f${index}.png`);
        a[i] = loadImage(`data/a${index}.png`);
        q[i] = loadImage(`data/q${index}.png`);
        t[i] = loadImage(`data/t${index}.png`);
        d[i] = loadImage(`data/d${index}.png`);
        //w[i] = loadImage(`data/w${index}.png`);
        //c[i] = loadImage(`data/c${index}.png`);
        //z[i] = loadImage(`data/z${index}.png`);
        //x[i] = loadImage(`data/x${index}.png`);
        //v[i] = loadImage(`data/v${index}.png`);
        //g[i] = loadImage(`data/g${index}.png`);
    }
}

let shapeClassifier;

function setup() {
    createCanvas(400, 400);

    let options = { //ml5에서 shpaeclassifier를 사용하기 위해 입력해줘야하는 요소
        inputs: [64, 64, 4],
        task: 'imageClassification',
        debug: true,
    };

    shapeClassifier = ml5.neuralNetwork(options);

    for (let i = 0 ; i < r.length ; i++) { //데이터셋 입력
        shapeClassifier.addData({ image: r[i] }, { label: "r" });
        shapeClassifier.addData({ image: s[i] }, { label: "s" });
        shapeClassifier.addData({ image: e[i] }, { label: "e" });
        shapeClassifier.addData({ image: f[i] }, { label: "f" });
        shapeClassifier.addData({ image: a[i] }, { label: "a" });
        shapeClassifier.addData({ image: q[i] }, { label: "q" });
        shapeClassifier.addData({ image: t[i] }, { label: "t" });
        shapeClassifier.addData({ image: d[i] }, { label: "d" });
        //shapeClassifier.addData({ image: w[i] }, { label: "w" });
        //shapeClassifier.addData({ image: c[i] }, { label: "c" });
        //shapeClassifier.addData({ image: z[i] }, { label: "z" });
        //shapeClassifier.addData({ image: x[i] }, { label: "x" });
        //shapeClassifier.addData({ image: v[i] }, { label: "v" });
        //shapeClassifier.addData({ image: g[i] }, { label: "g" });
    }

    shapeClassifier.normalizeData(); //데이터 정규화
    shapeClassifier.train({epochs: 100}, finishedTraining); //epoch는 100으로 설정
}

function finishedTraining() {
    console.log('finished training');
    shapeClassifier.save(); //학습이 끝나면 model.json, model.weights.bin, 
    //model_meta.json파일로 인공지능 모델이 저장됨.
}