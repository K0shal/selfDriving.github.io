const canvas = document.getElementById('canvas');
canvas.width = 300;

const canvasWidth = canvas.width;
const ctx = canvas.getContext('2d');
const road = new Road(canvasWidth / 2, canvasWidth, 3);
const carpos = road.carPosition(2);
const N = 500;
const cars = generateCars(N);
let bestCar=cars[0];
if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
    cars[i].brain=JSON.parse(
        localStorage.getItem("bestBrain")
    );
    if(i!=0){
        NeuralNetwork.mutate(cars[i].brain,0.2);
    }
}
}
const traffic = [
    new Car(road.carPosition(Math.random()*2+1), -400, 30, 50, "TRAFFIC", "blue", 5),
    new Car(road.carPosition(Math.random()*2+1), -500, 30, 50, "TRAFFIC", "blue", 5),
    new Car(road.carPosition(Math.random()*2+1), -600, 30, 50, "TRAFFIC", "blue", 5),
    new Car(road.carPosition(Math.random()*2+1), -400, 30, 50, "TRAFFIC", "blue", 5),
    new Car(road.carPosition(Math.random()*2+1), -900, 30, 50, "TRAFFIC", "blue", 5),
    new Car(road.carPosition(Math.random()*2+1), -1100, 30, 50, "TRAFFIC", "blue", 5),
    new Car(road.carPosition(Math.random()*2+1), -1200, 30, 50, "TRAFFIC", "blue", 5),
    new Car(road.carPosition(Math.random()*2+1), -1250, 30, 50, "TRAFFIC", "blue", 5),
    new Car(road.carPosition(Math.random()*2+1), -1300, 30, 50, "TRAFFIC", "blue", 5),
    new Car(road.carPosition(Math.random()*2+1), -1350, 30, 50, "TRAFFIC", "blue", 5)
];
animate();
function generateCars(N) {
    const cars = [];
    for (let i = 0; i <= N; i++) {
        cars.push(new Car(road.carPosition(2), -100, 30, 50, "AI", "red"));
    }
    return cars;
}


function save(){
   
    localStorage.setItem("bestBrain",JSON.stringify(bestCar.brain))
}
function remove(){
    localStorage.removeItem("bestBrain");
}
function animate() {
    // for(let i=1;i<cars.length;i++){
    //     NeuralNetwork.mutate(cars[i].brain,0.1);
    // }
 
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }
    for (let i = 0; i < cars.length; i++) {
        cars[i].update(road.borders, traffic);
    }
     bestCar = cars.find(
        c => c.y == Math.min(...cars.map(c => c.y))
        );
    canvas.height = window.innerHeight;
    canvas.width = 300;
    ctx.save();
    ctx.translate(0, -bestCar.y + canvas.height * .8);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(ctx);
    }
    road.draw(ctx);
    ctx.globalAlpha = 0;

    for (let i = 0; i < cars.length; i++) {
        cars[i].draw(ctx);
    }
   
    ctx.globalAlpha = 1;
    bestCar.draw(ctx, true);
    ctx.restore();
    requestAnimationFrame(animate);
}
