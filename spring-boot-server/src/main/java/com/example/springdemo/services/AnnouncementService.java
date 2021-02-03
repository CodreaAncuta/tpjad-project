package com.example.springdemo.services;

import com.example.springdemo.dto.AnnouncementDTO;
import com.example.springdemo.dto.builders.AnnouncementBuilder;
import com.example.springdemo.entities.Announcement;
import com.example.springdemo.errorhandler.ResourceNotFoundException;
import com.example.springdemo.repositories.AnnouncementRepository;
import com.example.springdemo.repositories.FreelancerRepository;
import com.example.springdemo.repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AnnouncementService {

    private final AnnouncementRepository announcementRepository;
    private final ServiceRepository serviceRepository;
    private final FreelancerRepository freelancerRepository;

    private AnnouncementBuilder builder;

    @Autowired
    public AnnouncementService(AnnouncementRepository ar, ServiceRepository sr, FreelancerRepository fr) {
        this.announcementRepository = ar;
        this.serviceRepository = sr;
        this.freelancerRepository = fr;
        this.builder = new AnnouncementBuilder(freelancerRepository, serviceRepository);
    }

    public Announcement findAnnouncementById(Integer id) {
        Optional<Announcement> announcementOptional = announcementRepository.findById(id);
        if (!announcementOptional.isPresent()) {
            throw new ResourceNotFoundException("Announcement", "user id", id);
        }
        return announcementOptional.get();
    }

    public List<AnnouncementDTO> findAll() {
        List<Announcement> announcements = announcementRepository.findAll();
        return announcements.stream()
                .map(builder::generateDTOFromEntity)
                .collect(Collectors.toList());
    }

    public List<AnnouncementDTO> findByCategory(String category) {
        List<Announcement> announcements = announcementRepository.findByCategoryContains(category);
        return announcements.stream()
                .map(builder::generateDTOFromEntity)
                .collect(Collectors.toList());
    }

    public List<AnnouncementDTO> findByTechnology(String technology) {
        List<Announcement> announcements = announcementRepository.findByTechnologyContains(technology);
        return announcements.stream()
                .map(builder::generateDTOFromEntity)
                .collect(Collectors.toList());
    }

    public List<AnnouncementDTO> findByTechnologyAndCategory(String technology, String category) {
        List<Announcement> announcements = announcementRepository.findByTechnologyAndCategory(technology, category);
        return announcements.stream()
                .map(builder::generateDTOFromEntity)
                .collect(Collectors.toList());
    }

    public Set<AnnouncementDTO> findByPrice(Integer price, String operator) {
        Set<Announcement> announcements = new HashSet<>();
        switch (operator) {
            case "le":
                announcements = announcementRepository.findByPriceLessThanEqual(price);
                break;
            case "ge":
                announcements = announcementRepository.findByPriceGreaterThanEqual(price);
                break;
            default:
                announcements = announcementRepository.findByPrice(price);
        }

        return announcements.stream()
                .map(builder::generateDTOFromEntity)
                .collect(Collectors.toSet());
    }

    public Set<AnnouncementDTO> findByDuration(Integer duration) {
        Set<Announcement> announcements = announcementRepository.findByDuration(duration);
        return announcements.stream()
                .map(builder::generateDTOFromEntity)
                .collect(Collectors.toSet());
    }

    public Integer insert(AnnouncementDTO aDTO) {
        return announcementRepository
                .save(builder.generateEntityFromDTO(aDTO))
                .getId();
    }

    public Announcement update(Integer id, AnnouncementDTO aDTO) {
        Optional<Announcement> announcementOptional = announcementRepository.findById(id);
        if (!announcementOptional.isPresent()) {
            return null;
        }
        return announcementRepository.save(builder.generateEntityFromDTO(aDTO));
    }

    public void delete(Integer id) {
        this.announcementRepository.deleteById(id);
    }

    public Set<AnnouncementDTO> getAnnouncementsByFreelancer(Integer id){
        Set<Announcement> annSet = announcementRepository.getAllAnnouncementsPerFreelancer(id);
        return annSet.stream()
                .map(builder::generateDTOFromEntity).collect(Collectors.toSet());

    }

    public AnnouncementDTO getAnnouncementByFreelancerAndTitle(Integer id,String title){
        Announcement announcement = announcementRepository.findByFreelancerIdAndTitle(id, title);
        return builder.generateDTOFromEntity(announcement);

    }
}
