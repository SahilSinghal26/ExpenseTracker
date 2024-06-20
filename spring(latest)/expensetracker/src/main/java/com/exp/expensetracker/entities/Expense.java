package com.exp.expensetracker.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "expenses")
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "expense_name")
    private String expenseName;
    @Column(name = "amount")
    private double amount;
    @Column(name = "paid_by")
    private int paidBy;
    @Column(name = "payment_mode")
    private String paymentMode;
    @Column(name = "group_id")
    private Integer groupId;
    @Column(name = "comments")
    private String comments;
}
