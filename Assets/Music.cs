using UnityEngine;
using System.Collections;

public class Music : MonoBehaviour {
	
	public AudioClip BackgroundMusic2;
	// Use this for initialization
	void Start () {
		audio.clip = BackgroundMusic2;
		audio.Play ();
	}
	
	// Update is called once per frame
	void Update () {
		//audio.clip = BackgroundMusic1;
		//audio.Play ();
	}
}

