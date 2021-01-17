package com.example.springdemo.services;

import com.example.springdemo.dto.AnnouncementDTO;
import com.example.springdemo.dto.FreelancerDTO;
import com.example.springdemo.dto.builders.AnnouncementBuilder;
import com.example.springdemo.dto.builders.FreelancerBuilder;
import com.example.springdemo.entities.Announcement;
import com.example.springdemo.entities.Freelancer;
import com.example.springdemo.errorhandler.ResourceNotFoundException;
import com.example.springdemo.repositories.AnnouncementRepository;
import com.example.springdemo.repositories.FreelancerRepository;
import com.example.springdemo.repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class FreelancerService {

    private final FreelancerRepository freelancerRepository;

    @Autowired
    public FreelancerService(FreelancerRepository fr){
        freelancerRepository = fr;
    }

    public Freelancer findFreelancerById(Integer id){
        Optional<Freelancer> freelancerOptional = freelancerRepository.findById(id);
        if (!freelancerOptional.isPresent()) {
            throw new ResourceNotFoundException("Freelancer", "user id", id);
        }
        return freelancerOptional.get();
    }

    public Set<FreelancerDTO> findAll(){
        Set<Freelancer> freelancers = freelancerRepository.getAllOrdered();

        return freelancers.stream()
                .map(FreelancerBuilder::generateDTOFromEntity)
                .collect(Collectors.toSet());
    }

    public Integer insert(FreelancerDTO fDTO) {

        return freelancerRepository
                .save(FreelancerBuilder.generateEntityInsertFromDTO(fDTO))
                .getId();
    }

    public Freelancer update(FreelancerDTO fDTO) {

        Optional<Freelancer> freelancerOptional = freelancerRepository.findById(fDTO.getId());
        if(!freelancerOptional.isPresent()){
            return null;
        }
        return freelancerRepository.save(FreelancerBuilder.generateEntityFromDTO(fDTO));
    }

    public void delete(FreelancerDTO fDTO){
        this.freelancerRepository.deleteById(fDTO.getId());
    }

    public Freelancer addAnnouncement(Announcement announcement, Integer id){
        Optional<Freelancer> freelancerOptional = freelancerRepository.findById(id);
        if (freelancerOptional.isPresent()){
            Freelancer f = freelancerOptional.get();
            List<Announcement> announcements = f.getAnnouncements();
            announcements.add(announcement);
            f.setAnnouncements(announcements);
            return freelancerRepository.save(f);
        }else{
            return null;
        }
    }
}
