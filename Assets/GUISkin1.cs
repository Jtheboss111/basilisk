using UnityEngine;
using System.Collections;

public class GUISkin1 : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		
	
	}
	public GUISkin skin = null;
	
	
	public Rect position = new Rect (200, 15, 150, 25);
	public string text = "Hello";
	
	
	private void OnGUI(){
			GUI.skin = skin;
			GUI.Label (position, text);
	}

	
}
