#pragma strict
var object : GameObject;
var text : GUIText;
static var scoreR = 0;
static var scoreL = 0;
function Start () {

}

function Update () 
{
	//GUI.Label(Rect(0, 0, 100, 100), "Blocks: " + charSinglePlayer.counter.ToString());
	 //GUI.Button (new Rect (10,10,150,20), "Score: " + charSinglePlayer.counter.ToString());
}

function OnGUI() 
{
	
    //GUI.Button (new Rect (10,50,150,60), "Score: " + charSinglePlayer.counter.ToString());
    GUI.Button (new Rect (10,50,150,60), "Left Score: " + scoreR.ToString());
    GUI.Button (new Rect (10,110,150,60), "Right Score: " + scoreL.ToString());
}

