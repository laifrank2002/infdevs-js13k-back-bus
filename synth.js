var audioSynth = new AudioContext();
var oscillator;
var audioGain = audioSynth.createGain();
var audioFrequency;
var playTime = 200; //2s test

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function synthesizeTone(tone) {
	switch (tone) {
		case 0:
			audioFrequency = 261.6;
			break;
		case 1:
			audioFrequency = 293.7;
			break;
		case 2:
			audioFrequency = 329.6;
			break;
		case 3:
			audioFrequency = 349.2;
			break;
		case 4:
			audioFrequency = 392.0;
			break;
		case 5:
			audioFrequency = 440.0;
			break;
		case 6:
			audioFrequency = 493.9;
			break;
		case 7:
			audioFrequency = 523.3;
			break;
		case 8:
			audioFrequency = 587.3;
			break;
		case 9:
			audioFrequency = 659.3;
			break;
		case 10:
			audioFrequency = 698.5;
			break;
		case 11:
			audioFrequency = 784.0;
			break;
		case 12:
			audioFrequency = 880.0;
			break;
		case 13:
			audioFrequency = 987.8;
			break;
	}
	play(playTime);
}


async function play(ms) {
	oscillator = audioSynth.createOscillator();	
	oscillator.frequency.value = audioFrequency;
	oscillator.connect(audioSynth.destination);
	oscillator.start();
	await sleep(ms);
	oscillator.stop();
	oscillator.disconnect();
}