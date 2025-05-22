class Player {

    constructor(name, startingRoom) {
        this.name = name;
        this.currentRoom = startingRoom;
        this.items = [];
    }

    move(direction) {

        const nextRoom = this.currentRoom.getRoomInDirection(direction);

        // If the next room is valid, set the player to be in that room
        if (nextRoom) {
            this.currentRoom = nextRoom;

            nextRoom.printRoom(this);
        } else {
            console.log("You cannot move in that direction");
        }
    }

    printInventory() {
        if (this.items.length === 0) {
            console.log(`${this.name} is not carrying anything.`);
        } else {
            console.log(`${this.name} is carrying:`);
            for (let i = 0 ; i < this.items.length ; i++) {
                console.log(`  ${this.items[i].name}`);
            }
        }
    }

    takeItem(itemName) {
        let item = this.currentRoom.getItemByName(itemName);
        this.items.push(item);
        this.currentRoom.items = this.currentRoom.items.filter(i => i.name !== itemName);
        console.log(`You have taken the ${itemName}`);
        

    }

    dropItem(itemName) {
        let item = this.getItemByName(itemName);
        this.currentRoom.items.push(item);
        this.items = this.items.filter(i => i.name !== itemName);
        console.log(`You have dropped the ${itemName}`);
    }

    eatItem(itemName) {
        let item = this.getItemByName(itemName);
        if (item.isFood) {
            console.log(`You have eaten the ${itemName}`);
            this.items = this.items.filter(i => i.name !== itemName);
        } else {
            console.log(`You cannot eat the ${itemName}`);
        }

    }

    getItemByName(name) {
        const item = this.items.find(item => item.name === name);
        if (!item) {
            throw new Error(`Error: Item ${name} not found in inventory`);
        }
        return item;
    }
}

module.exports = {
  Player,
};
