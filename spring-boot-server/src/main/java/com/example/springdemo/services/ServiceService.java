package com.example.springdemo.services;

import com.example.springdemo.dto.ServiceDTO;
import com.example.springdemo.dto.builders.FreelancerBuilder;
import com.example.springdemo.dto.builders.ServiceBuilder;
import com.example.springdemo.entities.Company;
import com.example.springdemo.entities.Freelancer;
import com.example.springdemo.entities.Service;
import com.example.springdemo.errorhandler.ResourceNotFoundException;
import com.example.springdemo.repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class ServiceService {

    private final ServiceRepository serviceRepository;

    @Autowired
    public ServiceService(ServiceRepository serviceRepository){ this.serviceRepository=serviceRepository;}

    public Service findServiceById(Integer id){
        Optional<Service> service = serviceRepository.findById(id);
        if (!service.isPresent()) {
            throw new ResourceNotFoundException("Service", "user id", id);
        }
        return service.get();
    }

    public Set<ServiceDTO> findAll(){
        Set<Service> services = serviceRepository.getAllOrdered();
        return services.stream()
                .map(ServiceBuilder::generateDTOFromEntity)
                .collect(Collectors.toSet());
    }

    public Integer insert(ServiceDTO service) {

        return serviceRepository
                .save(ServiceBuilder.generateEntityFromDTO(service))
                .getId();
    }

    public Service update(ServiceDTO service) {

        Optional<Service> serviceOptional = serviceRepository.findById(service.getId());
        if(!serviceOptional.isPresent()){
            return null;
        }
        return serviceRepository.save(ServiceBuilder.generateEntityFromDTO(service));
    }

    public void delete(ServiceDTO service){
        this.serviceRepository.deleteById(service.getId());
    }

    public Set<Service> getServicesByFreelancer(Freelancer freelancer){
        Set<Service> servSet = serviceRepository.getAllPerFreelancer(freelancer);
        return servSet;
    }

    public Set<Service> getServicesByCompany(Company company){
        Set<Service> servSet = serviceRepository.getAllPerCompany(company);
        return servSet;
    }

    public Set<Service> getByDurationAscending(){
        Set<Service> servSet = serviceRepository.getAllByDuration();
        return servSet;
    }

    public Set<Service> getByPriceAscending(){
        Set<Service> servSet = serviceRepository.getAllByPrice();
        return servSet;
    }
}
