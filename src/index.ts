import { Shop } from "./widget/index"

const loginForm: HTMLElement = document.getElementById('loginForm')! // this ! stand for non-null assertion, which mean it value will never  be null or undefined

loginForm.addEventListener("submit", Shop.loginUser)