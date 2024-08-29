import TodoList from "../components/TodoList";
import AddTodoForm from "../components/AddTodoForm";
import { render, fireEvent, screen } from "@testing-library/react";

//Test to see if TodoList renders correctly
test("renders TodoList component with initial todo", () => {
    render(<TodoList />);
    expect(screen.getByText("Sample Todo")).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(screen.getByText("Remove")).toBeInTheDocument();
});


// a test to verify that toggling todos works
test("toggles todo completion", () => {
    render(<TodoList />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
});


// a test to verify that deleting todos works
test("removes a todo item", () => {
    render(<TodoList />);

    fireEvent.click(screen.getByText("Remove"));

    expect(screen.queryByText("Sample Todo")).toBeNull();
});