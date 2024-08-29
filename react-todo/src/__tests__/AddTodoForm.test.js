import { render, fireEvent, screen } from "@testing-library/react";

// a test to ensure that adding a new todo works
test("adds a new todo item", () => {
    render(<AddTodoForm />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'New Todo' } });
    fireEvent.click(screen.getByText('Add'));

    expect(screen.getByRole('textbox')).toHaveValue('');
});
