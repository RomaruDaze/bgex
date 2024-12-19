var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState } from "react";
function Reminder() {
    var _a = useState([
        { name: "task1", deadline: new Date("2023-12-20") },
        { name: "task2", deadline: new Date("2023-12-21") },
        { name: "task3", deadline: new Date("2023-12-22") },
    ]), tasks = _a[0], setTasks = _a[1];
    var _b = useState(""), newTaskName = _b[0], setNewTaskName = _b[1];
    var _c = useState(""), newTaskDeadline = _c[0], setNewTaskDeadline = _c[1];
    var _d = useState(false), isDialogOpen = _d[0], setIsDialogOpen = _d[1];
    var handleAddTask = function () {
        if (newTaskName.trim() && newTaskDeadline) {
            var newTask = {
                name: newTaskName.trim(),
                deadline: new Date(newTaskDeadline),
            };
            setTasks(__spreadArray(__spreadArray([], tasks, true), [newTask], false));
            setNewTaskName("");
            setNewTaskDeadline("");
            setIsDialogOpen(false);
        }
    };
    var sortedTasks = tasks
        .sort(function (a, b) { return a.deadline.getTime() - b.deadline.getTime(); })
        .slice(0, 3);
    return (React.createElement("div", { className: "reminder-card" },
        React.createElement("h2", null, "Reminder"),
        React.createElement("div", { className: "reminder-card-content" },
            React.createElement("ul", null, sortedTasks.map(function (task, index) { return (React.createElement("li", { key: index },
                task.name,
                " - ",
                task.deadline.toLocaleDateString())); })),
            React.createElement("button", { onClick: function () { return setIsDialogOpen(true); } }, "Add Task")),
        isDialogOpen && (React.createElement("div", { className: "reminder-dialog" },
            React.createElement("h3", null, "Add New Task"),
            React.createElement("input", { type: "text", value: newTaskName, onChange: function (e) { return setNewTaskName(e.target.value); }, placeholder: "Task Name" }),
            React.createElement("input", { type: "date", value: newTaskDeadline, onChange: function (e) { return setNewTaskDeadline(e.target.value); } }),
            React.createElement("button", { onClick: handleAddTask }, "Add"),
            React.createElement("button", { onClick: function () { return setIsDialogOpen(false); } }, "Cancel")))));
}
export default Reminder;
