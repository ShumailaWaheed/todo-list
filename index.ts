#! /usr/bin/env node

import inquirer from "inquirer";

let todos: string[] = [];

async function createTodo() {
    try {
        do {
            let ans = await inquirer.prompt({
                type: "list",
                message: "Select an operation",
                name: "select",
                choices: ["Add", "Update", "View", "Delete", "Exit"],
            });

            switch (ans.select) {
                case "Add":
                    let addTodo = await inquirer.prompt({
                        type: "input",
                        message: "Add items in the list",
                        name: "todo",
                    });
                    todos.push(addTodo.todo);
                    console.log("Added:", addTodo.todo);
                    break;

                case "Update":
                    if (todos.length === 0) {
                        console.log("No items to update.");
                        break;
                    }
                    let updateTodo = await inquirer.prompt({
                        type: "list",
                        message: "Select item to update",
                        name: "todo",
                        choices: todos,
                    });

                    let newTodo = await inquirer.prompt({
                        type: "input",
                        message: "Enter new item",
                        name: "newTodo",
                    });

                    let indexToUpdate = todos.indexOf(updateTodo.todo);
                    if (indexToUpdate !== -1) {
                        todos[indexToUpdate] = newTodo.newTodo;
                        console.log("Updated:", updateTodo.todo, "to", newTodo.newTodo);
                    } else {
                        console.log("Item not found.");
                    }
                    break;

                case "View":
                    if (todos.length === 0) {
                        console.log("No items in the list.");
                    } else {
                        console.log("*** TO DO List ***");
                        todos.forEach(todo => console.log(todo));
                        console.log("*");
                    }
                    break;

                case "Delete":
                    if (todos.length === 0) {
                        console.log("No items to delete.");
                        break;
                    }
                    let deleteTodo = await inquirer.prompt({
                        type: "list",
                        message: "Select item to delete",
                        name: "todo",
                        choices: todos,
                    });

                    todos = todos.filter(item => item !== deleteTodo.todo);
                    console.log("Deleted:", deleteTodo.todo);
                    break;

                case "Exit":
                    console.log("Exiting...");
                    return;

                default:
                    console.log("Invalid operation.");
            }
        } while (true);
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

createTodo();
