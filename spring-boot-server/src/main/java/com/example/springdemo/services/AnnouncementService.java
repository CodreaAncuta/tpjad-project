package com.example.springdemo.services;

import com.example.springdemo.dto.AnnouncementDTO;
import com.example.springdemo.dto.builders.AnnouncementBuilder;
import com.example.springdemo.entities.Announcement;
import com.example.springdemo.errorhandler.ResourceNotFoundException;
import com.example.springdemo.repositories.AnnouncementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AnnouncementService {

    private final AnnouncementRepository announcementRepository;

    @Autowired
    public AnnouncementService(AnnouncementRepository ar){
        this.announcementRepository = ar;
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
                .map(AnnouncementBuilder::generateDTOFromEntity)
                .collect(Collectors.toSet());
    }

    public Integer insert(AnnouncementDTO aDTO) {

        return announcementRepository
                .save(AnnouncementBuilder.generateEntityFromDTO(aDTO))
                .getId();
    }

    public Announcement update(AnnouncementDTO aDTO) {

        Optional<Announcement> announcementOptional = announcementRepository.findById(aDTO.getId());
        if(!announcementOptional.isPresent()){
            return null;
        }
        return announcementRepository.save(AnnouncementBuilder.generateEntityFromDTO(aDTO));
    }

    public void delete(AnnouncementDTO aDTO){
        this.announcementRepository.deleteById(aDTO.getId());
    }

}
