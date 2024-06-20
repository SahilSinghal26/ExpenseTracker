package com.exp.expensetracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exp.expensetracker.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
