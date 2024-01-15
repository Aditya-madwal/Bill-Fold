// linked list part :

class transaction {
    constructor(amount, category, label) {
        this.id = getRndInteger(0, 99999);
        this.amount = amount;
        this.category = category;
        this.label = label
        this.next = null;
    }
}

class wallet {
    constructor() {
        this.head = null;
        this.balance = 0;
    }

    isEmpty() {
        return this.head === null;
    }

    insertAtBeginning(amount, category) {
        const newtransaction = new transaction(amount, category);
        newtransaction.next = this.head;
        this.head = newtransaction;
    }

    insertAtEnd(amount, category) {
        const newtransaction = new transaction(amount, category);
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

        // If the key is the head
        if (current && current.amount === key) {
            this.head = current.next;
            current = null;
            return;
        }

        // Search for the key to be deleted
        let prev = null;
        while (current && current.amount !== key) {
            prev = current;
            current = current.next;
        }

        // If the key is not present
        if (!current) {
            return;
        }

        // Unlink the node from the linked list
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



// production :

let add_btn = document.getElementById('add_transaction')
let adjust_btn = document.getElementById('adjust_balance')

let balance = document.getElementById('balance')



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
    balance.innerHTML = parseInt(balance.innerText) - amount_input.value

    let current = wallet_1.head;
    let transactions = document.getElementById('transactions')
    transactions.innerHTML = ''
    let i = 1;
    while (current) {

        let transactions = document.getElementById('transactions')
        transactions.innerHTML += `<div class="transaction">
        <hr>
        <h4>${i}</h4>
        <h3>amount : <span class="amount">${current.amount}</span></h3>
        <h3>category : <span class="category">${current.category}</span></h3>
        <h6>label : ${current.label}</h6>
        <button class="dlt_trans" onclick="delete_transaction(){
            console.log("huhuh")
            // let prevSibling = this.previousElementSibling;
            // alert(prevSibling.innerHTML)

        }">delete transaction</button>
        </div>
        `
        // console.log(current.category, "---->", current.amount);
        current = current.next;
        i++;
    }

    amount_input.value = ''
    category_input.value = ''
})

let delete_transaction = document.getElementsByClassName('dlt_trans')
delete_transaction.addEventListener('click', function () {
    alert("kdxbhedbk")
})

