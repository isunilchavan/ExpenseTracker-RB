import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const ExpenseTracker = () => {
  const [expense, setExpense] = useState({
    amount: "",
    description: "",
    category: "Food",
  });
  const [expensesList, setExpensesList] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpense({
      ...expense,
      [name]: value,
    });
  };

  const handleAddExpense = () => {
    // Send the expense data to Firebase
    fetch(
      "https://expense-trac-ad468-default-rtdb.firebaseio.com/expenses.json",
      {
        method: "POST",
        body: JSON.stringify(expense),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Expense added successfully:", data);
        setExpense({
          amount: "",
          description: "",
          category: "Food",
        });

        // Update the expense list
        setExpensesList([...expensesList, { ...expense, id: data.name }]);
      })
      .catch((error) => {
        console.error("Error adding expense:", error);
      });
  };

  useEffect(() => {
    // Fetch expenses from Firebase
    fetch(
      "https://expense-trac-ad468-default-rtdb.firebaseio.com/expenses.json"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const expenses = Object.values(data);
          setExpensesList(expenses);
        }
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  }, []);

  return (
    <Container>
      <Row>
        <Col md={6}>
          <h2>Add Expenses</h2>
          <Form>
            <Form.Group>
              <Form.Label>Amount Spent</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={expense.amount}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={expense.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={expense.category}
                onChange={handleInputChange}
              >
                <option value="Food">Food</option>
                <option value="Petrol">Petrol</option>
                <option value="Salary">Salary</option>
              </Form.Control>
            </Form.Group>
            <Button
              variant="primary"
              className="mt-2"
              onClick={handleAddExpense}
            >
              Add Expense
            </Button>
          </Form>
          <h2>Expenses List</h2>
          <ul>
            {expensesList.map((item, index) => (
              <li key={index}>
                Amount: {item.amount}, Description: {item.description},
                Category: {item.category}
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default ExpenseTracker;
