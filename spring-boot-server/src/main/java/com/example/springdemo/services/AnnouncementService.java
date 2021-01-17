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
    public AnnouncementService(AnnouncementRepository ar,ServiceRepository sr, FreelancerRepository fr){
        this.announcementRepository = ar;
        this.serviceRepository = sr;
        this.freelancerRepository = fr;
        this.builder = new AnnouncementBuilder(freelancerRepository, serviceRepository);
    }

    public Announcement findAnnouncementById(Integer id){
        Optional<Announcement> announcementOptional = announcementRepository.findById(id);
        if (!announcementOptional.isPresent()) {
            throw new ResourceNotFoundException("Announcement", "user id", id);
        }
        return announcementOptional.get();
    }

    public Set<AnnouncementDTO> findAll(){
        Set<Announcement> announcements = announcementRepository.getAllOrdered();
        return announcements.stream()
                .map(builder::generateDTOFromEntity)
                .collect(Collectors.toSet());
    }

    public Integer insert(AnnouncementDTO aDTO) {
        return announcementRepository
                .save(builder.generateEntityFromDTO(aDTO))
                .getId();
    }

    public Announcement update(AnnouncementDTO aDTO) {
        Optional<Announcement> announcementOptional = announcementRepository.findById(aDTO.getId());
        if(!announcementOptional.isPresent()){
            return null;
        }
        return announcementRepository.save(builder.generateEntityFromDTO(aDTO));
    }

    public void delete(AnnouncementDTO aDTO){
        this.announcementRepository.deleteById(aDTO.getId());
    }

}
