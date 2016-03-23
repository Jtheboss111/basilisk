#pragma strict
var object : Rigidbody;
var style : GUIStyle;
var myStyle:GUIStyle;

//function Start () {
//	for(var i = 0; i<2; i++) {
//		var obj : Rigidbody = Instantiate(object, Vector3(Random.Range(-2,2), 1, Random.Range(-2,2)), Quaternion(0,0,0,0));
//		obj.gameObject.renderer.material.color = Color(Random.value, Random.value, Random.value);
//	}
//}

var dragObject : Rigidbody = null;
var isDragging : boolean = false;

var tmpDX = 0.0;
var tmpDY = 0.0;
function SpawnBlock () {
		var obj : Rigidbody = Instantiate(object, Vector3(Random.Range(-2,2), 1, Random.Range(-2,2)), Quaternion(0,0,0,0));
		obj.gameObject.renderer.material.color = Color(Random.value, Random.value, Random.value);
}
function Start () {
		InvokeRepeating ("SpawnBlock", 0, 15); //Every ___ seconds!
		
	if (customize.colour.Equals("blue")){
		 renderer.material.color = Color.blue; 
	}  
	if (customize.colour.Equals("red")){
		 renderer.material.color = Color.red; 
	} 
	if (customize.colour.Equals("purple")){
		 renderer.material.color = Color.magenta; 
	} 
	//style.normal.textColor = Color.black;
	
}



function Update () {
	if(Input.GetKey(KeyCode.Home) || Input.GetKey("escape")) {
		Application.LoadLevel("mainmenu");
	}
	if(Input.GetKey("menu")) {
	}
	
	if(Input.GetMouseButton(0)) {
		var hit : RaycastHit;
		var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		if(Physics.Raycast(ray, hit, 100.0)) {
			if(hit.rigidbody != null && hit.rigidbody.gameObject.name == "Cube(Clone)") {
				isDragging = true;
				dragObject = hit.rigidbody;
			}
		}
	} else {
		isDragging = false;
		dragObject = null;
	}
	//Does throwing away stuff. MAGIC. :D
	if(isDragging && dragObject != null) {
		var force = 50; // 1000;
		
		if(Input.touchCount > 0) {
			var touch : Touch = Input.GetTouch(0);
			if(touch.phase == TouchPhase.Moved) {
				force = 5;
				tmpDX = touch.deltaPosition.x;
				tmpDY = touch.deltaPosition.y;
			} else {
				tmpDX = tmpDY = 0;
			}
		} else {
			tmpDX = Input.GetAxis("Mouse X");
			tmpDY = Input.GetAxis("Mouse Y");
		}	
		dragObject.AddForce(tmpDX*Time.deltaTime*force, 0, tmpDY*Time.deltaTime*force, ForceMode.Impulse);
		return;
	}	
	
}
var hSliderValue : float = 2.0; static var volume : float;

function OnGUI () { 
hSliderValue = GUI.HorizontalSlider (Rect (50, 225, 100, 230), hSliderValue, 0.0, 2.0); 
GUI.Box(Rect(0,195,200,60),"Volume of Music"); AudioListener.volume = 1 *  hSliderValue; 

}

