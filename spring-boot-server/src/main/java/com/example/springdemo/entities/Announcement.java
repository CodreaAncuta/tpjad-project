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

    @Column(name = "standard_price")
    private Integer standardPrice;

    @Column(name = "standard_duration")
    private Integer standardDuration;

    @Column(name = "premium_price")
    private Integer premiumPrice;

    @Column(name = "premium_duration")
    private Integer premiumDuration;

    @ManyToOne()
    @JoinColumn(name = "freelancer_id",  nullable = false)
    private Freelancer freelancer;

    @OneToOne(mappedBy = "announcement", cascade = CascadeType.ALL,
            fetch = FetchType.LAZY, optional = true)
    private Service service;

    public Announcement() {
    }

    public Announcement(Integer id, String title, String description, String category, String technology, Integer standardPrice, Integer standardDuration, Integer premiumPrice, Integer premiumDuration, Freelancer freelancer, Service service) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.technology = technology;
        this.standardPrice = standardPrice;
        this.standardDuration = standardDuration;
        this.premiumPrice = premiumPrice;
        this.premiumDuration = premiumDuration;
        this.freelancer = freelancer;
        this.service = service;
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
