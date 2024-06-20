package com.exp.expensetracker.controllers;

import java.util.Base64;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exp.expensetracker.entities.User;
import com.exp.expensetracker.services.UserService;

import lombok.Getter;
import lombok.Setter;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/create-user")
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<HashMap<String, Object>> verifyUser(@RequestBody UserLoginRequest loginRequest) {
        System.out.println("Login");
        boolean isValid = userService.checkUserCredentials(loginRequest.getUsername(), loginRequest.getPassword());
        HashMap<String, Object> result = new HashMap<>();

        if (isValid) {
            // Fetch user details
            User user = userService.getUserByUsername(loginRequest.getUsername());

            String tokenString = loginRequest.getUsername() + ";" + loginRequest.getPassword();
            String token = Base64.getEncoder().encodeToString(tokenString.getBytes());
            result.put("token", token);

            // Add user details to response
            result.put("user", user);

            return ResponseEntity.ok(result);
        } else {
            result.put("error", "Invalid credentials");
            return ResponseEntity.status(401).body(result);
        }
    }

    // getting user by id
    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // @GetMapping("/current-user")
    // public ResponseEntity<User> getCurrentUser(@RequestHeader("Authorization")
    // String authHeader) {
    // if (authHeader == null || !authHeader.startsWith("Bearer ")) {
    // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    // }

    // String token = authHeader.substring(7);
    // String decodedString = new String(Base64.getDecoder().decode(token));
    // String[] parts = decodedString.split(";");
    // String username = parts[0];

    // User user = userService.getUserByUsername(username);
    // if (user != null) {
    // return ResponseEntity.ok(user);
    // } else {
    // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    // }
    // }

}

@Getter
@Setter
class UserLoginRequest {
    private String username;
    private String password;
}
