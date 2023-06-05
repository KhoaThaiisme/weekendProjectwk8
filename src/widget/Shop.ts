import { v4 as uuidv4 } from "uuid"
import Item from "./Item"
import User from './User'

const uuid = uuidv4()

export default class Shop {
    public static newUser: User|undefined
    public static currentCart: Shop

    constructor(
        private _shopName: string,
        private _parent: HTMLElement,
        private _id: string = uuid,
        private _products: Item[] = []
    ){
        this.addDefaultItems()
        this.parent.innerHTML = ""
        this.parent.id = "shopContainer"
        this.parent.append(this.showItems(), this.updateCart())
    }
    public get parent(): HTMLElement {
        return this._parent
    }
    public set parent(value: HTMLElement) {
        this._parent = value
    }
    public get products(): Item[] {
        return this._products
    }
    public set products(value: Item[]) {
        this._products = value
    }
    public get shopName(): string {
        return this._shopName
    }
    public set shopName(value: string) {
        this._shopName = value
    }
    public get id(): string {
        return this._id
    }
    public set id(value: string) {
        this._id = value
    }

    public static loginUser = (e): void => {
        e.preventDefault()
        const userInput = document.getElementById('userInput') as HTMLInputElement
        const ageInput = document.getElementById('ageInput') as HTMLInputElement
        const cartContainer: HTMLElement = document.getElementById('cartContainer')!
        const loginForm: HTMLElement = document.getElementById('loginForm')!
        const loginText: HTMLElement = document.getElementById('loginText')!
        const disappear: Partial<CSSStyleDeclaration> = { display: 'none' }
        Object.assign(loginForm.style, disappear)
        loginText.innerText = `Welcome, ${userInput.value}! Happy shopping!`
        Shop.newUser = User.createUser(userInput.value, ageInput.value)
        Shop.currentCart = new Shop("NewPlayGround", cartContainer)
    }

    public static refreshCart = (): void => {
        document.getElementById('cartDivElement')?.replaceChildren(Shop.currentCart.updateCart())
    }

    // Methods
    public showItems = (): HTMLDivElement => {
        const div: HTMLDivElement = document.createElement('div')
        for (let productItem of this.products) {
            div.append(productItem.itemElement(productItem))
        }
        return div
    }

    /* @ts-ignore */
    public updateCart = (): HTMLDivElement => {
        if (Shop.newUser) {
            const divCart: HTMLDivElement = document.createElement('div')
            divCart.id = "cartDivElement"
            if (Shop.newUser.cart.length > 0) {
                divCart.appendChild(Shop.newUser.HTMLElementCart())
            } else {
                const emptyItems: HTMLElement = document.createElement('p') 
                emptyItems.innerText = "Cart is empty."
                divCart.appendChild(emptyItems)
            }
            return divCart
        }
    }

    private addDefaultItems = (): void => {
        this._products.push(new Item("Off-White T-shirt", 480, "Street Wear Style T-shirt"))
        this._products.push(new Item("Li-ning Sneaker", 800, "Chinese Brand Luxury Wannabe"))
        this._products.push(new Item("Y-3 Addidas Pant", 250, "Luxury Sportwear Come From Addidas"))
        this._products.push(new Item("Balenciaga Jean", 1200, "Torn Jean That Look Like Rag"))
        this._products.push(new Item("Dolce&Gabana Pant", 2300, "This Price Come From Somewhere"))
        this._products.push(new Item("Le Labo Santal 33", 125, "Fresh Smell Like Woods"))
    }
}
