var group, program;

function startSocket(){
    console.log("started")
    var socket = io.connect("http://localhost:3000")

    socket.on("data", function(data){
	    var material = new THREE.SpriteCanvasMaterial( {
		color: Math.random() * 0x808008 + 0x808080,
		program: program
	    } );

	console.log(data)

	    particle = new THREE.Sprite( material );
	    particle.position.x = data["x"] * 2000 - 1000
	    particle.position.y = data["y"] * 2000 - 1000;
	    particle.position.z = data["z"] * 2000 - 1000;
	    particle.scale.x = particle.scale.y = Math.random() * 10 + 5;
	    group.add( particle );
    })
}

// function start() {
	var container, stats;
	var camera, scene, renderer, particle;
	var mouseX = 0, mouseY = 0;

	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;

	function start() {
		init();
		animate();
	}

	function init() {

		container = document.createElement( 'div' );
		document.body.appendChild( container );

		camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 3000 );
		camera.position.z = 1000;

		scene = new THREE.Scene();

		var PI2 = Math.PI * 2;
		program = function ( context ) {

			context.beginPath();
			context.arc( 0, 0, 3, 0, PI2, true );
			context.fill();

		}

		group = new THREE.Object3D();
		scene.add( group );

		renderer = new THREE.CanvasRenderer();

		container.appendChild( renderer.domElement );

		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		document.addEventListener( 'touchstart', onDocumentTouchStart, false );
		document.addEventListener( 'touchmove', onDocumentTouchMove, false );

		//

		window.addEventListener( 'resize', onWindowResize, false );

	    startSocket();

	}

	function onWindowResize() {

		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

	}

	//

	function onDocumentMouseMove( event ) {

		mouseX = event.clientX - windowHalfX;
		mouseY = event.clientY - windowHalfY;
	}

	function onDocumentTouchStart( event ) {

		if ( event.touches.length === 1 ) {

			event.preventDefault();

			mouseX = event.touches[ 0 ].pageX - windowHalfX;
			mouseY = event.touches[ 0 ].pageY - windowHalfY;

		}

	}

	function onDocumentTouchMove( event ) {

		if ( event.touches.length === 1 ) {

			event.preventDefault();

			mouseX = event.touches[ 0 ].pageX - windowHalfX;
			mouseY = event.touches[ 0 ].pageY - windowHalfY;

		}

	}

	//

	function animate() {

		requestAnimationFrame( animate );

		render();

	}

	function render() {

		camera.position.x += ( mouseX - camera.position.x ) * 0.05;
		camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
		camera.lookAt( scene.position );

		// group.rotation.x += 0.01;
		// group.rotation.y += 0.02;

		renderer.render( scene, camera );

	}
// }
