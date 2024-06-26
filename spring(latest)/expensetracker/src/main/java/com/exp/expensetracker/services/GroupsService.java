package com.exp.expensetracker.services;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exp.expensetracker.entities.Groups;
import com.exp.expensetracker.entities.User;
import com.exp.expensetracker.repositories.GroupsRepository;

@Service
public class GroupsService {

    @Autowired
    private GroupsRepository groupsRepository;

    // method to create a new group
    public Groups createGroup(Groups group) {
        return groupsRepository.save(group);
    }

    // Method to get all groups
    public List<Groups> getAllGroups() {
        return groupsRepository.findAll();
    }

    // Method to get a group by ID
    public Optional<Groups> getGroupById(int id) {
        return groupsRepository.findById(id);
    }

    // Method to update a group
    public Groups updateGroup(int id, Groups groupDetails) {
        Optional<Groups> optionalGroup = groupsRepository.findById(id);
        if (optionalGroup.isPresent()) {
            Groups group = optionalGroup.get();
            // Update group details
            group.setName(groupDetails.getName());
            // Add more fields to update as needed
            return groupsRepository.save(group);
        } else {
            return null; // or throw an exception as per your error handling strategy
        }
    }

    // Method to delete a group by ID
    // public void deleteGroup(int id) {
    // groupsRepository.deleteById(id);
    // }

    // method to get the members of a particular group(groupId)
    public Set<User> getGroupMembers(int groupId) {
        return groupsRepository.findById(groupId)
                .map(Groups::getUsers)
                .orElseThrow(() -> new RuntimeException("Group not found"));
    }

}
