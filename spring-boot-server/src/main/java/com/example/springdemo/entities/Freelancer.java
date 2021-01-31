package com.example.springdemo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "freelancer")
public class Freelancer extends User {

    @Column(nullable = false)
    private String name;

    @Column(name = "area_of_expertise")
    private String areaOfExpertise;

    @Column(name = "years_of_experience")
    private String yearsOfExperience;

    private String address;
    private String description;
    private Float rating;

    @JsonIgnore
    @OneToMany(mappedBy = "freelancer", fetch = FetchType.LAZY)
    private List<Announcement> announcements;

    @JsonIgnore
    @OneToMany(mappedBy = "freelancer", fetch = FetchType.LAZY)
    private List<Service> services;

    public Freelancer() {
    }

    public Freelancer(Integer id, String name, String email, String password, String areaOfExpertise, String yearsOfExperience, String address, String description, Float rating, List<Announcement> announcements, List<Service> services) {
        this.setId(id);
        this.setEmail(email);
        this.setPassword(new BCryptPasswordEncoder().encode(password));
        this.name = name;
        this.areaOfExpertise = areaOfExpertise;
        this.yearsOfExperience = yearsOfExperience;
        this.address = address;
        this.description = description;
        this.rating = rating;
        this.announcements = announcements;
        this.services = services;
    }

    public Freelancer(Integer id, String name, String email, String password, String areaOfExpertise, String yearsOfExperience, String address, String description, Float rating) {
        this.setId(id);
        this.setEmail(email);
        this.setPassword(new BCryptPasswordEncoder().encode(password));
        this.name = name;
        this.areaOfExpertise = areaOfExpertise;
        this.yearsOfExperience = yearsOfExperience;
        this.address = address;
        this.description = description;
        this.rating = rating;
        this.announcements = new ArrayList<>();
        this.services = new ArrayList<>();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public List<Announcement> getAnnouncements() {
        return announcements;
    }

    public void setAnnouncements(List<Announcement> announcements) {
        this.announcements = announcements;
    }

    public List<Service> getServices() {
        return services;
    }

    public void setServices(List<Service> services) {
        this.services = services;
    }
}
