package com.exp.expensetracker.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exp.expensetracker.entities.Expense;
import com.exp.expensetracker.repositories.ExpenseRepository;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    // getting all expenses
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    // getting expense by id
    public Expense getExpenseById(int id) {
        return expenseRepository.findById(id).orElse(null);
    }

    // creating expense
    public Expense createExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    // deleting expense
    public void deleteExpense(int id) {
        expenseRepository.deleteById(id);
    }

}
