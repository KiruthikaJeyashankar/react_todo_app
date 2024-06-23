import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

jest.mock('./ToDoList/ToDoList', () => {
    return function MockToDoList() {
        return <div data-testid="mock-todo-list-id">Mock ToDoList</div>;
    }
});

jest.mock('./Header/Header', () => {
    return function MockHeader() {
        return <div data-testid="mock-header-id">Mock Header</div>;
    }
});

describe('App Tests', () => {
    it('should render header component', () => {
        const component = render(<App/>);

        expect(component.getByTestId('mock-header-id')).toBeInTheDocument();
        expect(component.getByTestId('mock-header-id')).toHaveTextContent(`Mock Header`);
    });

    it('should render list component', () => {
        const component = render(<App/>);

        expect(component.getByTestId('mock-todo-list-id')).toBeInTheDocument();
        expect(component.getByTestId('mock-todo-list-id')).toHaveTextContent(`Mock ToDoList`);
    });
});
