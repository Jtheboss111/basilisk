#pragma strict

// main

var TailPrefab : GameObject;
var ApplePrefab : GameObject;
static var counter = 0;							// number of tail elements
private var lastChain : GameObject = null;	// last tail in the end of snake chain
private var moveSpeed = 2.5;					// movement speed of snake (gamespeed)
static var score2 = 0; 
static var colour = "";


function snake_addTail() {
	if(lastChain == null)
		lastChain = gameObject;

	var newChain : GameObject = Instantiate(TailPrefab, lastChain.transform.position - lastChain.transform.forward*0.5, Quaternion(0,0,0,0));
	newChain.transform.rotation = lastChain.transform.rotation;
	var joint = newChain.GetComponent(HingeJoint);
	if(joint != null) {
		joint.connectedBody = lastChain.rigidbody;
		lastChain = newChain;
	}
	newChain.name = "Tail " + counter;
	counter++;
	
	rigidbody.mass++; // make the head weight greater so it can carry it's tail... lol
	moveSpeed += 0.08;
}

function Start () {
	// Adding some joints at the start.
	snake_addTail();
	snake_addTail();
	snake_addTail(); //Well, seems like 3 joints is sufficient 
	if (colour.Equals("blue")){
		 renderer.material.color = Color.blue;  
		 
	}  
	if (colour.Equals("red")){
		 renderer.material.color = Color.red; 
	} 
	if (colour.Equals("purple")){
		 renderer.material.color = Color.magenta; 
	} 
	 
	 if (colour.Equals("black")){
		 renderer.material.color = Color.black;
	}  
	if (colour.Equals("green")){
		 renderer.material.color = Color.green;
	} 
	if (colour.Equals("cyan")){
		 renderer.material.color = Color.cyan; 
	} 
	
}

function OnCollisionEnter(c : Collision) {
	if(c.gameObject == null)
		return;
		
	// restart on wall hit 
	if(c.gameObject.CompareTag("Respawn")) {
		counter = 0;
		Application.LoadLevel("portalMenu");
		//Main
	}
	
	//CHANGING COLOURS
	
	if(c.gameObject.CompareTag("blue_tail")) {
		renderer.material.color = Color.blue; 
		Application.LoadLevel("customize"); 
		colour = "blue";

	}
	if(c.gameObject.CompareTag("yellow_tail")) {
		counter = 0;
		renderer.material.color = Color.red; 
		Application.LoadLevel("customize"); 
		colour = "red";

	}
	if(c.gameObject.CompareTag("purple_tail")) {
		renderer.material.color = Color.magenta;
		Application.LoadLevel("customize");
		counter = 0; 
		colour = "purple";
	} 
	if(c.gameObject.CompareTag("green_tail")) {
		renderer.material.color = Color.green; 
		Application.LoadLevel("customize"); 
		colour = "green";

	}
	if(c.gameObject.CompareTag("black_tail")) {
		counter = 0;
		renderer.material.color = Color.black; 
		Application.LoadLevel("customize"); 
		colour = "black";

	}
	if(c.gameObject.CompareTag("orange_tail")) {
		renderer.material.color = Color.cyan;
		Application.LoadLevel("customize");
		counter = 0; 
		colour = "cyan";
	}
	
	
	
	
	if(c.rigidbody == null)
		return;
	
	if(c.gameObject.name == "Apple(Clone)") {
		var chew : GameObject = null;
		if(Random.value > 0.5) {
			chew = GameObject.Find("chew1");
		} else {
			chew = GameObject.Find("chew2");
		}
		//chew.audio.Play(); //CHANGE THE NAME OF THE SOUND
		Destroy(c.gameObject);
		snake_addTail();
		return;
	}
}

function Update () {
	var dx = Input.GetAxis("Horizontal");
	var dy = Input.GetAxis("Vertical");
	score2 = counter;
	 //renderer.material.color = Color.green;
	 //renderer.sharedMaterial.SetColor()
	 
	
	// forward move
	
	/*var fwd = transform.forward*moveSpeed*dy;
	rigidbody.AddForce(fwd, ForceMode.Impulse);*/
	//rigidbody.AddForce(transform.forward*moveSpeed, ForceMode.Force);
	rigidbody.velocity = transform.forward*moveSpeed;
	
	// turning
	var turnSpeed = 1;
	if(Input.acceleration.sqrMagnitude != 0) {
		turnSpeed = 230.0;
		//rigidbody.AddTorque(-transform.up*turnSpeed*counter*Input.acceleration.y*0.5, ForceMode.Impulse);
		transform.rotation *= Quaternion.Euler(0, -Input.acceleration.y*Time.deltaTime*turnSpeed, 0);
	} else { // pc
		if(dx != 0) {
			rigidbody.AddTorque(transform.up*turnSpeed*counter*dx, ForceMode.Impulse);
		}
	}
	
	//if(Input.GetKeyDown("space")) {
	//	snake_addTail();
	//}
	
	// apples spawning
	var r = Random.Range(0, 100);
	if(r > 90 && GameObject.FindWithTag("apples") == null) {
		var range = 3;
		Instantiate(ApplePrefab, Vector3(Random.Range(-range,range), 1, Random.Range(-range,range)), Quaternion(0,0,0,1));
	}
}