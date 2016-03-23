#pragma strict
//Making application to exit
function Start () {

}

function Update () {
if(Input.GetKey(KeyCode.Home) || Input.GetKey("escape")) {
		Application.Quit();
	}
}

