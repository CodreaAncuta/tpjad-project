package com.example.springdemo.entities;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "announcement")
public class Announcement {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(unique = true, nullable = false)
    private Integer id;

    private String title;
    private String description;
    private String category;
    private String technology;

    private Integer price;
    private Integer duration;

    @ManyToOne()
    @JoinColumn(name = "freelancer_id", nullable = false)
    private Freelancer freelancer;

    @OneToOne(mappedBy = "announcement", cascade = CascadeType.ALL,
            fetch = FetchType.LAZY, optional = true)
    private Service service;

    public Announcement() {
    }

    public Announcement(Integer id, String title, String description, String category, String technology, Integer price, Integer duration, Freelancer freelancer, Service service) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.technology = technology;
        this.price = price;
        this.duration = duration;
        this.freelancer = freelancer;
        this.service = service;
    }

    public Announcement(Integer id, String title, String description, String category, String technology, Integer price, Integer duration, Freelancer freelancer) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.technology = technology;
        this.price = price;
        this.duration = duration;
        this.freelancer = freelancer;
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

    public Freelancer getFreelancer() {
        return freelancer;
    }

    public void setFreelancer(Freelancer freelancer) {
        this.freelancer = freelancer;
    }

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }
}
