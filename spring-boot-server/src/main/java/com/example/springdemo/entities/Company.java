package com.example.springdemo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "company")
public class Company {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(unique = true, nullable = false)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(name = "email_contact", unique = true, nullable = false)
    private String emailContact;

    @Column(nullable = false)
    private String password;

    @Column(name = "area_of_work")
    private String areaOfWork;

    private String city;

    private String logo;

    @JsonIgnore
    @OneToMany(mappedBy = "company", fetch = FetchType.LAZY)
    private List<Service> services;

    public Company() {
    }

    public Company(Integer id, String name, String emailContact, String password, String areaOfWork, String city, String logo, List<Service> services) {
        this.id = id;
        this.name = name;
        this.emailContact = emailContact;
        this.password = password;
        this.areaOfWork = areaOfWork;
        this.city = city;
        this.logo = logo;
        this.services = services;
    }

    public Company(Integer id, String name, String emailContact, String password, String areaOfWork, String city, String logo) {
        this.id = id;
        this.name = name;
        this.emailContact = emailContact;
        this.password = password;
        this.areaOfWork = areaOfWork;
        this.city = city;
        this.logo = logo;
        this.services = new ArrayList<>();
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

    public String getEmailContact() {
        return emailContact;
    }

    public void setEmailContact(String emailContact) {
        this.emailContact = emailContact;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAreaOfWork() {
        return areaOfWork;
    }

    public void setAreaOfWork(String areaOfWork) {
        this.areaOfWork = areaOfWork;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public List<Service> getServices() {
        return services;
    }

    public void setServices(List<Service> services) {
        this.services = services;
    }
}
