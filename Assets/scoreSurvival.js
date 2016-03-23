#pragma strict
var object : GameObject;
var text : GUIText;
static var score = 0;
function Start () {



}

function Update () 
{
	//GUI.Label(Rect(0, 0, 100, 100), "Blocks: " + charSinglePlayer.counter.ToString());
	 //GUI.Button (new Rect (10,10,150,20), "Score: " + charSinglePlayer.counter.ToString());
}

function OnGUI() 
{
	score = Survival.counter - 4;
    //GUI.Button (new Rect (10,50,150,60), "Score: " + charSinglePlayer.counter.ToString());
    GUI.Button (new Rect (10,50,150,60), "Score: " + score.ToString());
}

