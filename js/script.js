let player = {
	name: "Charmander",
	health: 100,
	lvl: 3,
	effect: null,
	moves: [
		{
			name: "Ember",
			type: "Attack",
			power: 20,
			accuracy: .80
		},
		{
			name: "Scratch",
			type: "Attack",
			power: 10,
			accuracy: .98
		},
		{
			name: "Lear",
			type: "Defend",
			power: .20,
			accuracy: 1.0
		},
		{
			name: "Growl",
			type: "Defend",
			power: .65,
			accuracy: .65
		}
	]

};

let computer = {
	name: "Squirtel",
	health: 100,
	lvl: 4,
	effect: null,
	moves: [
		{
			name: "Water Gun",
			type: "Attack",
			power: 20,
			accuracy: .80
		},
		{
			name: "Waterfall",
			type: "Attack",
			power: 10,
			accuracy: .98
		},
		{
			name: "Tail Whip",
			type: "Defend",
			power: .20,
			accuracy: 1.0
		},
		{
			name: "Growl",
			type: "Defend",
			power: .65,
			accuracy: .65
		}
	]
};

let currentState;
let cpuUnit;
let userUnit;

let cpuTurn = {
	play: function(){
		let randomMove = Math.floor(Math.random() * 4);
		let currentCpuMove = cpuUnit.moves[randomMove];

		function setupCpuField() {
			$('#chat-text').text(cpuUnit.name + " turn?")
			prepareToAttack();
		};

		function prepareToAttack() {
			$('#squirtel-img').animate({
				top: "-=25",
			}, 200, function(){
				$('#squirtel-img').animate({
				top: "+=25"
				}, 200)
			})
			getAccuracy();
		};

		function getAccuracy(){
			let setAccuracy = Math.random();
			if (setAccuracy <= currentCpuMove.accuracy) {
				$('#chat-text').text(cpuUnit.name + " USED " + currentCpuMove.name + "!")
				getMoveType();
			} else {
				$('#chat-text').text(cpuUnit.name + " MISSED with " + currentCpuMove.name + "!")
				currentState = playerTurn;
				setTimeout(loop, 1500)
			}
		}

		function getMoveType(){
			showMoveAnimation();
			if (currentCpuMove.type == "Attack"){
				setTimeout(attackingMove, 1500);
			} else {
				setTimeout(defensiveMove, 1500);
			}
		}

		function showMoveAnimation(){
			$("#attack-img").addClass("cpu-attack-img");
			$("#attack-img").removeClass("hide");
			$("#attack-img").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);
		};

		function attackingMove(){
  		$("#attack-img").addClass("hide");
  		$("#attack-img").removeClass("cpu-attack-img");
  		if (!cpuUnit.effect) {
  			player.health -= currentCpuMove.power
  		} else {
  			player.health -= (currentCpuMove.power) - (currentCpuMove.power * cpuUnit.effect)
  			cpuUnit.effect = null; 
  		}
  		$('#user-health-bar').css("width", userUnit.health + "%");
  		currentState = playerTurn;
  		loop();
		};

		function defensiveMove(){
  		$("#attack-img").addClass("hide");
  		$("#attack-img").removeClass("cpu-attack-img");
  		userUnit.effect = currentCpuMove.power;
  		currentState = playerTurn;
  		loop();
		}

		setupCpuField();
	}
};

let playerTurn = {
	play: function(){
		let currentUserMove;

		function setUpUserField(){
			let moveButtons = ["#move1-text, #move2-text, #move3-text, #move4-text"];
			$("#user-buttons").removeClass("hide");
			$("#chat-text").text(userUnit.name + "s TURN!");

			for (let i = moveButtons.lenth - 1; i>= 0; i--) {
				$(moveButtons[i]).text(userUnit.moves[i].name);
			};
		}

		function prepareToAttack() {
			$("#user-buttons").addClass("hide");

			$('#charmander-img').animate({
				top: "-=25",
			}, 200, function(){
				$('#charmander-img').animate({
				top: "+=25"
				}, 200)
			});
			getAccuracy();
		};

		function getAccuracy(){
			let setAccuracy = Math.random();
			if (setAccuracy <= currentUserMove.accuracy) {
				$('#chat-text').text(userUnit.name + " USED " + currentUserMove.name + "!")
				getMoveType();
			} else {
				$('#chat-text').text(userUnit.name + " MISSED WITH " + currentUserMove.name + "!")
				currentState = playerTurn;
				setTimeout(loop, 1500)
			}
		};

		function getMoveType(){
			showMoveAnimation();
			if (currentUserMove.type == "Attack"){
				setTimeout(attackingMove, 1500);
			} else {
				setTimeout(defensiveMove, 1500);
			}
		}

		function showMoveAnimation(){
			$("#attack-img").addClass("user-attack-img");
			$("#attack-img").removeClass("hide");
			$("#attack-img").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);
		};

		function attackingMove(){
  		$("#attack-img").addClass("hide");
  		$("#attack-img").removeClass("user-attack-img");
  		if (!userUnit.effect) {
  			player.health -= currentUserMove.power
  		} else {
  			player.health -= (currentUserMove.power) - (currentUserMove.power * userUnit.effect)
  			userUnit.effect = null; 
  		}
  		$('#cpu-health-bar').css("width", userUnit.health + "%");
  		currentState = cpuTurn;
  		loop();
		};

		function defensiveMove(){
  		$("#attack-img").addClass("hide");
  		$("#attack-img").removeClass("user-attack-img");
  		cpuUnit.effect = currentUserMove.power;
  		currentState = cpuTurn;
  		loop();
		}

		$('#move1-button, #move2-button, #move3-button, #move4-button').unbind().click(function() {
			let move = $(this).attr("value");
			console.log("Clicked");
			currentUserMove = userUnit.moves[move];
			prepareToAttack();
		});

		setUpUserField();
	}
}

function loop() {
	if (cpuUnit.health <= 0 || userUnit.health <= 0)
	{
		$("#game-over").removeClass("hide");
		console.log("Game Over");
	}
	else
	{
		currentState.play();
	}
}

function init(){
	cpuUnit = computer;
	userUnit = player;

	$('#cpu-name').text(computer.name);
	$('#cpu-level').text("lvl " + computer.lvl);

	$('#user-name').text(player.name);
	$('#user-level').text("lvl " + player.lvl);

	currentState = playerTurn;
	loop();
}

init();
