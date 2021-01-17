package com.example.springdemo.dto.builders;

import com.example.springdemo.dto.FreelancerDTO;
import com.example.springdemo.entities.Announcement;
import com.example.springdemo.entities.Freelancer;
import com.example.springdemo.entities.Service;
import com.example.springdemo.repositories.AnnouncementRepository;
import com.example.springdemo.repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class FreelancerBuilder {

    private AnnouncementRepository announcementRepository;
    private ServiceRepository serviceRepository;

    public FreelancerBuilder(AnnouncementRepository ar, ServiceRepository sr){
        announcementRepository = ar;
        serviceRepository = sr;
    }

    public FreelancerDTO generateDTOFromEntity(Freelancer f) {
        List<Integer> announcementsIds = new ArrayList<>();
        List<Integer> servicesIds = new ArrayList<>();

        for(Announcement a: f.getAnnouncements()){
            announcementsIds.add(a.getId());
        }

        for(Service s: f.getServices()){
            servicesIds.add(s.getId());
        }

        return new FreelancerDTO(f.getId(),f.getName(),f.getEmail(),f.getPassword(),f.getAreaOfExpertise(),f.getYearsOfExperience(),
                f.getAddress(),f.getDescription(),f.getRating(),announcementsIds, servicesIds);
    }

    public Freelancer generateEntityFromDTO(FreelancerDTO f) {
        List<Announcement> announcements = new ArrayList<>();
        List<Service> services= new ArrayList<>();

        for(Integer a: f.getAnnouncementsId()){
            Optional<Announcement> announcementOptional = announcementRepository.findById(a);
            announcementOptional.ifPresent(announcements::add);
        }

        for(Integer s: f.getServicesId()){
            Optional<Service> serviceOptional = serviceRepository.findById(s);
            serviceOptional.ifPresent(services::add);
        }

        return new Freelancer(f.getId(),f.getName(),f.getEmail(),f.getPassword(),f.getAreaOfExpertise(),f.getYearsOfExperience(),
                f.getAddress(),f.getDescription(),f.getRating(),announcements,services);
    }

    public Freelancer generateEntityInsertFromDTO(FreelancerDTO f) {
        return new Freelancer(f.getId(),f.getName(),f.getEmail(),f.getPassword(),f.getAreaOfExpertise(),f.getYearsOfExperience(),
                f.getAddress(),f.getDescription(),f.getRating());
    }
}
