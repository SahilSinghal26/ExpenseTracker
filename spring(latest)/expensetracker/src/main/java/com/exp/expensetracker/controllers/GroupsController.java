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

    @GetMapping
    public ResponseEntity<List<Groups>> getAllGroups() {
        // public ResponseEntity<List<Person>> getAllGroups() {
        List<Groups> groupList = groupsService.getAllGroups();
        System.out.println(groupsService.getAllGroups());
        // Map<String, String> hashMap = new HashMap<>();
        // Person p1 = new Person(1, "sahil");
        // Person p2 = new Person(2, "anuj");
        // hashMap.put("Application", "application");
        // hashMap.put("status", "Ok");
        // List<Person> resList = new ArrayList<>();
        // resList.add(p1);
        // resList.add(p2);
        // Retrieve all groups from the service
        // return ResponseEntity.ok(resList); // Return the list of groups with HTTP
        // status 200 (OK)
        return ResponseEntity.ok(groupList); // Return the list of groups with HTTP status 200 (OK)
    }

    // Endpoint to get a group by ID
    @GetMapping("/{id}")
    public ResponseEntity<Groups> getGroupById(@PathVariable int id) {
        Optional<Groups> group = groupsService.getGroupById(id);
        return group.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Groups> createGroup(@RequestBody Groups group) {
        System.out.println("Groupv " + group);
        Groups newGroup = groupsService.createGroup(group);
        return new ResponseEntity<>(newGroup, HttpStatus.CREATED);
    }

    @GetMapping("/{id}/members")
    public ResponseEntity<Set<User>> getGroupMembers(@PathVariable int id) {
        Set<User> members = groupsService.getGroupMembers(id);
        return ResponseEntity.ok(members);
    }
}
