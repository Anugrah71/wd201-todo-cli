const todoList = require("../todo");

const { all, markAsComplete, add } = todoList();
describe("Todolist test suite", () => {
  beforeAll(() => {
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toISOString().split("T")[0],
    });
  });
  test("Shoud add new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toISOString().split("T")[0],
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });
  test("Should mark a todo as completed", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
});
