package com.exp.expensetracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exp.expensetracker.entities.Groups;

public interface GroupsRepository extends JpaRepository<Groups, Integer> {

}