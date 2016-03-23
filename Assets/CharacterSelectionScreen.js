#pragma strict

// main

var TailPrefab : GameObject;
var ApplePrefab : GameObject;
static var counter = 0;							// number of tail elements
private var lastChain : GameObject = null;	// last tail in the end of snake chain
private var moveSpeed = 0;					// movement speed of snake (gamespeed)

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
	moveSpeed += 0.0;
}

function Start () {

	//use PlayerPref for the preferences in game! This shall include the level, music selection, colour of the snake, name of the snake!
	
	
	
	// Adding some joints at the start.
	snake_addTail();
	snake_addTail();
	snake_addTail(); //Well, seems like 3 joints is sufficient
	snake_addTail();
}

function OnCollisionEnter(c : Collision) {

}

function Update () {
	var dx = Input.GetAxis("Horizontal");
	var dy = Input.GetAxis("Vertical");
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
		transform.rotation *= Quaternion.Euler(0, Input.acceleration.x*Time.deltaTime*turnSpeed, 0);
	} else { // pc
		if(dx != 0) {
			rigidbody.AddTorque(transform.up*turnSpeed*counter*dx, ForceMode.Impulse);
		}
	}
	
	//if(Input.GetKeyDown("space")) {
	//	snake_addTail();
	//}
	
	// apples spawning
	//var r = Random.Range(0, 100);
	//if(r > 90 && GameObject.FindWithTag("apples") == null) {
	//	var range = 3;
	//	Instantiate(ApplePrefab, Vector3(Random.Range(-range,range), 1, Random.Range(-range,range)), Quaternion(0,0,0,1));
	//}
}