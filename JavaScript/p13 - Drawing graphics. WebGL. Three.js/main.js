var scene = new THREE.Scene();
/*fov — Camera frustum vertical field of view. From bottom to top of view,
in degrees. Default is 50.
  aspect — Camera frustum aspect ratio.
  near — Camera frustum near plane.
  far — Camera frustum far plane. */
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var cube;

var loader = new THREE.TextureLoader();

loader.load('metal003.png', function(texture) {
  // This defines how the texture is wrapped horizontally and corresponds to U in UV mapping.
  texture.wrapS = THREE.RepeatWrapping;
  // This defines how the texture is wrapped vertically and corresponds to V in UV mapping.
  texture.wrapT = THREE.RepeatWrapping;

  // Repeat Wrapping allow us to make texture smaller than the poligon and
  // and fill remainig space with same pictures
  //    wrapS and wrapT doesn't matter if we use texture.repeat.set(1,1).
  //    Texture in this case will just stretch on whole poligon.
  texture.repeat.set(1.5,1.5);

  // Simple box. width, height and depth
  var geometry = new THREE.BoxGeometry(2, 1, 2.4);
  var material = new THREE.MeshLambertMaterial({
    map: texture,
    shading: THREE.FlatShading
  });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  draw();
});

var light = new THREE.AmbientLight('rgb(255,255,255)');
scene.add(light);

var spotLight = new THREE.SpotLight('rgb(255,255,255)');
spotLight.position.set(100, 1000, 1000);
spotLight.castShadow = true;
scene.add(spotLight);

function draw() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);

  requestAnimationFrame(draw);
}
