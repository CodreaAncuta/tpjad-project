package com.example.springdemo;

import com.example.springdemo.entities.Announcement;
import com.example.springdemo.entities.Freelancer;
import com.example.springdemo.entities.roles.Role;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.*;
import java.io.IOException;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AnnouncementServiceIT {

	@Autowired
	private WebApplicationContext context;

	private MockMvc mockMvc;

	public static final String BASE_URL = "http://localhost:8081";
	public static final String ANNOUNCEMENT_API = "/announcement";
	public static final String FREELANCER_API = "/freelancer";
	public static final String QUERY_REQUEST_PARAM = "category";
	public static final String TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTI0MDcwOTMsInVzZXJfbmFtZSI6Im15Y29tcGFueUB5YWhvby5jb20iLCJhdXRob3JpdGllcyI6WyJDT01QQU5ZIl0sImp0aSI6ImYwOTM1NDdhLWI2ZTMtNGFlMy04Yzk4LTg0MGRmM2M4MGVlNiIsImNsaWVudF9pZCI6ImZvb0NsaWVudElkIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.b6LKpE9W_7cXjOrwFhJHeskIbhcfqLfpKIXPnpTwlV4";

	@Before
	public void setup() {
		mockMvc = MockMvcBuilders
				.webAppContextSetup(this.context)
				.apply(springSecurity())
				.build();
	}

	@Test
	public void shouldSearchAnnouncementsByCategory() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL + ANNOUNCEMENT_API)
				.param(QUERY_REQUEST_PARAM, "Jav")
				.header(HttpHeaders.AUTHORIZATION, "Bearer " + TOKEN))
				.andDo(print())
				.andExpect(status().isOk());
	}

	public void cleanUp(final Announcement announcement) throws Exception {
		mockMvc.perform(delete(BASE_URL + ANNOUNCEMENT_API + "/{id}", announcement.getId())
				.header(HttpHeaders.AUTHORIZATION, "Bearer " + TOKEN))
				.andExpect(status().isNoContent());
	}

	public Announcement addTestAnnouncement(String category, Freelancer freelancer) throws Exception {
		Announcement announcement = getAnnouncement(freelancer);
		announcement.setCategory(category);

		String testPoem = mockMvc.perform(MockMvcRequestBuilders.post(BASE_URL + ANNOUNCEMENT_API)
				.contentType(MediaType.APPLICATION_JSON)
				.header(HttpHeaders.AUTHORIZATION, "Bearer " + TOKEN)
				.content(getJsonFromObject(announcement)))
				.andExpect(status().isOk())
				.andReturn().getResponse().getContentAsString();

		return getObjectFromJson(testPoem);
	}

	public Freelancer addTestFreelancer(String name) throws Exception {
		Freelancer freelancer = new Freelancer();
		freelancer.setEmail("test@yahoo.com");
		freelancer.setPassword("test");
		freelancer.setRole(Role.FREELANCER);
		freelancer.setName("Mr Test");

		String testFreelancer = mockMvc.perform(MockMvcRequestBuilders.post(BASE_URL + FREELANCER_API)
				.contentType(MediaType.APPLICATION_JSON)
				.content(getJsonFromObject(freelancer)))
				.andExpect(status().isOk())
				.andReturn().getResponse().getContentAsString();

		return getObjectFromJsonFreelancer(testFreelancer);
	}


	public static Announcement getAnnouncement(Freelancer freelancer) {
		Announcement announcement = new Announcement();
		announcement.setTitle("Prototype");
		announcement.setTechnology("Figma");
		announcement.setCategory("UI/UX");
		announcement.setFreelancer(freelancer);
		return announcement;
	}

	public String getJsonFromObject(Announcement announcement) {
		ObjectMapper mapper = new ObjectMapper();
		String json = null;
		try {
			json = mapper.writeValueAsString(announcement);
			System.out.println("ResultingJSONstring = " + json);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return json;
	}

	public String getJsonFromObject(Freelancer freelancer) {
		ObjectMapper mapper = new ObjectMapper();
		String json = null;
		try {
			json = mapper.writeValueAsString(freelancer);
			System.out.println("ResultingJSONstring = " + json);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return json;
	}

	public Announcement getObjectFromJson(String json) {
		ObjectMapper mapper = new ObjectMapper();
		Announcement announcement = null;
		try {
			announcement = mapper.readValue(json, Announcement.class);
			System.out.println("object = " + announcement);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return announcement;
	}

	public Freelancer getObjectFromJsonFreelancer(String json) {
		ObjectMapper mapper = new ObjectMapper();
		Freelancer freelancer = null;
		try {
			freelancer = mapper.readValue(json, Freelancer.class);
			System.out.println("object = " + freelancer);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return freelancer;
	}
}