package com.example.springdemo.dto;

import com.example.springdemo.entities.Announcement;
import com.example.springdemo.entities.Company;
import com.example.springdemo.entities.Freelancer;

public class ServiceDTO {

    private Integer id;
    private String jobPrice;
    private String jobDuration;
    private Integer freelancerId;
    private Integer companyId;
    private Integer announcementId;

    public ServiceDTO(Integer id, String jobPrice, String jobDuration, Integer freelancerId, Integer companyId, Integer announcementId) {
        this.id = id;
        this.jobPrice = jobPrice;
        this.jobDuration = jobDuration;
        this.freelancerId = freelancerId;
        this.companyId = companyId;
        this.announcementId = announcementId;
    }

    public ServiceDTO(String jobPrice, String jobDuration, Integer freelancerId, Integer companyId, Integer announcementId) {
        this.jobPrice = jobPrice;
        this.jobDuration = jobDuration;
        this.freelancerId = freelancerId;
        this.companyId = companyId;
        this.announcementId = announcementId;
    }

    public Integer getId() {
        return id;
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

    public Integer getFreelancerId() {
        return freelancerId;
    }

    public void setFreelancerId(Integer freelancerId) {
        this.freelancerId = freelancerId;
    }

    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public Integer getAnnouncementId() {
        return announcementId;
    }

    public void setAnnouncementId(Integer announcementId) {
        this.announcementId = announcementId;
    }
}
