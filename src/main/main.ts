import playerStore from "../player/player-store";
import partyManager from "../party/party-manager";
import {IPlayer} from "../player/i-player";
import {ICard} from "../card/i-card";

partyManager.onReady.once(()=>{
	//so pode iniciar depois de ler as cartas

	let player1:IPlayer = {
		id:'1'
		,name:'player 1'
		,color:''
		,score:0
		,status:0
		,deck:[]
	};

	let player2:IPlayer = {
		id:'2'
		,name:'player 2'
		,color:''
		,score:0
		,status:0
		,deck:[]
	};

	let player3:IPlayer = {
		id:'3'
		,name:'player 3'
		,color:''
		,score:0
		,status:0
		,deck:[]
	};


	playerStore.add(player1);
	playerStore.add(player2);
	playerStore.add(player3);

	partyManager.storytellerId = player1.id;

	partyManager.pickCard(player1.id,player1.deck[2].id);


	partyManager.discardCard(player2.id,player2.deck[2].id);
	partyManager.discardCard(player3.id,player3.deck[2].id);



});

partyManager.onUpdate.subscribe(()=>{
	console.log(playerStore.get()); 
});

partyManager.onCardsBet.subscribe((cards:ICard[])=>console.log(cards));

