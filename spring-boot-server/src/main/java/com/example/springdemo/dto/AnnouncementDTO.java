package com.example.springdemo.dto;

public class AnnouncementDTO {

    private Integer id;

    private String title;
    private String description;
    private String category;
    private String technology;
    private Integer price;
    private Integer duration;
    private Integer freelancerId;
    private Integer serviceId;

    public AnnouncementDTO(Integer id, String title, String description, String category, String technology, Integer price, Integer duration, Integer freelancerId, Integer serviceId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.technology = technology;
        this.price = price;
        this.duration = duration;
        this.freelancerId = freelancerId;
        this.serviceId = serviceId;
    }

    public AnnouncementDTO(String title, String description, String category, String technology, Integer price, Integer duration, Integer freelancerId, Integer serviceId) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.technology = technology;
        this.price = price;
        this.duration = duration;
        this.freelancerId = freelancerId;
        this.serviceId = serviceId;
    }

    public AnnouncementDTO(String title, String description, String category, String technology, Integer price, Integer duration, Integer freelancerId) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.technology = technology;
        this.price = price;
        this.duration = duration;
        this.freelancerId = freelancerId;
    }

    public AnnouncementDTO(Integer id, String title, String description, String category, String technology, Integer price, Integer duration, Integer freelancerId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.technology = technology;
        this.price = price;
        this.duration = duration;
        this.freelancerId = freelancerId;
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

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
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
