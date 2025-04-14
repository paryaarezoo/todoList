const themeSwitch = document.getElementById('theme-switcher');
const body = document.querySelector('body');
const addBtn = document.getElementById('add-btn');
const todoInput = document.getElementById("add");
const clearBtn = document.querySelector('.clear-all');


function main() {




    themeSwitch.addEventListener('click', () => {
        darkmode();
    });

    function darkmode() {
        body.classList.toggle('dark-mode');
    }

    makeTodoList(JSON.parse(localStorage.getItem("todos")));
    addBtn.addEventListener("click", () => {
        const item = todoInput.value.trim();

        if (item === "") {
            alert("یک تسک وارد کنید");
            return;
        } else if (item.length > 20) {
            alert("این تسک شامل تعداد زیادی کاراکتر است");
            return;
        } else if (item.length < 3) {
            alert("تسک شما بسیار کوتاه است");
            return;
        } else if (item.length >= 3 && item.length <= 20) {
            todoInput.value = "";

            const todos = !localStorage.getItem("todos") ? [] : JSON.parse(localStorage.getItem("todos"));


            const currentTodo = {
                item: item,
                isCompleted: false
            }


            todos.push(currentTodo);
            localStorage.setItem("todos", JSON.stringify(todos));
            console.log(todos);
        }

    })

    clearBtn.addEventListener("click", () => {
        const todos = JSON.parse(localStorage.getItem("todos"));
        if (todos) {
            todos.length = 0;
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    })







}

function makeTodoList(todoArray) {
    if (!todoArray) {
        return null;
    }

    todoArray.forEach(todoObj => {
            const cardBody = document.createElement("li")
            const card = document.createElement("div")
            const cbInput = document.createElement("input")
            const work = document.createElement("span")
            const clear = document.createElement("button")
            const iconTrash = document.createElement("i")
            const iconPen = document.createElement("i")



            cardBody.classList.add("card-body")
            cbInput.classList.add("cb-input", "form-check-input")
            work.classList.add("work")
            clear.classList.add("clear")
            iconTrash.classList.add("bi", "bi-trash3")
            iconTrash.id = "trash"
            iconPen.classList.add("bi", "bi-pen")

            cardBody.appendChild(card)
            card.appendChild(cbInput)
            card.appendChild(work)
            cardBody.appendChild(clear)
            clear.appendChild(iconTrash)
            clear.appendChild(iconPen)
            document.querySelector(".todos").appendChild(cardBody);








            cardBody.setAttribute("draggable", true)
            cbInput.setAttribute("type", "checkbox")


            work.textContent = todoObj.item



            iconTrash.addEventListener("click", () => {
                cardBody.remove()


            })

            iconPen.addEventListener("click", () => {
                const inputEdit = document.createElement("input")
                inputEdit.classList.add("input-edit")
                inputEdit.setAttribute("type", "text")
                inputEdit.setAttribute("placeholder", "Edit Your Task")
                inputEdit.value = work.textContent

                card.replaceChild(inputEdit, work)
                inputEdit.focus()

                inputEdit.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") {
                        const newValue = inputEdit.value.trim()
                        work.textContent = newValue
                        card.replaceChild(work, inputEdit)

                    }
                })


                const todos = JSON.parse(localStorage.getItem("todos"));
                todos.forEach((todo) => {
                    if (todo.item === work.textContent) {
                        todo.item = newValue;
                    }
                });
                localStorage.setItem("todos", JSON.stringify(todos));

            })


            cbInput.addEventListener("change", () => {
                const todos = JSON.parse(localStorage.getItem("todos")) ;
                todos.forEach((todo) => {
                    if (todo.item === todoObj.item) {
                        todo.isCompleted = cbInput.checked;
                    }
                })
                localStorage.setItem("todos", JSON.stringify(todos));
            })

            if(todoObj.isCompleted){
                cbInput.checked = true;
                work.classList.add("done")

            }
            // if(cbInput.checked){
            //     todo.isCompleted = true;
            //     work.classList.add("done")

            // }
         

    });




}











document.addEventListener('DOMContentLoaded', main);