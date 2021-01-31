package com.example.springdemo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "company")
public class Company extends User {

    @Column(nullable = false)
    private String name;

    @Column(name = "area_of_work")
    private String areaOfWork;

    private String city;

    private String logo;

    @JsonIgnore
    @OneToMany(mappedBy = "company", fetch = FetchType.LAZY)
    private List<Service> services;

    public Company() {
    }

    public Company(Integer id, String name, String email, String password, String areaOfWork, String city, String logo, List<Service> services) {
        this.setId(id);
        this.setEmail(email);
        this.setPassword(new BCryptPasswordEncoder().encode(password));
        this.name = name;
        this.areaOfWork = areaOfWork;
        this.city = city;
        this.logo = logo;
        this.services = services;
    }

    public Company(Integer id, String name, String email, String password, String areaOfWork, String city, String logo) {
        this.setId(id);
        this.setEmail(email);
        this.setPassword(new BCryptPasswordEncoder().encode(password));
        this.name = name;
        this.areaOfWork = areaOfWork;
        this.city = city;
        this.logo = logo;
        this.services = new ArrayList<>();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
