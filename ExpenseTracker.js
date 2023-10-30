import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const ExpenseTracker = () => {
  const [expense, setExpense] = useState({
    amount: "",
    description: "",
    category: "Food",
  });
  const [expensesList, setExpensesList] = useState([]);

  const [editExpense, setEditExpense] = useState(null); // State to store the expense being edited

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpense({
      ...expense,
      [name]: value,
    });
  };

  const handleAddExpense = () => {
    if (editExpense) {
      // If editExpense is not null, it means we are in edit mode
      handleEditExpense();
    } else {
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
    }
  };

  const handleEditExpense = () => {
    // Send the edited expense data to Firebase
    fetch(
      `https://expense-trac-ad468-default-rtdb.firebaseio.com/expenses/${editExpense.id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          amount: expense.amount,
          description: expense.description,
          category: expense.category,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Expense edited successfully:", data);

        // Reset the edit state and clear the form
        setEditExpense(null);
        setExpense({
          amount: "",
          description: "",
          category: "Food",
        });

        // Update the expense list
        const updatedList = expensesList.map((item) =>
          item.id === editExpense.id ? { id: item.id, ...expense } : item
        );
        setExpensesList(updatedList);
      })
      .catch((error) => {
        console.error("Error editing expense:", error);
      });
  };

  const handleDeleteExpense = (id) => {
    // Send a DELETE request to remove the expense from Firebase
    fetch(
      `https://expense-trac-ad468-default-rtdb.firebaseio.com/expenses/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then(() => {
        console.log("Expense successfully deleted");

        // Update the expense list by removing the deleted expense
        const updatedList = expensesList.filter((item) => item.id !== id);
        setExpensesList(updatedList);
      })
      .catch((error) => {
        console.error("Error deleting expense:", error);
      });
  };

  const handleEditClick = (item) => {
    // Populate the form with the data of the expense to be edited
    setEditExpense(item);
    setExpense({
      amount: item.amount,
      description: item.description,
      category: item.category,
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
          const expenses = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
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
          <h2>Add/Edit Expenses</h2>
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
            {editExpense ? (
              <Button
                variant="primary"
                className="mt-2"
                onClick={handleAddExpense}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="primary"
                className="mt-2"
                onClick={handleAddExpense}
              >
                Add Expense
              </Button>
            )}
          </Form>
          <h2>Expenses List</h2>
          <ul>
            {expensesList.map((item) => (
              <li key={item.id}>
                Amount: {item.amount}, Description: {item.description},
                Category: {item.category}
                <Button
                  variant="success"
                  className="ml-2"
                  onClick={() => handleEditClick(item)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger" 
                  className="ml-2"
                  style={{ marginLeft: '5px' }}
                  onClick={() => handleDeleteExpense(item.id)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default ExpenseTracker;
