// linked list part :

console.log("beubcuwei")

class transaction {
    constructor(amount, category, label) {
        this.id = getRndInteger(0, 99999);
        this.amount = amount;
        this.category = category;
        this.label = label;
        this.next = null;
    }
}

class wallet {
    constructor() {
        this.head = null;
        this.balance = 0;
        this.income = 0;
        this.expense = 0;
    }

    isEmpty() {
        return this.head === null;
    }

    insertAtEnd(amount, category, label) {
        const newtransaction = new transaction(amount, category, label);
        if (newtransaction.label === 'income') {
            this.balance += parseInt(newtransaction.amount)
            this.income += parseInt(newtransaction.amount)
        } else {
            this.balance -= parseInt(newtransaction.amount)
            this.expense += parseInt(newtransaction.amount)
        }
        if (this.isEmpty()) {
            this.head = newtransaction;
            return;
        }
        let lasttransaction = this.head;
        while (lasttransaction.next) {
            lasttransaction = lasttransaction.next;
        }

        lasttransaction.next = newtransaction;
    }

    deletetransaction(key) {
        let current = this.head;

        if (current && current.amount === key) {
            this.head = current.next;
            current = null;
            return;
        }

        let prev = null;
        while (current && current.amount !== key) {
            prev = current;
            current = current.next;
        }
        prev.next = current.next;
        current = null;
    }

    printList() {
        let current = this.head;
        while (current) {
            console.log(`id : ${current.id}`)
            console.log(current.category, "---->", current.amount);
            current = current.next;
        }
    }
}

// new wallets :

// let wallets = []

// let new_wallet = document.getElementById('new')
// let wallets_container = document.getElementById('wallets')

// new_wallet.addEventListener('click', function () {
//     new_wallet_name = prompt("enter a name for the new wallet : ")
//     // console.log(new_wallet_name)
//     wallets.push(new_wallet_name)
//     console.log(wallets)

//     wallets_container.innerHTML += `<button onclick = "">${new_wallet_name}</button>`
// })



let wallet_1 = new wallet();

// brain :

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// function delete_transaction() {
//     console.log("huhuh")
//     let prevSibling = this.previousElementSibling;
//     alert(prevSibling.innerHTML)
// }

// if (document.getElementById("income").innerText === "") {
//     document.getElementById("income").style.backgroundColor = null
// }

// if (document.getElementById("expense").innerText === "") {
//     document.getElementById("expense").style.backgroundColor = null
// }

// production :

let add_btn = document.getElementById('add_transaction')
let adjust_btn = document.getElementById('adjust_balance')

let balance = document.getElementById('balance')

// let delete_transaction = document.getElementsByClassName('dlt_trans')
// delete_transaction.addEventListener('click', function () {
//     let prevSibling = this.previousElementSibling;
//     let id = prevSibling.innerText
//     wallet_1.delete_transaction(id)
// })


adjust_btn.addEventListener('click', function () {
    new_amt = prompt("enter new balance amount :")
    balance.innerHTML = new_amt
})

add_btn.addEventListener('click', function () {
    let amount_input = document.getElementById('amount_input')
    let category_input = document.getElementById('category_input')
    let label_input = document.getElementById('label_input')

    console.log(`${category_input} -> ${amount_input}`)

    let balance = document.getElementById('balance')


    wallet_1.insertAtEnd(parseInt(amount_input.value), category_input.value, label_input.value)

    if (label_input.value === 'income') {
        balance.innerHTML = parseInt(balance.innerText) + parseInt(amount_input.value)
    }
    else {
        balance.innerHTML = parseInt(balance.innerText) - parseInt(amount_input.value)
    }

    let current = wallet_1.head;
    let transactions = document.getElementById('transactions')
    transactions.innerHTML = ''
    let i = 1;
    while (current) {

        let transactions = document.getElementById('transactions')
        if (current.label === 'income') {
            transactions.innerHTML += `<div class="transaction, green">
        <h4>${i}</h4>
        <h3>Amount : <span class="amount">${current.amount}</span></h3>
        <h3>Description : <span class="category">${current.category}</span></h3>
        <h6>Label : ${current.label}</h6>
        <button class="dlt_trans" onclick="delete_transaction(){
            console.log("huhuh")
            // let prevSibling = this.previousElementSibling;
            // alert(prevSibling.innerHTML)

        }">delete transaction</button>
        </div>
        `
        } else {
            transactions.innerHTML += `<div class="transaction, red">
        <h4>${i}</h4>
        <h3>Amount : <span class="amount">${current.amount}</span></h3>
        <h3>Description : <span class="category">${current.category}</span></h3>
        <h6>Label : ${current.label}</h6>
        <button class="dlt_trans" onclick="delete_transaction(){
            console.log("huhuh")
            // let prevSibling = this.previousElementSibling;
            // alert(prevSibling.innerHTML)

        }">delete transaction</button>
        </div>
        `
        }
        // console.log(current.category, "---->", current.amount);
        current = current.next;
        i++;
    }

    amount_input.value = ''
    category_input.value = ''

    let totalincome = document.getElementById('income')
    totalincome.innerText = wallet_1.income

    let totalexpense = document.getElementById('expense')
    totalexpense.innerText = wallet_1.expense


})