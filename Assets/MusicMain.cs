using UnityEngine;
using System.Collections;
public class MusicMain : MonoBehaviour {
	public AudioClip backgroundMusic1;
	// Use this for initialization
	void Start () {
		audio.clip = backgroundMusic1;
		audio.Play ();
	}
	
	// Update is called once per frame
	void Update () {
		
	}
}
