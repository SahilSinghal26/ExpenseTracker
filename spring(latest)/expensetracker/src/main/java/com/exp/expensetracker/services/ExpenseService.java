package com.exp.expensetracker.services;

import java.sql.Date;
import java.text.DateFormatSymbols;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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

    // getting all the expenses of a particular userId
    public List<Expense> getExpensesByUserId(int userId) {
        return expenseRepository.findByPaidBy(userId);
    }

    // getting expense by id
    public Expense getExpenseById(int id) {
        return expenseRepository.findById(id).orElse(null);
    }

    // creating expense
    public Expense createExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    // updating the expense
    public Expense updateExpense(int id, Expense expenseDetails) {
        Optional<Expense> optionalExpense = expenseRepository.findById(id);
        if (optionalExpense.isPresent()) {
            Expense expense = optionalExpense.get();
            expense.setExpenseName(expenseDetails.getExpenseName()); // Update to use expenseName
            expense.setAmount(expenseDetails.getAmount());
            // Set other fields accordingly
            return expenseRepository.save(expense);
        } else {
            return null;
        }
    }

    // deleting expense
    public void deleteExpense(int id) {
        expenseRepository.deleteById(id);
    }

    // getting all expense amounts along with dates of a given user id
    public List<ExpenseData> getExpenseDataByUserId(int userId) {
        List<Expense> expenses = expenseRepository.findByPaidBy(userId);
        return expenses.stream()
                .map(expense -> new ExpenseData(expense.getAmount(), expense.getExpenseDate()))
                .collect(Collectors.toList());
    }

    public static class ExpenseData {
        private double amount;
        private Date date;

        public ExpenseData(double amount, Date date) {
            this.amount = amount;
            this.date = date;
        }

        public double getAmount() {
            return amount;
        }

        public Date getDate() {
            return date;
        }
    }

    // hashmap for mapping month number to month.
    public static final Map<Integer, String> monthMap = new HashMap<>();
    static {
        monthMap.put(1, "January");
        monthMap.put(2, "February");
        monthMap.put(3, "March");
        monthMap.put(4, "April");
        monthMap.put(5, "May");
        monthMap.put(6, "June");
        monthMap.put(7, "July");
        monthMap.put(8, "August");
        monthMap.put(9, "September");
        monthMap.put(10, "October");
        monthMap.put(11, "November");
        monthMap.put(12, "December");
    }

    // method to create a map of monthly expenses
    public Map<String, Integer> getMonthlyExpenses(int userId) {
        List<Expense> expenses = expenseRepository.findByPaidBy(userId);
        Map<String, Integer> monthlyExpenses = new HashMap<>();
        DateFormatSymbols dfs = new DateFormatSymbols();
        String[] months = dfs.getMonths();

        for (Expense expense : expenses) {
            Date expenseDate = expense.getExpenseDate();
            if (expenseDate != null) {
                int month = expenseDate.toLocalDate().getMonthValue();
                int year = expenseDate.toLocalDate().getYear();
                String monthYear = months[month - 1] + " (" + year + ")";

                monthlyExpenses.put(monthYear, monthlyExpenses.getOrDefault(monthYear, 0) + (int) expense.getAmount());
            }
        }

        // Sort the map by month and year
        return monthlyExpenses.entrySet().stream()
                .sorted((e1, e2) -> {
                    String[] split1 = e1.getKey().split(" ");
                    String[] split2 = e2.getKey().split(" ");
                    int year1 = Integer.parseInt(split1[1].replace("(", "").replace(")", ""));
                    int year2 = Integer.parseInt(split2[1].replace("(", "").replace(")", ""));
                    int month1 = java.util.Arrays.asList(months).indexOf(split1[0]);
                    int month2 = java.util.Arrays.asList(months).indexOf(split2[0]);
                    if (year1 != year2) {
                        return Integer.compare(year1, year2);
                    } else {
                        return Integer.compare(month1, month2);
                    }
                })
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (e1, e2) -> e1,
                        LinkedHashMap::new));
    }

}
