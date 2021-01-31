package com.example.springdemo.dto.builders;

import com.example.springdemo.dto.AnnouncementDTO;
import com.example.springdemo.entities.Announcement;
import com.example.springdemo.entities.Freelancer;
import com.example.springdemo.entities.Service;
import com.example.springdemo.repositories.FreelancerRepository;
import com.example.springdemo.repositories.ServiceRepository;

public class AnnouncementBuilder {

    private final FreelancerRepository freelancerRepository;
    private final ServiceRepository serviceRepository;

    public AnnouncementBuilder(FreelancerRepository fr, ServiceRepository sr) {
        freelancerRepository = fr;
        serviceRepository = sr;
    }

    public AnnouncementDTO generateDTOFromEntity(Announcement a) {
        if (a.getService() != null) {
            return new AnnouncementDTO(a.getId(), a.getTitle(), a.getDescription(), a.getCategory(), a.getTechnology(),
                    a.getPrice(), a.getDuration(),
                    a.getFreelancer().getId(), a.getService().getId());
        } else {
            return new AnnouncementDTO(a.getId(), a.getTitle(), a.getDescription(), a.getCategory(), a.getTechnology(),
                    a.getPrice(), a.getDuration(), a.getFreelancer().getId());
        }

    }

    public Announcement generateEntityFromDTO(AnnouncementDTO ad) {
        Freelancer f = freelancerRepository.getById(ad.getFreelancerId());
        Service s = serviceRepository.getById(ad.getServiceId());
        return new Announcement(ad.getId(), ad.getTitle(), ad.getDescription(), ad.getCategory(), ad.getTechnology(),
                ad.getPrice(), ad.getDuration(), f, s);
    }
}
