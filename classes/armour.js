class Armour {
    constructor(name, price, creator, description, protection, weight, type, sellLocations) {

        this.name = name;
        this.price = price;
        this.creator = creator;
        this.description = description;
        this.protection = protection;
        this.weight = weight;
        this.type = type;
        this.sellLocations = sellLocations;
        this.equipped = false;

    }
}

module.exports = Armour;