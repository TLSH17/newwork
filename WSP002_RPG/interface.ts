import {Monster} from "./rpg";


interface Attack{
    damage:number;
 }
 
 class BowAndArrow implements Attack{
     damage: number;

     constructor(input:number){
         this.damage = input;
     }
 }
 
 class ThrowingSpear implements Attack{
    constructor(public damage: number){}
 }

 class Swords implements Attack{
    constructor(public damage: number){}
 }

 class MagicSpells implements Attack{
    constructor(public damage: number){}
 }

 
 
 
 interface Player{
     attack(monster:Monster): void; //void, no need return anything
     switchAttack(): void;
     gainExperience(exp:number): void;
 }
 
 class Amazon implements Player{
     private primary: Attack;
     private secondary: Attack;
     private usePrimaryAttack: boolean;
     constructor(){
         this.primary = new BowAndArrow(30);
         this.secondary = new ThrowingSpear(40);
         // TODO: set the default value of usePrimaryAttack
      }
 
      attack(monster:Monster):void{
          if(this.usePrimaryAttack){
             // TODO: use primary attack
          }else{
             // TODO: use secondary attack
          }
      }
 
      switchAttack(){
          // TODO: Change the attack mode for this player
      }
 
      //.. The remaining methods.
 }
 
