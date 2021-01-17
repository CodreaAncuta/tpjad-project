package com.example.springdemo.dto.builders;

import com.example.springdemo.dto.AnnouncementDTO;
import com.example.springdemo.dto.CompanyDTO;
import com.example.springdemo.entities.Announcement;
import com.example.springdemo.entities.Company;
import com.example.springdemo.entities.Service;
import com.example.springdemo.repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class CompanyBuilder {

    private static ServiceRepository serviceRepository;

    @Autowired
    public CompanyBuilder(ServiceRepository sr){
        serviceRepository = sr;
    }

    public static CompanyDTO generateDTOFromEntity(Company c){

        List<Integer> servicesIds = new ArrayList<>();
        for(Service s: c.getServices()){
            servicesIds.add(s.getId());
        }

        return new CompanyDTO(c.getId(),c.getName(),c.getEmailContact(),c.getPassword(),c.getAreaOfWork(),
                c.getCity(),c.getLogo(),servicesIds);
    }

    public static Company generateEntityFromDTO(CompanyDTO c){

        List<Service> services = new ArrayList<>();
        for(Integer s: c.getServicesId()){
            Optional<Service> serviceOptional = serviceRepository.findById(s);
            serviceOptional.ifPresent(services::add);
        }

        return new Company(c.getId(),c.getName(),c.getEmailContact(),c.getPassword(),c.getAreaOfWork(),
                c.getCity(),c.getLogo(),services);
    }

    public static Company generateEntityInsertFromDTO(CompanyDTO c){

        return new Company(c.getId(),c.getName(),c.getEmailContact(),c.getPassword(),c.getAreaOfWork(),
                c.getCity(),c.getLogo());
    }
}
