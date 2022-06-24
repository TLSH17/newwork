// Declaration of Class and its methods
class Player {
    private strength: number;
    private name: string;

    constructor(strength: number, name: string) {
        this.strength = strength;
        this.name = name;
    }

    //Methods
    attack(monster: Monster) {
        do {
            let randomNum = Math.floor(Math.random()*3)
            if (randomNum === 0) {
                monster.injure(this.strength*2)
                console. log(`粟子球 ${this.name} 攻擊了太陽神的翼神龍  (HP: ${monster.hp}) [CRITICAL!!]`)
            } else {
                monster.injure(this.strength) 
                console. log(`粟子球 ${this.name} 攻擊了太陽神的翼神龍 (HP: ${monster.hp})`)       
            }
        } while (monster.hp>0)
    }
    // gainExperience(exp:number){

    // }

}

export class Monster {
    // Think of how to write injure
    hp: number;
    
    constructor(hp: number) {
        this.hp = hp;
    }

    //Methods
    injure(playerDam:number) {
        this.hp -= playerDam
    }

}

// Invocations of the class and its methods
const player = new Player(30, 'Tommy');
const monster = new Monster(200);

player.attack(monster);
// English counterpart: Player attacks monster