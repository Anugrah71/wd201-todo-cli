/* eslint-disable no-undef */
const todoList = require("../todo");

const {
  all,
  markAsComplete,
  add,
  overdue,
  dueToday,
  dueLater,
  toDisplayableList,
} = todoList();
describe("Todolist test suite", () => {
  beforeEach(() => {
    while (all.length > 0) {
      all.pop();
    }
    add({
      title: "Submit assignment",
      dueDate: "2024-09-30",
      completed: false,
    });
    add({
      title: "Pay rent",
      dueDate: new Date().toISOString().split("T")[0],
      completed: true,
    });

    add({
      title: "Service Vehicle",
      dueDate: new Date().toISOString().split("T")[0],
      completed: false,
    });

    add({
      title: "File taxes",
      dueDate: new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .split("T")[0],
      completed: false,
    });

    add({
      title: "Pay electric bill",
      dueDate: new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .split("T")[0],
      completed: false,
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
  test("Should retrieve overdue items", () => {
    const overdueItems = overdue();
    expect(overdueItems.length).toBe(1);
    expect(overdueItems[0].title).toBe("Submit assignment");
  });

  test("Should retrieve due today items", () => {
    const dueTodayItems = dueToday();
    console.log("Due today items recevide :", dueTodayItems);
    expect(dueTodayItems.length).toBe(2);
    expect(dueTodayItems.map((todo) => todo.title)).toContain("Pay rent");
    expect(dueTodayItems.map((todo) => todo.title)).toContain(
      "Service Vehicle",
    );
  });

  test("Should retrieve due later items", () => {
    const dueLaterItems = dueLater();
    expect(dueLaterItems.length).toBe(2);
    expect(dueLaterItems.map((todo) => todo.title)).toContain("File taxes");
    expect(dueLaterItems.map((todo) => todo.title)).toContain(
      "Pay electric bill",
    );
  });

  test("Should format todo list using toDisplayableList", () => {
    const todos = [
      { title: "Submit assignment", dueDate: "2024-09-30", completed: false },
      { title: "Pay rent", dueDate: "2024-10-01", completed: true },
    ];
    const displayableList = toDisplayableList(todos);
    expect(displayableList).toContain("[ ] Submit assignment 2024-09-30");
    expect(displayableList).toContain("[x] Pay rent");
  });
});
