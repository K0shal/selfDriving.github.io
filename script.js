const canvas=document.getElementById('canvas');

const ctx=canvas.getContext('2d');
const car=new Car(150,300,30,50);

animate();

function animate(){
    canvas.height=window.innerHeight;
canvas.width=300;
    car.update();
    car.draw(ctx);
   
    requestAnimationFrame(animate);
}