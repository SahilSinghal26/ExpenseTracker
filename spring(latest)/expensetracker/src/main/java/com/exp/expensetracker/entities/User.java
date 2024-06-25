package com.exp.expensetracker.entities;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "et_users")
@SequenceGenerator(name="UserSequence", sequenceName="et_users_seq", allocationSize=1)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "UserSequence")
    private Long id;
    @Column(name = "user_name")
    private String username;
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;
    // @Column(name = "balance")
    // private int balance;

    @ManyToMany(mappedBy = "users")
    private Set<Groups> groups;
}
