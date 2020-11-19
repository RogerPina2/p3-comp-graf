const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10 );

var input = new Input();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( .3, 1, .1);
const geometry1 = new THREE.BoxGeometry( .3, 1, .1);
const geometry2 = new THREE.SphereGeometry( .1);
const geometry3 = new THREE.BoxGeometry( 10.4, .2, .1);
const geometry4 = new THREE.BoxGeometry( .2, 7, .1);
const geometry5 = new THREE.BoxGeometry( .01, 7, .1);
const material = new THREE.MeshBasicMaterial( { color: 0xAA00AA } );
const material1 = new THREE.MeshBasicMaterial( { color: 0x0000AA } );
const material2 = new THREE.MeshBasicMaterial( { color: 0xAAAAAA } );
const player1 = new THREE.Mesh( geometry, material );
const player2 = new THREE.Mesh( geometry1, material1);
const ball = new THREE.Mesh( geometry2, material2);
const wall_up = new THREE.Mesh( geometry3, material2);
const wall_left = new THREE.Mesh( geometry4, material2);
const wall_right = new THREE.Mesh( geometry4, material2);
const wall_down = new THREE.Mesh( geometry3, material2);
const line = new THREE.Mesh( geometry5, material2);

player1.position.x = -4;
player2.position.x = 4;
wall_up.position.y = 3.6;
wall_down.position.y = -3.6;
wall_left.position.x = -5.1;
wall_right.position.x = 5.1;
line.position.y = 0;

//variables
var velBall = .03;
var velBally = .02;
var lastTs = 0;
var counter = 0;

scene.add( player1 );
scene.add( player2 );
scene.add( ball );
scene.add( wall_up );
scene.add( wall_down );
scene.add( wall_left );
scene.add( wall_right );
scene.add( line );

const animate = function (ts) {
    requestAnimationFrame( animate );

    counter += 1;
    // camera.rotation.x = 0.3;
    camera.position.z = 5;
    // camera.position.y = -2;

    var timeDelta = (ts - lastTs)/1000;
    lastTs = ts;

    ball.position.x += velBall;
    ball.position.y += velBally;

    var movSpeed = 5*timeDelta;

    if(counter > 5000){
      camera.rotation.z += 0.003;
    }

    if(ball.position.x - .1 <= -5 || ball.position.x + .1  >= 5){
      velBall = -velBall;
    }
    if(ball.position.y - .1 <= -3.5 || ball.position.y + .1  >= 3.5){
      velBally = -velBally;
    }

    if(player1.position.x+.15 >= ball.position.x-.1 && player1.position.x -.15 <= ball.position.x+.1 && player1.position.y+.5 >= ball.position.y && player1.position.y-.5 <= ball.position.y){
      velBall = -velBall;
    }

    if(player2.position.x+.15 >= ball.position.x-.1 && player2.position.x -.15 <= ball.position.x+.1 && player2.position.y+.5 >= ball.position.y && player2.position.y-.5 <= ball.position.y){
      velBall = -velBall;
    }

    if(input.isLeftPressed) {
      if(player1.position.x - .15 < -5){
        player1.position.x += 0;
      }
      else{
        player1.position.x -= movSpeed;
      }
    }
    
    if(input.isRightPressed) {
      if(player1.position.x + .15  > 0){
        player1.position.x += 0;
      }
      else{
        player1.position.x += movSpeed;
      }
      
    }
    if(input.isDownPressed) {
      if(player1.position.y - .5 < -3.5){
        player1.position.y += 0;
      }
      else{
        player1.position.y -= movSpeed;
      }
    }
    if(input.isUpPressed) {
      if(player1.position.y + .5 > 3.5){
        player1.position.y += 0;
      }
      else{
        player1.position.y += movSpeed;
      }
    }

    if(input.isLeftPressed1) {
      if(player2.position.x - .15 < 0){
        player2.position.x += 0;
      }
      else{
        player2.position.x -= movSpeed;
      }
    }
    
    if(input.isRightPressed1) {
      if(player2.position.x + .15  > 5){
        player2.position.x += 0;
      }
      else{
        player2.position.x += movSpeed;
      }
      
    }
    if(input.isDownPressed1) {
      if(player2.position.y - .5 < -3.5){
        player2.position.y += 0;
      }
      else{
        player2.position.y -= movSpeed;
      }
    }
    if(input.isUpPressed1) {
      if(player2.position.y + .5 > 3.5){
        player2.position.y += 0;
      }
      else{
        player2.position.y += movSpeed;
      }
    }

    renderer.render( scene, camera );
};

requestAnimationFrame(animate);