package com.exp.expensetracker.entities;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "et_group")
@SequenceGenerator(name = "GroupSequence", sequenceName = "et_group_seq", allocationSize = 1)
public class Groups {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "GroupSequence")
    private int id;

    @Column(name = "group_name")
    private String name;

    @Column(name = "group_admin")
    private Long groupAdmin_Id; // person who created the group

    @ManyToOne
    @JoinColumn(name = "group_admin", referencedColumnName = "id") // Assuming "id" is the column name in et_users table
    private User groupAdmin;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "et_group_users", joinColumns = @JoinColumn(name = "group_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> users;
}
