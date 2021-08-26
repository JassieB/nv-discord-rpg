class Consumable {
    constructor(name, price, creator, description, restore, weight, type, sellLocations) {

        this.name = name;
        this.price = price;
        this.creator = creator;
        this.description = description;
        this.restore = restore;
        this.weight = weight;
        this.type = type;
        this.sellLocations = sellLocations;

    }
}

module.exports = Consumable;