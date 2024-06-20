package com.exp.expensetracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exp.expensetracker.entities.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Integer> {

}
