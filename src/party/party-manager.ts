import {EventEmitter} from "event-emitter-lite";
import cardStore from "../card/card-store";
import playerStore from "../player/player-store";
import {EPlayerStatus} from "../player/e-player";
import {IPlayer} from "../player/i-player";
import {ICard} from "../card/i-card";

class PartyManager{
	public onReady:EventEmitter<boolean> = new EventEmitter();
	public onUpdate:EventEmitter<any>=new EventEmitter();
	public onCardsBet:EventEmitter<ICard[]>=new EventEmitter();
	public storytellerId:string;
	constructor(){
		this.storytellerId = "";
		cardStore.onChange.once(()=>{
			this.onReady.emit(true);
		});
	}

	//apostando
	public betCard(playerId:string,cardId:number):void{
		let player = playerStore.getById(playerId);
	    player.pickedBet = cardId;
	    console.log(`${player.name} has bet card ${cardId}`);
	    player.status = EPlayerStatus.WAITING;
	    this.doDiscard(cardId,player);
		this.onUpdate.emit(null);
	}
	//trolando
	public discardCard(playerId:string,cardId:number):void{
		let player = playerStore.getById(playerId);
	    player.pickedCard = cardId;
	    console.log(`${player.name} has discard card ${cardId}`);
	    player.status = EPlayerStatus.WAITING;
	    this.doDiscard(cardId,player);

	    let allPlayerDiscarded:boolean = playerStore.get().every((playerToDiscard)=>playerToDiscard.status===EPlayerStatus.WAITING);
	    console.log(allPlayerDiscarded);
	    if(allPlayerDiscarded){
	    	//every player has discarded
	    	let betCards:number[] = [];
	    	playerStore
	    		.get()
	    		//.filter(playerReady=>playerReady.id!==this.storytellerId)
	    		.forEach((playerReady)=>{
	    			if(playerReady.id!==this.storytellerId){
	    				playerReady.status=EPlayerStatus.BETING;
	    			};	    			
	    			betCards.push(playerReady.pickedCard);

	    		});


	    	this.onCardsBet.emit(cardStore.get().filter((card)=> betCards.indexOf(card.id) > -1 ));
	    }

		this.onUpdate.emit(null);
	}
	//narrador escolhendo uma carta
	public pickCard(playerId:string,cardId:number):void{
	    let player = playerStore.getById(playerId);
	    player.pickedCard = cardId;
	    console.log(`${player.name} has picked card ${cardId}`);

	    // Let others players pick cards
	    if (this.storytellerId === player.id) {
	      console.log("Allow other players to pick cards");
	      for (let p of playerStore.get()) {
	        if (p.id !== player.id){
	        	p.status = EPlayerStatus.DISCARDING;
	        };
	      }
	    }
	    player.status = EPlayerStatus.WAITING;

	    this.doDiscard(cardId,player);

	    this.onUpdate.emit(null);
	}

	private doDiscard(cardId:number,player:IPlayer):void{
	    let indxStotytellerCard = -1;
	    player.deck.some((deckCard,indx)=>{
	    	if(deckCard.id===cardId){
	    		indxStotytellerCard = indx;
	    		return true;
	    	}
	    	return false;
	    });

	    if(indxStotytellerCard > -1){
	    	cardStore.discard(player.deck[indxStotytellerCard]);
	    	player.deck.splice(indxStotytellerCard,1);
	    };
	}

}

export default new PartyManager();