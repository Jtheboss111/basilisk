#pragma strict

// main

var TailPrefab : GameObject;
var ApplePrefab : GameObject;

private var counter = 0;							// number of tail elements
private var lastChain : GameObject = null;	// last tail in the end of snake chain
private var moveSpeed = 2.3;					// movement speed of snake (gamespeed)

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
	
	rigidbody.mass++; // make the head weight greater so it can carry it's tail.
	moveSpeed += 0.08;
}

function Start () {
	// Adding some joints at the start.
	snake_addTail();
	snake_addTail();
	snake_addTail(); //Well, seems like 3 joints is sufficient.
}

function OnCollisionEnter(c : Collision) {
	if(c.gameObject == null)
		return;
		
	// restart on wall hit 
	if(c.gameObject.CompareTag("Respawn")) {
		Application.LoadLevel("test6");
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
	var dx2 = Input.GetAxis("Horizontal2");
	var dy2 = Input.GetAxis("Vertical2");
	
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
		if(dx2 != 0) {
			rigidbody.AddTorque(transform.up*turnSpeed*counter*dx2, ForceMode.Impulse);
		}
	}
	
	/*if(Input.GetKeyDown("space")) {
		snake_addTail();
	}*/
	
	// apples spawning
	var r = Random.Range(0, 100);
	if(r > 90 && GameObject.FindWithTag("apples") == null) {
		var range = 3;
		Instantiate(ApplePrefab, Vector3(Random.Range(-range,range), 1, Random.Range(-range,range)), Quaternion(0,0,0,1));
		Instantiate(ApplePrefab, Vector3(Random.Range(-range,range), 1, Random.Range(-range,range)), Quaternion(0,0,0,1));
	}
}