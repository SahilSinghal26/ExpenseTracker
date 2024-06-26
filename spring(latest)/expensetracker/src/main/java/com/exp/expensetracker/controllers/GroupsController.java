package com.exp.expensetracker.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.exp.expensetracker.entities.Groups;
import com.exp.expensetracker.entities.User;
import com.exp.expensetracker.services.GroupsService;

@RestController
@RequestMapping("/groups")
public class GroupsController {

    @Autowired
    private GroupsService groupsService;

    // getting all the groups
    @GetMapping
    public ResponseEntity<List<Groups>> getAllGroups() {
        List<Groups> groupList = groupsService.getAllGroups();
        System.out.println(groupsService.getAllGroups());
        return ResponseEntity.ok(groupList); // Return the list of groups with HTTP status 200 (OK)
    }

    // Endpoint to get a group by ID
    @GetMapping("/{id}")
    public ResponseEntity<Groups> getGroupById(@PathVariable int id) {
        Optional<Groups> group = groupsService.getGroupById(id);
        return group.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // creating a group
    @PostMapping
    public ResponseEntity<Groups> createGroup(@RequestBody Groups group) {
        Groups newGroup = groupsService.createGroup(group);
        return new ResponseEntity<>(newGroup, HttpStatus.CREATED);
    }

    // updating a group
    @PutMapping("/{id}")
    public ResponseEntity<Groups> updateGroup(@PathVariable int id, @RequestBody Groups groupDetails) {
        Groups updatedGroup = groupsService.updateGroup(id, groupDetails);
        if (updatedGroup != null) {
            return ResponseEntity.ok(updatedGroup);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // deleting a group
    // @DeleteMapping("/{id}")
    // public ResponseEntity<Void> deleteGroup(@PathVariable int id) {
    // groupsService.deleteGroup(id);
    // return ResponseEntity.noContent().build();
    // }

    // this is the endpoint which gives the members of the group of a particular
    // groupId.
    @GetMapping("/{id}/members")
    public ResponseEntity<Set<User>> getGroupMembers(@PathVariable int id) {
        Set<User> members = groupsService.getGroupMembers(id);
        return ResponseEntity.ok(members);
    }
}
