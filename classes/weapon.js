class Weapon {
    constructor(name, price, creator, description, damage, weight, type, sellLocations) {

        this.name = name;
        this.price = price;
        this.creator = creator;
        this.description = description;
        this.damage = damage;
        this.weight = weight;
        this.type = type;
        this.sellLocations = sellLocations;
        this.equipped = false;

    }
}

module.exports = Weapon;