// var renderer = new PIXI.WebGLRenderer(800, 800); 
var renderer = new PIXI.autoDetectRenderer(800, 800, null, true); 
// var renderer = new PIXI.CanvasRenderer(800, 800); 
document.body.appendChild(renderer.view);

var interactive = true;
var stage = new PIXI.Stage(null, interactive);

var orbit0 = new PIXI.Stage(null, interactive);

var sunTexture = PIXI.Texture.fromImage('/img/sun.png');
var sun = new PIXI.Sprite(sunTexture);

sun.position.x = 400;
sun.position.y = 400;
sun.anchor.x = 0.5;
sun.anchor.y = 0.5;	

sun.setInteractive(true);

// create an array of assets to load
var assetsToLoader = ["/img/planets.json"];
// create a new loader
loader = new PIXI.AssetLoader(assetsToLoader);
// use callback
loader.onComplete = onAssetsLoaded
//begin load
loader.load();

var planets = [];
var orbits = [];
var planetFrames = ["planet1.png", "planet2.png", "planet3.png", "planet4.png", "planet5.png", "planet6.png", "planet7.png", "planet8.png", "planet9.png", "planet10.png", "planet11.png", "planet12.png"  ];

function onAssetsLoaded(){
	// add a sun
	stage.addChild(sun);
	// add planets
	for (var i = 0; i < 12; i++){
		var frameName = planetFrames[i];

		// create a planet using the frame name
		var planet = PIXI.Sprite.fromFrame(frameName);

		// add some preferences
		planet.position.x = 440 + 24*i;
		planet.position.y = planet.position.x;
		planet.anchor.x = 0.5;
		planet.anchor.y = 0.5;
		planet.setInteractive(true);
		planet.click = function(data){
			if(this.clicked){
				this.clicked = false; 
				this.scale.x = 1;
				this.scale.y = 1;
			} else {
				this.clicked = true; 
				this.scale.x = 1.4;
				this.scale.y = 1.4;
			}
		}
		planets.push(planet);
		stage.addChild(planet);
	}

	requestAnimFrame(animate);
}	


// stage.addChild(orbit0);
// orbit0.addChild(sun);

requestAnimFrame(animate);

function animate() {
	sun.rotation += 0.01;
  // stage.visible = !orbit0.visible;

  // for(x in planets){
  // 	planet.position.x = 12;
  // 	planet.position.y = planet.position.x;
  // }

  renderer.render(stage);

  requestAnimFrame(animate);
}

function targetPlanet(data){
	alert('click!');
}

var playground = document.getElementById('playground')

function drawOrbit(index){
	var canvas = playground;
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');
    ctx.clearRect ( 0 , 0 , 800 , 800 );
    ctx.strokeStyle = "#5cbdff";
    // deep blue = "#0099ff";
    ctx.beginPath();
    ctx.arc(400, 400, 22+34*index, 0, 2*Math.PI);
    ctx.stroke();
  }
}

function attachOrbit(index){
	var orbitTexture = new PIXI.Texture.fromCanvas( playground );
	var orbit = new PIXI.Sprite( orbitTexture );
	stage.addChild( orbit );
}