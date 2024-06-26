package com.exp.expensetracker.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exp.expensetracker.entities.Expense;
import com.exp.expensetracker.services.ExpenseService;
import com.exp.expensetracker.services.ExpenseService.ExpenseData;

@RestController
@RequestMapping("/expense")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    // getting all expenses
    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses() {
        List<Expense> expenses = expenseService.getAllExpenses();
        return new ResponseEntity<>(expenses, HttpStatus.OK);
    }

    // getting all expenses of a given user id
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Expense>> getExpensesByUserId(@PathVariable("userId") int userId) {
        List<Expense> expenses = expenseService.getExpensesByUserId(userId);
        return new ResponseEntity<>(expenses, HttpStatus.OK);
    }

    // getting expense by id
    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable("id") int id) {
        Expense expense = expenseService.getExpenseById(id);
        if (expense != null) {
            return new ResponseEntity<>(expense, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // creating expense
    @PostMapping
    public ResponseEntity<Expense> createExpense(@RequestBody Expense expense) {
        Expense createdExpense = expenseService.createExpense(expense);
        return new ResponseEntity<>(createdExpense, HttpStatus.CREATED);
    }

    // updating expense
    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable("id") int id, @RequestBody Expense expenseDetails) {
        Expense updatedExpense = expenseService.updateExpense(id, expenseDetails);
        if (updatedExpense != null) {
            return new ResponseEntity<>(updatedExpense, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // deleting an expense
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable("id") int id) {
        expenseService.deleteExpense(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // getting all expense amounts along with dates of a given user id
    @GetMapping("/user/{userId}/amounts-and-dates")
    public ResponseEntity<List<ExpenseData>> getExpenseDataByUserId(@PathVariable("userId") int userId) {
        List<ExpenseData> expenseData = expenseService.getExpenseDataByUserId(userId);
        return new ResponseEntity<>(expenseData, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}/monthly-expenses")
    public ResponseEntity<Map<String, Integer>> getMonthlyExpenses(@PathVariable("userId") int userId) {
        Map<String, Integer> monthlyExpenses = expenseService.getMonthlyExpenses(userId);
        return new ResponseEntity<>(monthlyExpenses, HttpStatus.OK);
    }

}
