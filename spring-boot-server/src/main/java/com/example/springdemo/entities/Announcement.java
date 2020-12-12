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
    private String standardPrice;

    @Column(name = "standard_duration")
    private String standardDuration;

    @Column(name = "premium_price")
    private String premiumPrice;

    @Column(name = "premium_duration")
    private String premiumDuration;

    @ManyToOne()
    @JoinColumn(name = "freelancer_id",  nullable = false)
    private Freelancer freelancer;

    @OneToOne(mappedBy = "announcement", cascade = CascadeType.ALL,
            fetch = FetchType.LAZY, optional = false)
    private Service service;

    public Announcement() {
    }

    public Announcement(Integer id, String title, String description, String category, String technology, String standardPrice, String standardDuration, String premiumPrice, String premiumDuration, Freelancer freelancer, Service service) {
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

    public String getStandardPrice() {
        return standardPrice;
    }

    public void setStandardPrice(String standardPrice) {
        this.standardPrice = standardPrice;
    }

    public String getStandardDuration() {
        return standardDuration;
    }

    public void setStandardDuration(String standardDuration) {
        this.standardDuration = standardDuration;
    }

    public String getPremiumPrice() {
        return premiumPrice;
    }

    public void setPremiumPrice(String premiumPrice) {
        this.premiumPrice = premiumPrice;
    }

    public String getPremiumDuration() {
        return premiumDuration;
    }

    public void setPremiumDuration(String premiumDuration) {
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

    public Service getOrder() {
        return service;
    }

    public void setOrder(Service service) {
        this.service = service;
    }
}
