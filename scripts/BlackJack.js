'use strict';
var amount=3000;
var betAmount=0;
var flag=0;//for Deal button Visiblity once
var player=1;//1->Player Chance or 2->Dealer Chance
var standFlag=0;
var value=0;
var value2=0;
var c;
var newCard;
var element;
var element1;
var backImg;
var highest=3000;
var bal=document.getElementById('balance');
var bet=document.getElementById('bets');
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
//first step Putting Token
display_balance();
function amt(id) {
	standFlag=0;
	if(id=='dollar1'){
		amount--;
		betAmount++;
		display_balance();
		bet_amount(betAmount);
	}
	if(id=='dollar10'){
		amount -= 10;
		betAmount += 10;
		display_balance();
		bet_amount(betAmount);
	}
	if(id=='dollar100'){
		amount -= 100;
		betAmount += 100;
		display_balance();
		bet_amount(betAmount);
	}
	if(id=='dollar500'){
		amount -= 500;
		betAmount += 500;
		display_balance();
		bet_amount(betAmount);
	}
	if(amount>highest){
		highest=amount;
	}
	if(typeof(Storage)!=undefined){
		//Store in browser storage
		localStorage.setItem("Score",highest);
	}
}
//Second Step Display 

function display_balance() {
	bal.innerHTML="Account: "+amount + "$";
	//Retrive from browser storage
	document.getElementById('highScore').innerHTML="Highest Score :"+localStorage.getItem("Score")+" $";
	if (amount>=3000){//For new game chips are visible
		document.getElementById('dollar1').style.display="inline";
		document.getElementById('dollar10').style.display="inline";
		document.getElementById('dollar100').style.display="inline";
		document.getElementById('dollar500').style.display="inline";
	}
	if (amount<3000 && amount>1){
		document.getElementById('newGame_btn').style.display="none";
	}
	if(amount<1){
		document.getElementById('dollar1').style.display="none";
		document.getElementById('newGame_btn').style.display="inline";
	}
	if(amount<10)
		document.getElementById('dollar10').style.display="none";
	if(amount<100)
		document.getElementById('dollar100').style.display="none";
	if(amount<500)
		document.getElementById('dollar500').style.display="none";
	if(betAmount>0)
	{
		if(flag==0)
		document.getElementById('deal_btn').style.display="inline";
	}
}
function bet_amount(betAmount) {
	bet.innerHTML="Bet Money: "+betAmount + "$";		
}
//Third Step Start Game
function deal() {	
	noMoreBets();
	player=1;
	document.getElementById('deal_btn').style.display="none";
	flag=1;
	backImg = document.createElement("img");
	backImg.setAttribute('src', 'resources/backside.jpg');
	element1=document.getElementById('dealerCard');
	element1.appendChild(backImg);
	addCard(player);
	addCard(player);
	player=2;
	addCard(player);
	document.getElementById('again_btn').style.display="none";
	document.getElementById('hit_btn').style.display="inline";
	document.getElementById('stand_btn').style.display="inline";
	document.getElementById('double_btn').style.display="inline";	
	document.getElementById('hit_btn').disabled=false;
	document.getElementById('stand_btn').disabled=false;
	document.getElementById('double_btn').disabled=false;
}
//Third Step Hit/Stand/Double
function hit() {
	player=1;
	noMoreBets();
	addCard(player);
}
//Card Display
function addCard(player){
    c=randomCard(player);
	newCard = document.createElement("img");
	var suit=['H','C','S','D'];
	var randomSuit=Math.floor(Math.random()*(+4 - +0)+ +0);
	if(player==1){
	newCard.setAttribute('src', 'resources/'+suit[randomSuit]+'/'+c);
	element=document.getElementById('playerCard');
	element.appendChild(newCard);
	}
	if(player==2){
	newCard.setAttribute('src', 'resources/'+suit[randomSuit]+'/'+c);
	element1=document.getElementById('dealerCard');
	element1.appendChild(newCard);
	}
}
function randomCard(player){
	var randomIndex=Math.floor(Math.random()*(+13 - +0))+ +0;
	var cardlist=[2,3,4,5,6,7,8,9,10,'A','J','K','Q'];
	var card=cardlist[randomIndex]+".png";
	if(player==1){//check card value
		if((randomIndex>=0) &&(randomIndex<=8)){
			value = value + cardlist[randomIndex];
		}
		if((randomIndex>=10) && (randomIndex<=12)){
			value = value + 10;
		}
		if(randomIndex==9){
			if((value+11)<=21)
			{
				value = value + 11;
			}
			else
				value = value + 1;
		}
		document.getElementById('playerCardValue').innerHTML="Cards Value :" +value;	
	}//player1 card value
	if(player==2){
		if((randomIndex>=0) &&(randomIndex<=8)){
			value2 = value2 + cardlist[randomIndex];
		}
		if((randomIndex>=10) && (randomIndex<=12)){
			value2 = value2 + 10;
		}1
		if(randomIndex==9){
			if((value2+1)<=21)
			{
				value2 = value2 + 11;
			}
		else
			value2 = value2 + 1;
		}
		document.getElementById('dealerCardValue').innerHTML="Cards Value :" +value2;
	}//player2 card value
	checkValue(value,value2,standFlag);
	return card;
}
//Wining Condition
function checkValue(value,value2,standFlag){
	if(standFlag==0){	//ON BASIS OF HIT OPERATION
		if (value>21 && value2<=21){	//PLAYER EXCEEDED LIMIT
		//	document.getElementById('information').style.color="#ff4d4d";
			document.getElementById('information').innerHTML="Dealer Wins";
			display_balance();
			betAmount=0;
			bet_amount(betAmount);
			document.getElementById('again_btn').style.display="inline";
			document.getElementById('hit_btn').disabled="true";
			document.getElementById('double_btn').disabled="true";
		}
		else if(value>21 && value2>21){
			amount=amount+betAmount;
			bal.innerHTML="Account: "+amount + "$";
		}	
	}
	else if(standFlag==1){
		 	if(value<=21 && value2<=21){	//DEALER AND PLAYER BOTH IN LIMIT
				if(value>value2){		//PLAYER WoINS
		//			document.getElementById('infrmation').style.color="#4fe34f";
					document.getElementById('information').innerHTML="Player Wins";
					amount=amount+(betAmount*2);
					bal.innerHTML="Account: "+amount + "$";	
					betAmount=0;
					bet_amount(betAmount);
					document.getElementById('again_btn').style.display="inline";			
				}
				else if(value<value2){		//DEALER WINS
		//			document.getElementById('information').style.color="#ff4d4d";
					document.getElementById('information').innerHTML="Dealer Wins";
					betAmount=0;
					bet_amount(betAmount);
					document.getElementById('again_btn').style.display="inline";
				}
				else if(value==value2){		//DRAW
					document.getElementById('information').style.color="white";
					document.getElementById('information').innerHTML="DRAW";
					amount=amount+(betAmount);
					bal.innerHTML="Account: "+amount + "$";	
					betAmount=0;
					bet_amount(betAmount);	
					document.getElementById('again_btn').style.display="inline";
				}
			}
			else if(value<=21 && value2>21){	//DEALER EXCEED LIMIT
		//			document.getElementById('information').style.color="#4fe34f";
					document.getElementById('information').innerHTML="Player Wins";
					amount=amount+(betAmount*2);
					bal.innerHTML="Account: "+amount + "$";	
					betAmount=0;
					bet_amount(betAmount);
					document.getElementById('again_btn').style.display="inline";
			}
		}
}
function stand() {
	document.getElementById('hit_btn').setAttribute('disabled',true);
	document.getElementById('stand_btn').setAttribute('disabled',true);
	document.getElementById('double_btn').setAttribute('disabled',true);
	player=2;//Dealer
	element1.removeChild(backImg);
	addCard(player);
	while(value2<=17 ) {
		if(value2>value){
			break;
		}
		addCard(player);	
	}
	standFlag=1;
	checkValue(value,value2,standFlag);
}
function double(){
	player=1;
	if(amount-(betAmount*2)>=0){
		betAmount*=2;
		amount-=betAmount;
		display_balance(amount);
		bet_amount(betAmount);
		addCard(player);
		stand();
		document.getElementById('double_btn').setAttribute('disabled',true);	
	}
}
function noMoreBets() {
	document.getElementById('dollar1').setAttribute('disabled', true);
	document.getElementById('dollar10').setAttribute('disabled', true);
	document.getElementById('dollar100').setAttribute('disabled', true);
	document.getElementById('dollar500').setAttribute('disabled', true);
}
function startBets(){
	document.getElementById('dollar1').disabled=false;
	document.getElementById('dollar10').disabled=false;
	document.getElementById('dollar100').disabled=false;
	document.getElementById('dollar500').disabled=false;
}
function hideCards() {//FOR PLAY AGAIN
	bet_amount(betAmount);
	startBets();
	display_balance();
	while (element.firstChild) {
    element.removeChild(element.firstChild);
	}
	while(element1.firstChild){
		element1.removeChild(element1.firstChild);
	}
	document.getElementById('deal_btn').style.display="none";
	document.getElementById('hit_btn').style.display="none";
	document.getElementById('stand_btn').style.display="none";
	document.getElementById('double_btn').style.display="none";
	document.getElementById('again_btn').style.display="none";
	document.getElementById('information').innerHTML="Place Your Bets"
	value=0;
	value2=0;
	flag=0;
	document.getElementById('playerCardValue').innerHTML="Cards Value :" +value;
	document.getElementById('dealerCardValue').innerHTML="Cards Value :" +value2;
	betAmount=0;
	bet_amount(betAmount);
	startBets();
}
function restart() {//New Game
	amount=3000;//Reset Amount
	betAmount=0;//Reset Bet Amount
	hideCards();
}
