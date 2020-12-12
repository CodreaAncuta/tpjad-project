package com.example.springdemo.entities;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "service")
public class Service {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(unique = true, nullable = false)
    private Integer id;

    @Column(name = "job_price")
    private String jobPrice;

    @Column(name = "job_duration")
    private String jobDuration;

    @ManyToOne()
    @JoinColumn(name = "freelancer_id",  nullable = false)
    private Freelancer freelancer;

    @ManyToOne()
    @JoinColumn(name = "company_id",  nullable = false)
    private Company company;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "announcement_id", nullable = false)
    private Announcement announcement;

    public Service() {
    }

    public Service(Integer id, String jobPrice, String jobDuration, Freelancer freelancer, Company company, Announcement announcement) {
        this.id = id;
        this.jobPrice = jobPrice;
        this.jobDuration = jobDuration;
        this.freelancer = freelancer;
        this.company = company;
        this.announcement = announcement;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getJobPrice() {
        return jobPrice;
    }

    public void setJobPrice(String jobPrice) {
        this.jobPrice = jobPrice;
    }

    public String getJobDuration() {
        return jobDuration;
    }

    public void setJobDuration(String jobDuration) {
        this.jobDuration = jobDuration;
    }

    public Freelancer getFreelancer() {
        return freelancer;
    }

    public void setFreelancer(Freelancer freelancer) {
        this.freelancer = freelancer;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Announcement getAnnouncement() {
        return announcement;
    }

    public void setAnnouncement(Announcement announcement) {
        this.announcement = announcement;
    }
}
