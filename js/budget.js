const budgetInput = document.querySelector('#budgetform');

const itemNameInput = document.querySelector('#itemName');

const amountInput = document.querySelector('#amount');

const dateInput = document.querySelector('#date');

const timeInput = document.querySelector('#time');

const totalIncome = document.querySelector('#totalIncome');

const totalExpense = document.querySelector('#totalExpense');

const totalBalance = document.querySelector('#totalBalance');

const transactionList = document.querySelector('#transactionList');

let transactions = [];

budgetInput.addEventListener('submit', function (event) {

    event.preventDefault();

    const itemName = itemNameInput.value;

    const amount = Number(amountInput.value);

    const date = dateInput.value;

    const time = timeInput.value;

    const type = document.querySelector(
        'input[name="type"]:checked'
    ).value;

    const budgetData = {
        id: Date.now(),
        title: itemName,
        amount: amount,
        date: date,
        time: time,
        type: type
    };

    transactions.push(budgetData);

    console.log('transactions', transactions);

    renderTransactions();

    updateSummary();

    budgetInput.reset();
});


function renderTransactions() {

    transactionList.innerHTML = "";

    transactions.forEach(function (transaction) {

        const listItem = document.createElement("li");

        let dateTime = "";

        if (transaction.date) {
            dateTime += transaction.date;
        }

        if (transaction.time) {
            dateTime += " " + transaction.time;
        }

        if (dateTime !== "") {

            listItem.textContent =
                `${dateTime} - ${transaction.title} - ${transaction.amount} บาท - ${transaction.type}`;

        } else {

            listItem.textContent =
                `${transaction.title} - ${transaction.amount} บาท - ${transaction.type}`;

        }

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "ลบ";

        deleteButton.addEventListener("click", function () {

            transactions = transactions.filter(function (item) {

                return item.id !== transaction.id;

            });

            renderTransactions();

            updateSummary();

        });

        listItem.appendChild(deleteButton);

        transactionList.appendChild(listItem);

    });
}


function updateSummary() {

    const incomeTransactions = transactions.filter(
        function (transaction) {

            return transaction.type === "income";

        }
    );

    const totalIncomeAmount = incomeTransactions.reduce(
        function (total, transaction) {

            return total + transaction.amount;

        },
        0
    );


    const expenseTransactions = transactions.filter(
        function (transaction) {

            return transaction.type === "expense";

        }
    );

    const totalExpenseAmount = expenseTransactions.reduce(
        function (total, transaction) {

            return total + transaction.amount;

        },
        0
    );


    const balance =
        totalIncomeAmount - totalExpenseAmount;


    // แสดงผลรายรับ
    totalIncome.textContent =
        `รายรับทั้งหมด: ${totalIncomeAmount} บาท`;

    // แสดงผลรายจ่าย
    totalExpense.textContent =
        `รายจ่ายทั้งหมด: ${totalExpenseAmount} บาท`;

    // แสดงผลยอดคงเหลือ
    totalBalance.textContent =
        `ยอดคงเหลือ: ${balance} บาท`;
}


renderTransactions();

updateSummary();