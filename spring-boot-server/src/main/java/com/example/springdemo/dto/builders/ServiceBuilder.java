package com.example.springdemo.dto.builders;

import com.example.springdemo.dto.ServiceDTO;
import com.example.springdemo.entities.Announcement;
import com.example.springdemo.entities.Company;
import com.example.springdemo.entities.Freelancer;
import com.example.springdemo.entities.Service;
import com.example.springdemo.repositories.AnnouncementRepository;
import com.example.springdemo.repositories.CompanyRepository;
import com.example.springdemo.repositories.FreelancerRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public class ServiceBuilder {

    private CompanyRepository companyRepository;
    private FreelancerRepository freelancerRepository;
    private AnnouncementRepository announcementRepository;

    public ServiceBuilder(CompanyRepository cr, FreelancerRepository fr, AnnouncementRepository ar){
        companyRepository = cr;
        freelancerRepository = fr;
        announcementRepository = ar;
    }

    public ServiceDTO generateDTOFromEntity(Service c){
        return new ServiceDTO(c.getId(), c.getJobPrice(), c.getJobDuration(), c.getFreelancer().getId(), c.getCompany().getId(), c.getAnnouncement().getId());
    }

    public Service generateEntityFromDTO(ServiceDTO s){
        Optional<Company> companyOptional= companyRepository.findById(s.getCompanyId());
        Optional<Freelancer> freelancerOptional = freelancerRepository.findById(s.getFreelancerId());
        Optional<Announcement> announcementOptional = announcementRepository.findById(s.getAnnouncementId());

        Company c = companyOptional.get();
        Announcement a = announcementOptional.get();
        Freelancer f = freelancerOptional.get();

        return new Service(s.getId(),s.getJobPrice(),s.getJobDuration(),f,c,a);
    }

}
