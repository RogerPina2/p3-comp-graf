var gWidth = window.innerWidth;
var gHeight = window.innerHeight;
var ratio = gWidth / gHeight;
var borders = [40, 24] //indicate where the ball needs to move in mirror position

var light = new THREE.AmbientLight(0xffffff, 0.5);
var light1 = new THREE.PointLight(0xffffff, 0.5);
light1.position.set(0, 5, 0);
light1.castShadow = true;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10 );
camera.lookAt(new THREE.Vector3(0, 0, 0));

var input = new Input();

var renderer = new THREE.WebGLRenderer();
//properties for casting shadow
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( .3, 1, .1);
const geometry1 = new THREE.BoxGeometry( .3, 1, .1);
const geometry2 = new THREE.SphereGeometry( .1);
const geometry3 = new THREE.BoxGeometry( 10.4, .2, .1);
const geometry4 = new THREE.BoxGeometry( .2, 7, .1);
const geometry5 = new THREE.BoxGeometry( .02, 7, .1);
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

var loader = new THREE.FontLoader();
var mesh;

function render() {
  if (mesh) {
    mesh.rotation.y += 0.01;
    mesh.rotation.z += 0.007;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

var placar_1 = 0;
var placar_2 = 0;

loader.load('https://cdn.rawgit.com/mrdoob/three.js/master/examples/fonts/helvetiker_regular.typeface.json', function(font) {
  
  var text = new THREE.TextGeometry(`${placar_1} x ${placar_2}`, {
    font: font,
    size: 50,
    height: 0,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 5,
    bevelSize: 8,
    bevelSegments: 5
  });

  var material = new THREE.MeshLambertMaterial({
    color: 0xF3FFE2
  });
  mesh = new THREE.Mesh(text, material);
  mesh.position.set(-.75, 2.5, -.3);
  mesh.scale.multiplyScalar(0.01)
  mesh.castShadow = true;
  scene.add(mesh);

});

player1.position.x = -4;
player1.reciveShadow = true;
player2.position.x = 4;
player2.reciveShadow = true;
wall_up.position.y = 3.6;
wall_down.position.y = -3.6;
wall_left.position.x = -5.1;
wall_right.position.x = 5.1;
line.position.y = 0;
ball.reciveShadow = true;
camera.position.z = 7;


//variables
var velBall = .08;
var velBally = .02;
var lastTs = 0;
var counter = 0;
var batida = 0;

scene.add( player1 );
scene.add( player2 );
scene.add( ball );
scene.add( wall_up );
scene.add( wall_down );
scene.add( wall_left );
scene.add( wall_right );
scene.add( line );
scene.add(light);
scene.add(light1);

const animate = function (ts) {
    requestAnimationFrame( animate );

    batida += 1;
    counter += 1;
    renderer.render( scene, camera );
    
    if (counter > 100){
    
      // camera.rotation.x = 0.3;
      // camera.position.y = -2;

      var timeDelta = (ts - lastTs)/1000;
      lastTs = ts;
      //console.log(counter);

      ball.position.x += velBall;
      ball.position.y += velBally;

      var movSpeed = 5*timeDelta;

      if(counter > 400){
        camera.rotation.z += 0.003;
      }

      if(ball.position.x - .1 <= -5){
        velBall = -velBall;
        placar_1 += 1;
        if(placar_1 == 7){
          placar_1 = 0;
          placar_2 = 0;
        }
        scene.remove(mesh);
        loader.load('https://cdn.rawgit.com/mrdoob/three.js/master/examples/fonts/helvetiker_regular.typeface.json', function(font) {
  
          var text = new THREE.TextGeometry(`${placar_1} x ${placar_2}`, {
            font: font,
            size: 50,
            height: 0,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 5,
            bevelSize: 8,
            bevelSegments: 5
          });

          var material = new THREE.MeshLambertMaterial({
            color: 0xF3FFE2
          });
          mesh = new THREE.Mesh(text, material);
          mesh.position.set(-.75, 2.5, -.3);
          mesh.scale.multiplyScalar(0.01)
          mesh.castShadow = true;
          scene.add(mesh);
        });
        player1.position.x = -4;
        player1.position.y = 0;
        player2.position.x = 4;
        player2.position.y = 0;
        ball.position.x = 0;
        ball.position.y = 0;
        camera.rotation.z = 0;
        counter = 0;
      }

      if(ball.position.x + .1  >= 5){
        velBall = -velBall;
        placar_2 += 1;
        if(placar_2 == 7){
          placar_1 = 0;
          placar_2 = 0;
        }
        scene.remove(mesh);
        loader.load('https://cdn.rawgit.com/mrdoob/three.js/master/examples/fonts/helvetiker_regular.typeface.json', function(font) {
  
          var text = new THREE.TextGeometry(`${placar_1} x ${placar_2}`, {
            font: font,
            size: 50,
            height: 0,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 5,
            bevelSize: 8,
            bevelSegments: 5
          });

          var material = new THREE.MeshLambertMaterial({
            color: 0xF3FFE2
          });
          mesh = new THREE.Mesh(text, material);
          mesh.position.set(-.75, 2.5, -.3);
          mesh.scale.multiplyScalar(0.01)
          mesh.castShadow = true;
          scene.add(mesh);
        });
        player1.position.x = -4;
        player1.position.y = 0;
        player2.position.x = 4;
        player2.position.y = 0;
        ball.position.x = 0;
        ball.position.y = 0;
        camera.rotation.z = 0;
        counter = 0;
      }

      if(ball.position.y - .1 <= -3.5 || ball.position.y + .1  >= 3.5){
        velBally = -velBally;
      }

      if(player1.position.x+.15 >= ball.position.x-.1 && player1.position.x -.15 <= ball.position.x+.1 && player1.position.y+.5 >= ball.position.y && player1.position.y-.5 <= ball.position.y){
        if(batida > 15){
          velBall = -velBall;
          batida = 0;
        }
      }

      if(player2.position.x+.15 >= ball.position.x-.1 && player2.position.x -.15 <= ball.position.x+.1 && player2.position.y+.5 >= ball.position.y && player2.position.y-.5 <= ball.position.y){
        if(batida > 15){
          velBall = -velBall;
          batida = 0;
        }
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
    }
};

requestAnimationFrame(animate);