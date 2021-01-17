package com.example.springdemo.dto;

import com.example.springdemo.entities.Freelancer;
import com.example.springdemo.entities.Service;

public class AnnouncementDTO {

    private Integer id;

    private String title;
    private String description;
    private String category;
    private String technology;
    private Integer standardPrice;
    private Integer standardDuration;
    private Integer premiumPrice;
    private Integer premiumDuration;
    private Integer freelancerId;
    private Integer serviceId;

    public AnnouncementDTO(Integer id, String title, String description, String category, String technology, Integer standardPrice, Integer standardDuration, Integer premiumPrice, Integer premiumDuration, Integer freelancerId, Integer serviceId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.technology = technology;
        this.standardPrice = standardPrice;
        this.standardDuration = standardDuration;
        this.premiumPrice = premiumPrice;
        this.premiumDuration = premiumDuration;
        this.freelancerId = freelancerId;
        this.serviceId = serviceId;
    }

    public AnnouncementDTO(String title, String description, String category, String technology, Integer standardPrice, Integer standardDuration, Integer premiumPrice, Integer premiumDuration, Integer freelancerId, Integer serviceId) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.technology = technology;
        this.standardPrice = standardPrice;
        this.standardDuration = standardDuration;
        this.premiumPrice = premiumPrice;
        this.premiumDuration = premiumDuration;
        this.freelancerId = freelancerId;
        this.serviceId = serviceId;
    }

    public AnnouncementDTO() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getTechnology() {
        return technology;
    }

    public void setTechnology(String technology) {
        this.technology = technology;
    }

    public Integer getStandardPrice() {
        return standardPrice;
    }

    public void setStandardPrice(Integer standardPrice) {
        this.standardPrice = standardPrice;
    }

    public Integer getStandardDuration() {
        return standardDuration;
    }

    public void setStandardDuration(Integer standardDuration) {
        this.standardDuration = standardDuration;
    }

    public Integer getPremiumPrice() {
        return premiumPrice;
    }

    public void setPremiumPrice(Integer premiumPrice) {
        this.premiumPrice = premiumPrice;
    }

    public Integer getPremiumDuration() {
        return premiumDuration;
    }

    public void setPremiumDuration(Integer premiumDuration) {
        this.premiumDuration = premiumDuration;
    }

    public Integer getFreelancerId() {
        return freelancerId;
    }

    public void setFreelancerId(Integer freelancerId) {
        this.freelancerId = freelancerId;
    }

    public Integer getServiceId() {
        return serviceId;
    }

    public void setServiceId(Integer serviceId) {
        this.serviceId = serviceId;
    }
}
