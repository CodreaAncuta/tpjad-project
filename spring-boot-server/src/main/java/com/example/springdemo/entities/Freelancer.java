package com.example.springdemo.entities;

import javax.persistence.*;
import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;


@Entity
@Table(name = "freelancer")
public class Freelancer {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(unique = true, nullable = false)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(unique = true , nullable = false)
    private String password;

    @Column(name = "area_of_expertise")
    private String areaOfExpertise;

    @Column(name = "years_of_experience")
    private String yearsOfExperience;

    private String address;
    private String description;
    private Float rating;

    @OneToMany(mappedBy = "freelancer", fetch = FetchType.LAZY)
    private List<Announcement> announcements;

    @OneToMany(mappedBy = "freelancer", fetch = FetchType.LAZY)
    private List<Service> services;

    public Freelancer() {
    }

    public Freelancer(Integer id, String name, String email, String password, String areaOfExpertise, String yearsOfExperience, String address, String description, Float rating, List<Announcement> announcements, List<Service> services) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.areaOfExpertise = areaOfExpertise;
        this.yearsOfExperience = yearsOfExperience;
        this.address = address;
        this.description = description;
        this.rating = rating;
        this.announcements = announcements;
        this.services = services;
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

    public List<Announcement> getAnnouncements() {
        return announcements;
    }

    public void setAnnouncements(List<Announcement> announcements) {
        this.announcements = announcements;
    }

    public List<Service> getOrders() {
        return services;
    }

    public void setOrders(List<Service> services) {
        this.services = services;
    }
}
