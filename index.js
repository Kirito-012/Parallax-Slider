const track = document.getElementById('image-track');

window.onmousedown = (e) => {
	track.dataset.mouseDownAt = e.clientX; //where the mouse button is pressed
};

window.onmouseup = () => {
	track.dataset.mouseDownAt = '0';
	track.dataset.prevPercentage = track.dataset.percentage;
};

window.onmousemove = (e) => {
	//to return or skip the whole function until the mouse is clicked

	if (track.dataset.mouseDownAt === '0') return;
	// to know where the mouse is right now
	const currentposition = parseFloat(track.dataset.mouseDownAt) - e.clientX,
		// to know the position of the end of the slidebar
		endslidebar = window.innerWidth / 2;

	// to get the percent of screen covered by the pressed down moment of mouse
	const percentage = (currentposition / endslidebar) * -100,
		nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
	// Math.min(nextPercentage, 0);
	// Math.max(nextPercentage, -100);

	track.dataset.percentage = nextPercentage;

	//to move the images from left to right while sliding by alternating transform value in the css
	track.animate(
		{
			transform: `translate(${nextPercentage}%,-50%)`,
		},
		{duration: 1200, fill: 'forwards'}
	);

	for (const image of track.getElementsByClassName('image')) {
		// image.style.objectPosition = `${nextPercentage + 100}% 50%`;

		image.animate(
			{
				objectPosition: `${nextPercentage + 100}% 50%`,
			},
			{duration: 1200, fill: 'forwards'}
		);
	}
};
