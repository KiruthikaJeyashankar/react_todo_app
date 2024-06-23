import React from 'react';
import { render } from '@testing-library/react';
import Task from './Task';
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";

describe('Task Tests', () => {
    const task = {
        text: 'Test task',
        completed: false
    };

    it('should render task list', () => {
        const component = render(<Task task={task} tellParent={jest.fn()} />);

        expect(component.getByText(task.text)).toBeInTheDocument();
        expect(component.asFragment()).toMatchSnapshot();
    });

    it('should call tell parent when a task is toggled as completed', () => {
        let mockTellParent = jest.fn();

        const component = render(<Task task={task} tellParent={mockTellParent} />);

        expect(component.getByText(task.text)).toBeInTheDocument();

        userEvent.click(component.getByText(task.text));

        expect(mockTellParent).toBeCalledTimes(1);
        expect(mockTellParent).toBeCalledWith({ ...task, completed: true });
    });

    it('should call tell parent when a task is toggled as not completed', () => {
        const taskCompleted = {
            text: 'Test task',
            completed: true
        };
        let mockTellParent = jest.fn();

        const component = render(<Task task={taskCompleted} tellParent={mockTellParent} />);

        expect(component.getByText(taskCompleted.text)).toBeInTheDocument();

        userEvent.click(component.getByText(taskCompleted.text));

        expect(mockTellParent).toBeCalledTimes(1);
        expect(mockTellParent).toBeCalledWith({ ...task, completed: false });
    });

});
