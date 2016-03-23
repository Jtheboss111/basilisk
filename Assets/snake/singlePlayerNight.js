#pragma strict

// main

var TailPrefab : GameObject;
var ApplePrefab : GameObject;
var ApplePrefab2 : GameObject;
static var counter = 0;							// number of tail elements
private var lastChain : GameObject = null;	// last tail in the end of snake chain
private var moveSpeed = 1.7;					// movement speed of snake (gamespeed)
static var score = 0;
static var greenScore = 0;

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
	if (customize.colour.Equals("blue")){
		 renderer.material.color = Color.blue; 
	}  
	if (customize.colour.Equals("red")){
		 renderer.material.color = Color.red; 
	} 
	if (customize.colour.Equals("purple")){
		 renderer.material.color = Color.magenta; 
	} 
	 
	 if (customize.colour.Equals("black")){
		 renderer.material.color = Color.black;
	}  
	if (customize.colour.Equals("green")){
		 renderer.material.color = Color.green;
	} 
	if (customize.colour.Equals("cyan")){
		 renderer.material.color = Color.cyan; 
	} 
	InvokeRepeating ("spawnGreen", 0, 30); //Every ___ seconds!
	
}

function OnCollisionEnter(c : Collision) {
	if(c.gameObject == null)
		return;
		
	// restart on wall hit 
	if(c.gameObject.CompareTag("Respawn")) {
		Application.LoadLevel("SinglePlayerNight");
		counter = 0;
	}
	
	if(c.rigidbody == null)
		return;
	
	if(c.gameObject.name == "Apple(Clone)") {
		
		//chew.audio.Play(); //CHANGE THE NAME OF THE SOUND
		Destroy(c.gameObject);
		snake_addTail();
		return;
	}
	if(c.gameObject.name == "Apple2(Clone)") {
		greenScore = greenScore + 20;
		//chew.audio.Play(); //CHANGE THE NAME OF THE SOUND
		Destroy(c.gameObject);
		snake_addTail();
		snake_addTail();
		snake_addTail();
		snake_addTail();
		snake_addTail();
		snake_addTail();
		return;
	}
}

function Update () {
	var dx = Input.GetAxis("Horizontal");
	var dy = Input.GetAxis("Vertical");
	
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
		var range = 9;
		Instantiate(ApplePrefab, Vector3(Random.Range(-range,range), 1, Random.Range(-range,range)), Quaternion(0,0,0,1));
	}
	score = greenScore + counter - 3;
	
}
function spawnGreen(){
	var f = Random.Range(0, 100);
	var range2 = 3;
	Instantiate(ApplePrefab2, Vector3(Random.Range(-range2,range2), 1, Random.Range(-range2,range2)), Quaternion(0,0,0,1));
}

function OnGUI () {
GUI.Button (new Rect (10,160,150,30), "Score: " + score.ToString());

}