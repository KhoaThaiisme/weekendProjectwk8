import { v4 as uuidv4 } from 'uuid';
import Shop from './Shop'
let uuid = uuidv4()

export default class Item {
    constructor(
        private _name: string,
        private _price: number,
        private _desc: string,
        private _id: string = uuid
    ){}
    public get desc(): string {
        return this._desc
    }
    public set desc(value: string) {
        this._desc = value
    }
    public get price(): number {
        return this._price
    }
    public set price(value: number) {
        this._price = value
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

    public itemElement = (item: Item): HTMLDivElement => {
        const div: HTMLDivElement = document.createElement('div')!

        let nameH3: HTMLElement = document.createElement('h3') 
        let itemDesc: HTMLElement = document.createElement('p') 
        let itemPrice: HTMLElement = document.createElement('p') 
        let addToCart: HTMLElement = document.createElement('button')
        nameH3.innerText = item.name
        itemDesc.innerText = item.desc
        itemPrice.innerText = `$${item.price.toString()}`
        addToCart.id = `btnAddToCart-${item.id}`
        addToCart.innerText = "Add to Cart"
        div.append(nameH3, itemDesc, itemPrice, addToCart)
        // @ts-ignore
        addToCart.addEventListener('click', (e): void => {
            e.preventDefault()
            console.log(Shop.newUser)
            if (Shop.newUser !== undefined) {
                Shop.newUser.addItem(item)
            }
        })
        return div
    }

}