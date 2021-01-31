package com.example.springdemo.dto;

import com.example.springdemo.entities.roles.Role;

public class UserDTO {

    private Integer id;
    private String email;
    private String password;
    private Role role;
    private Long createdTime;
    private Long updatedTime;

    public UserDTO() {
    }

    public UserDTO(Integer id, String email, String password, Role role, Long createdTime, Long updatedTime) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
        this.createdTime = createdTime;
        this.updatedTime = updatedTime;
    }

    public UserDTO(String email) {
        this.email = email;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Long getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Long createdTime) {
        this.createdTime = createdTime;
    }

    public Long getUpdatedTime() {
        return updatedTime;
    }

    public void setUpdatedTime(Long updatedTime) {
        this.updatedTime = updatedTime;
    }
}
