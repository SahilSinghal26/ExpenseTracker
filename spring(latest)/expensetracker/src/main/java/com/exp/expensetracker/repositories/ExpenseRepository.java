package com.exp.expensetracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exp.expensetracker.entities.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
    List<Expense> findByPaidBy(int userId);
}
