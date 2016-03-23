#pragma strict
var highScore1 = 0;
var highScore2 = 0;
var previousScore1 = 0;
var previousScore2 = 0;

function Start () {

}

function Update () {

}

function OnGUI() 
{
	//Highest Count
	if (char4.score > highScore1){
		highScore1 = char4.score;
	}
	if (char3.score > highScore2){
		highScore2 = char3.score;
	}
	
	
    //GUI.Button (new Rect (10,50,150,60), "Score: " + charSinglePlayer.counter.ToString());
    GUI.Button (new Rect (10,100,220,30), "Player 1 Wins: " + char4.winsP2.ToString() + " | Score: " + highScore2.ToString());
    GUI.Button (new Rect (10,130,220,30), "Player 2 Wins: " + char3.winsP1.ToString() + " | Score: " + highScore1.ToString());
}
