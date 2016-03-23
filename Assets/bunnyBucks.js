#pragma strict
var style : GUIStyle;
static var bunnyBucks = 0;

function Start () {

}

function Update () {
	

}

function OnGUI () { 
//Score!
//GUI.skin.label.alignment = TextAnchor.LowerLeft;
//GUI.Label (Rect(5,400,50,50), "BunnyBucks: $0",style);
//GUI.skin.label.alignment = TextAnchor.LowerLeft;


GUI.Button (new Rect (0,260,180,40), "BunnyBucks: $" + bunnyBucks.ToString());

//GUI.Button (new Rect (10,50,150,60), "Score: " + score.ToString());

}
