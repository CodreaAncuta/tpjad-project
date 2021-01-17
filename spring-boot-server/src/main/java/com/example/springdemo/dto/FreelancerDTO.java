package com.example.springdemo.dto;

import com.example.springdemo.entities.Announcement;
import com.example.springdemo.entities.Service;

import java.util.ArrayList;
import java.util.List;

public class FreelancerDTO {

    private Integer id;
    private String name;
    private String email;
    private String password;
    private String areaOfExpertise;
    private String yearsOfExperience;
    private String address;
    private String description;
    private Float rating;
    private List<Integer> announcementsId;
    private List<Integer> servicesId;

    public FreelancerDTO(Integer id, String name, String email, String password, String areaOfExpertise, String yearsOfExperience, String address, String description, Float rating, List<Integer> announcementsId, List<Integer> servicesId) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.areaOfExpertise = areaOfExpertise;
        this.yearsOfExperience = yearsOfExperience;
        this.address = address;
        this.description = description;
        this.rating = rating;
        this.announcementsId = announcementsId;
        this.servicesId = servicesId;
    }

    public FreelancerDTO(String name, String email, String password, String areaOfExpertise, String yearsOfExperience, String address, String description, Float rating, List<Integer> announcementsId, List<Integer> servicesId) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.areaOfExpertise = areaOfExpertise;
        this.yearsOfExperience = yearsOfExperience;
        this.address = address;
        this.description = description;
        this.rating = rating;
        this.announcementsId = announcementsId;
        this.servicesId = servicesId;
    }

    public FreelancerDTO(String name, String email, String password, String areaOfExpertise, String yearsOfExperience, String address, String description, Float rating) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.areaOfExpertise = areaOfExpertise;
        this.yearsOfExperience = yearsOfExperience;
        this.address = address;
        this.description = description;
        this.rating = rating;
        this.announcementsId = new ArrayList<>();
        this.servicesId = new ArrayList<>();
    }

    public FreelancerDTO() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getAreaOfExpertise() {
        return areaOfExpertise;
    }

    public void setAreaOfExpertise(String areaOfExpertise) {
        this.areaOfExpertise = areaOfExpertise;
    }

    public String getYearsOfExperience() {
        return yearsOfExperience;
    }

    public void setYearsOfExperience(String yearsOfExperience) {
        this.yearsOfExperience = yearsOfExperience;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Float getRating() {
        return rating;
    }

    public void setRating(Float rating) {
        this.rating = rating;
    }

    public List<Integer> getAnnouncementsId() {
        return announcementsId;
    }

    public void setAnnouncementsId(List<Integer> announcementsId) {
        this.announcementsId = announcementsId;
    }

    public List<Integer> getServicesId() {
        return servicesId;
    }

    public void setServicesId(List<Integer> servicesId) {
        this.servicesId = servicesId;
    }
}
