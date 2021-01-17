package com.example.springdemo.dto;

import com.example.springdemo.entities.Service;

import java.util.ArrayList;
import java.util.List;

public class CompanyDTO {

    private Integer id;
    private String name;
    private String emailContact;
    private String password;
    private String areaOfWork;
    private String city;
    private String logo;
    private List<Integer> servicesId;

    public CompanyDTO(Integer id, String name, String emailContact, String password, String areaOfWork, String city, String logo, List<Integer> servicesId) {
        this.id = id;
        this.name = name;
        this.emailContact = emailContact;
        this.password = password;
        this.areaOfWork = areaOfWork;
        this.city = city;
        this.logo = logo;
        this.servicesId = servicesId;
    }

    public CompanyDTO(String name, String emailContact, String password, String areaOfWork, String city, String logo, List<Integer> servicesId) {
        this.name = name;
        this.emailContact = emailContact;
        this.password = password;
        this.areaOfWork = areaOfWork;
        this.city = city;
        this.logo = logo;
        this.servicesId = servicesId;
    }

    public CompanyDTO(String name, String emailContact, String password, String areaOfWork, String city, String logo) {
        this.name = name;
        this.emailContact = emailContact;
        this.password = password;
        this.areaOfWork = areaOfWork;
        this.city = city;
        this.logo = logo;
        this.servicesId = new ArrayList<>();
    }

    public CompanyDTO() {
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

    public List<Integer> getServicesId() {
        return servicesId;
    }

    public void setServicesId(List<Integer> servicesId) {
        this.servicesId = servicesId;
    }
}
