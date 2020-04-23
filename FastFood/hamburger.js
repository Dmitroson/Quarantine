class Hamburger{
    constructor(size, stuffing) {
        if(size === undefined){
            console.log('HamburgerException: NO SIZE GIVEN!');
            return;
        }

        if(!Hamburger.SIZES[size]){
            console.log(`HamburgerException: INVALID SIZE '${size}'`);
            return;
        }

        if(!Hamburger.STUFFINGS[stuffing]){
            console.log(`HamburgerException: INVALID STUFFING '${stuffing}'`);
            return;
        }
        this._size = size;
        this._stuffing = stuffing;
        this._toppings = new Array();
    }

    static SIZE_SMALL = 'SIZE_SMALL';
    static SIZE_BIG = 'SIZE_BIG';
    static SIZES = {
        [Hamburger.SIZE_SMALL]: {
            price: 50,
            calories: 20,
        },
        [Hamburger.SIZE_BIG]: {
            price: 100,
            calories: 40,
        },
    }

    static STUFFING_CHEESE = 'STUFFING_CHEESE';
    static STUFFING_SALAD = 'STUFFING_SALAD';
    static STUFFING_POTATOES = 'STUFFING_POTATOES';
    static STUFFINGS = {
        [Hamburger.STUFFING_CHEESE]: {
            price: 10,
            calories: 20,
        },
        [Hamburger.STUFFING_SALAD]: {
            price: 20,
            calories: 5,
        },
        [Hamburger.STUFFING_POTATOES]: {
            price: 15,
            calories: 10,
        },
    }

    static TOPPING_SAUCE = 'TOPPING_SAUCE';
    static TOPPING_MAYO = 'TOPPING_MAYO';
    static TOPPINGS = {
        [Hamburger.TOPPING_SAUCE]: {
            price: 15,
            calories: 0,
        },
        [Hamburger.TOPPING_MAYO]: {
            price: 20,
            calories: 5,
        },
    }

    get Size() {
        return this._size;
    }

    get Stuffing() {
        return this._stuffing;
    }

    get Toppings(){
        return this._toppings;
    }

    addTopping(topping){
        if(!this._toppings.includes(topping)){
            this._toppings.push(topping);
        }
        else{
            console.log(`Duplicate topping '${topping}'`);
        }
    }

    removeTopping(topping){
        this._toppings = this._toppings.filter(function (item) {
            return item != topping;
        });
    }

    calculatePrice(){
        let price = this._toppings.reduce(function (price, topping) {
            return price + Hamburger.TOPPINGS[topping].price;
        }, 0);
        price += Hamburger.SIZES[this._size].price + Hamburger.STUFFINGS[this._stuffing].price;
        return price;
    }

    countCalories(){
        let calories = this._toppings.reduce(function (previousCalories, topping) {
            return previousCalories + Hamburger.TOPPINGS[topping].calories;
        }, 0);
        calories += Hamburger.SIZES[this._size].calories + Hamburger.STUFFINGS[this._stuffing].calories;
        return calories;
    }

}


// *** Примеры использования класса взяты с комментариев задания

// маленький гамбургер с начинкой из сыра
let hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
// добавка из майонеза
hamburger.addTopping(Hamburger.TOPPING_MAYO);
// спросим сколько там калорий
console.log("Calories: %f", hamburger.countCalories());
// сколько стоит
console.log("Price: %f", hamburger.calculatePrice());
// я тут передумал и решил добавить еще приправу
hamburger.addTopping(Hamburger.TOPPING_SAUCE);
// А сколько теперь стоит?
console.log("Price with sauce: %f", hamburger.calculatePrice());



// не передали обязательные параметры
let h2 = new Hamburger(); // => HamburgerException: no size given

// передаем некорректные значения, добавку вместо размера
let h3 = new Hamburger(Hamburger.TOPPING_SAUCE, Hamburger.TOPPING_SAUCE);
// => HamburgerException: invalid size 'TOPPING_SAUCE'

// добавляем много добавок
let h4 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
hamburger.addTopping(Hamburger.TOPPING_MAYO);
hamburger.addTopping(Hamburger.TOPPING_MAYO);
// HamburgerException: duplicate topping 'TOPPING_MAYO'