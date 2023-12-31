const carCanvas=document.getElementById("carCanvas");
carCanvas.width=400;
const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road=new Road(carCanvas.width/2,carCanvas.width*0.9);
const traffic=[
];
const totalTraffic=90;
let tempY=-100;
for(let i=0;i<totalTraffic;i++){
    let tempLane=(Math.random()*5);
    traffic.push(  new Car(road.getLaneCenter(tempLane),tempY,30,50,"DUMMY",2,getRandomColor()));
    tempY+=(-150);
}
const N=150;
const cars=generateCars(N);
let bestCar=cars[0];
if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
        cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain"));
        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain,0.1);
        }
    }
}else{
    for(let i=0;i<cars.length;i++){
        cars[i].brain={"levels":[
            {
               "inputs": [
                   0.10338960931056862,
                   0,
                   0,
                   0,
                   0
               ],
               "outputs": [
                   1,
                   0,
                   1,
                   0,
                   1,
                   1
               ],
               "biases": [
                   -0.09196500606945479,
                   0.9791576897782899,
                   -0.9713288445335024,
                   0.9509909220654489,
                   -0.47864372221060103,
                   -0.10607843713103948
               ],
               "weights": [
                   [
                       -0.48867584007978504,
                       -0.5029015666250949,
                       -0.04534196398899626,
                       0.7747642162486903,
                       -0.15576363625987577,
                       -0.8247664931300833
                   ],
                   [
                       0.7897681290878724,
                       0.14514813006595206,
                       0.6908511369797061,
                       -0.8988017383460893,
                       -0.8055952075084747,
                       0.1354957867941673
                   ],
                   [
                       0.9846283120483079,
                       -0.20913504586305898,
                       -0.5612469584662247,
                       0.6282268888155156,
                       -0.09511742407642787,
                       -0.8127752055437654
                   ],
                   [
                       -0.7767366238763782,
                       0.5580472462281376,
                       0.4558683351077999,
                       0.8393169849639541,
                       0.2836379906850457,
                       0.7294010096144112
                   ],
                   [
                       -0.8189062045527655,
                       -0.9994445346483003,
                       -0.13945639775775298,
                       0.2808067330814761,
                       -0.6232678909452103,
                       0.08305075150783692
                   ]
               ]
           },
           {
               "inputs": [
                   1,
                   0,
                   1,
                   0,
                   1,
                   1
               ],
               "outputs": [
                   1,
                   0,
                   0,
                   0
               ],
               "biases": [
                   -0.9301448998845885,
                   0.5128148493976146,
                   0.2518337642799553,
                   0.37347618392424753
               ],
               "weights": [
                   [
                       0.35028639063966205,
                       -0.6063060938657543,
                       0.8111923871612312,
                       0.39494595605476945
                   ],
                   [
                       0.6089891425063105,
                       0.6576635048864308,
                       0.07065595764390187,
                       0.08557172847664285
                   ],
                   [
                       0.06322253859591243,
                       0.5322784844397059,
                       -0.5818003474790849,
                       -0.6782849202438959
                   ],
                   [
                       -0.49075833194092944,
                       -0.8876770973309105,
                       -0.009414865151176066,
                       -0.20335958402008059
                   ],
                   [
                       -0.16553486698508157,
                       -0.35117140763293353,
                       0.6333496354730737,
                       -0.8482516841560619
                   ],
                   [
                       0.6910658125175071,
                       0.5773801831504763,
                       -0.8048462780079029,
                       0.17647153841838392
                   ]
               ]
           }
       ]
   }
        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain,0.1);
        }
    }
}


animate();

function save(){
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}

function discard(){
    localStorage.removeItem("bestBrain");
}

function generateCars(N){
    const cars=[];
    for(let i=1;i<=N;i++){
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"));
    }
    return cars;
}

function animate(time){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    for(let i=0;i<cars.length;i++){
        cars[i].update(road.borders,traffic);
    }
    bestCar=cars.find(
        c=>c.y==Math.min(
            ...cars.map(c=>c.y)
        ));

    carCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;

    carCtx.save();
    carCtx.translate(0,-bestCar.y+carCanvas.height*0.7);

    road.draw(carCtx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx);
    }
    carCtx.globalAlpha=0.2;
    for(let i=0;i<cars.length;i++){
        cars[i].draw(carCtx);
    }
    carCtx.globalAlpha=1;
    bestCar.draw(carCtx,true);

    carCtx.restore();

    networkCtx.lineDashOffset=-time/50;
    Visualizer.drawNetwork(networkCtx,bestCar.brain);
    requestAnimationFrame(animate);
}