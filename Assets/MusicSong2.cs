using UnityEngine;
using System.Collections;

public class MusicSong2 : MonoBehaviour {
	
	public AudioClip BackgroundMusic3;
	// Use this for initialization
	void Start () {
		audio.clip = BackgroundMusic3;
		audio.Play ();
	}
	
	// Update is called once per frame
	void Update () {
		//audio.clip = BackgroundMusic1;
		//audio.Play ();
		
	}
}
