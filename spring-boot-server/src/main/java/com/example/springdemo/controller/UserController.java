package com.example.springdemo.controller;

import com.example.springdemo.dto.UserDTO;
import com.example.springdemo.dto.builders.UserBuilder;
import com.example.springdemo.entities.User;
import com.example.springdemo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public Integer addUser(@RequestBody User userRecord) {
        return userService.addUser(userRecord);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
    }

    @GetMapping("/{email}")
    public UserDTO getUserByUsername(@PathVariable String email) {
        UserDTO userDto = UserBuilder.userInfoToUserDto(userService.getUserInfoByEmail(email));
        return userDto;
    }
}
