#pragma strict

//Parameters
var restPosition : float = 0F;
var pressedPosition : float = 45F;
var flipperStrength : float = 10F;
var flipperDamper : float = 1F;
var inputButtonName : String = "LeftPaddle";

function Awake ()
{
	hingeJoint.useSpring = true;
}

// Update is called once per frame
function Update ()
{
	var spring : JointSpring = new JointSpring();
	
	spring.spring = flipperStrength;
	spring.damper = flipperDamper;
	
	if (Input.GetButton(inputButtonName))
		spring.targetPosition = pressedPosition;
	else
		spring.targetPosition = restPosition;
	
	hingeJoint.spring = spring;
	hingeJoint.useLimits = true;
	hingeJoint.limits.min = restPosition;
	hingeJoint.limits.max = pressedPosition;
	Physics.gravity.z = -10;
	
}