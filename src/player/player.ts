import {ICard} from "../card/i-card";
import {EPlayerStatus} from "./e-player";
import {IPlayer} from "./i-player";
import cardStore from "../card/card-store";


export class Player implements IPlayer{
	public id:string;
	public name:string;
	public score:number;
	public color: string;
	public status:EPlayerStatus;
	public deck:ICard[];
	//apostando
	public bet(card:ICard):Player{
		this.status = EPlayerStatus.WAITING;
		return this;
	}
	//trolando
	public discard(card:ICard):Player{
		this.status = EPlayerStatus.WAITING;
		return this;
	}
	//narrador escolhendo uma carta
	public pick(card:ICard):Player{
		this.status = EPlayerStatus.WAITING;
		return this;
	}

}