import Item from './Item'

import { v4 as uuidv4 } from "uuid";
import Shop from './Shop';
let uuid = uuidv4()

export default class User {

    constructor(
        private _name: string,
        private _age: number,
        private _id: string = uuid,
        private _cart: Item[] = [],
    ){}
    public get cart(): Item[] {
        return this._cart
    }
    public set cart(value: Item[]) {
        this._cart = value
    }
    public get age(): number {
        return this._age
    }
    public set age(value: number) {
        this._age = value
    }
    public get name(): string {
        return this._name
    }
    public set name(value: string) {
        this._name = value
    }
    public get id(): string {
        return this._id
    }
    public set id(value: string) {
        this._id = value
    }

    public addItem = (item: Item):void => {
        this.cart.push(item)
    }
    
    public removeAll = (item:Item):void => {
        let countItems: number = 0
        this.cart.forEach(e => e == item ? countItems++ : '')
        for (let i = 0; i < countItems; i++) {
            let idx = this.cart.indexOf(item)
            this.cart.splice(idx, 1)
        }
        Shop.refreshCart()
        console.log(`Removed all (${countItems}) ${item.name} from Cart.`)
    }

    public removeItem = (item:Item, number: number):void => {
        for (let i = 0; i < number; i++) {
            let index = this.cart.indexOf(item)
            this.cart.splice(index, 1)
        }
        Shop.refreshCart()
        console.log(`${number} ${item.name} has been removed from cart`)
    }

    public cartTotal = ():number => {
        let total: number = 0
        for(let i = 0; i < this.cart.length; i ++){
            total += this.cart[i].price
        }
        console.log(`Cart total is: ${total}`)
        return Math.round(total)
    }

    public printCart = (): void => {
        console.log('Cart: ')
        for (let i = 0; i < this.cart.length; i ++ ) {
            console.log(this.cart[i].name)
        }
    }

    public static createUser = (inName: string|null, inAge: string|null): User|undefined => {
        if (inName && inAge) {
            const loginUser = new User(inName, parseInt(inAge)) // order of constructor matters
            return loginUser
        }
        return undefined
    }

    public HTMLElementCart =():HTMLDivElement => {
        const itemDivBig:HTMLDivElement = document.createElement('div')
        for(let item of this._cart){
            let itemDiv = document.createElement('div')
            let itemH3 = document.createElement('h3')
            let quan = document.createElement('p')
            let price = document.createElement('p')
            let removeAll = document.createElement('button')
            let removeOne = document.createElement('button')
            itemDiv.className = "itemLine"
            itemH3.innerText = item.name
            quan.innerText = "Qty: 1"
            price.innerText = `$${item.price.toString()}`
            removeAll.id = `btnRmAll-${item.id}`
            removeAll.innerText = "Remove All"
            removeOne.id = `btnRmOne-${item.id}`
            removeOne.innerText = "Remove One"
            removeAll.addEventListener('click', (e): void => {
                e.preventDefault()
                this.removeAll(item)
            })
            removeOne.addEventListener('click', (e): void => {
                e.preventDefault()
                this.removeItem(item, 1)
            })
        itemDiv.append(itemH3, quan, price, removeAll, removeOne)
        itemDivBig.appendChild(itemDiv)
        }
        
        return itemDivBig
    }
}



