package com.example.springdemo.dto.builders;

import com.example.springdemo.dto.AnnouncementDTO;
import com.example.springdemo.entities.Announcement;
import com.example.springdemo.entities.Freelancer;
import com.example.springdemo.entities.Service;
import com.example.springdemo.repositories.FreelancerRepository;
import com.example.springdemo.repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class AnnouncementBuilder {

    private final FreelancerRepository freelancerRepository;
    private final ServiceRepository serviceRepository;

    public AnnouncementBuilder(FreelancerRepository fr, ServiceRepository sr){
        freelancerRepository = fr;
        serviceRepository = sr;
    }

    public AnnouncementDTO generateDTOFromEntity(Announcement a){
        return new AnnouncementDTO(a.getId(), a.getTitle(), a.getDescription(), a.getCategory(), a.getTechnology(),
                a.getStandardPrice(), a.getStandardDuration(), a.getPremiumPrice(), a.getPremiumDuration(),
                a.getFreelancer().getId(), a.getService().getId());
    }

    public Announcement generateEntityFromDTO(AnnouncementDTO ad){
        Freelancer f = freelancerRepository.getById(ad.getFreelancerId());
        Service s = serviceRepository.getById(ad.getServiceId());
        return new Announcement(ad.getId(), ad.getTitle(),ad.getDescription(),ad.getCategory(),ad.getTechnology(),
                ad.getStandardPrice(), ad.getStandardDuration(), ad.getPremiumPrice(),ad.getPremiumDuration(),
                f,s);
    }
}
