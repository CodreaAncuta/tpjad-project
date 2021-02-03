package com.example.springdemo.controller;

import com.example.springdemo.dto.AnnouncementDTO;
import com.example.springdemo.entities.Announcement;
import com.example.springdemo.services.AnnouncementService;
import com.google.common.base.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin
@RequestMapping(value = "/announcement")
public class AnnouncementController {

    private final AnnouncementService announcementService;

    @Autowired
    public AnnouncementController(AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

    @GetMapping()
    public List<AnnouncementDTO> findAll(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String technology) {
        if (!Strings.isNullOrEmpty(category) && !Strings.isNullOrEmpty(technology))
            return announcementService.findByTechnologyAndCategory(technology, category);

        if (!Strings.isNullOrEmpty(category))
            return announcementService.findByCategory(category);

        if (!Strings.isNullOrEmpty(technology))
            return announcementService.findByTechnology(technology);

        return announcementService.findAll();
    }

    @GetMapping("/price")
    public Set<AnnouncementDTO> findAllByPrice(
            @RequestParam(required = true) Integer value,
            @RequestParam(required = true) String operator) {
        return announcementService.findByPrice(value, operator);
    }

    @GetMapping("/duration")
    public Set<AnnouncementDTO> findAllByDuration(Integer duration) {
        return announcementService.findByDuration(duration);
    }

    @PostMapping()
    public Integer insert(@RequestBody AnnouncementDTO announcementDTO) {
        return announcementService.insert(announcementDTO);
    }

    @PutMapping(value = "/{id}")
    public Announcement update(@PathVariable("id") Integer id, @RequestBody AnnouncementDTO announcementDTO) {
        return announcementService.update(id, announcementDTO);
    }

    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable("id") Integer id) {
        announcementService.delete(id);
    }

    @GetMapping(value = "/{id}")
    public Announcement findById(@PathVariable("id") Integer id) {
        return announcementService.findAnnouncementById(id);
    }

    @GetMapping(value = "/freelancerAnnouncement/{id}")
    public Set<AnnouncementDTO> getAnnouncementByFreelancer(@PathVariable("id") Integer id) {
        return announcementService.getAnnouncementsByFreelancer(id);
    }

    @GetMapping(value = "/freelancer/{id}")
    public AnnouncementDTO getAnnouncementByFreelancerAndTitle(@PathVariable("id") Integer id,
                                                                    @RequestParam(required = true) String title) {
        return announcementService.getAnnouncementByFreelancerAndTitle(id, title);
    }
}
