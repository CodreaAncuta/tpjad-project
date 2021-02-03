package com.application.poetry;

import com.application.poetry.model.Poem;
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

import static com.application.poetry.Dummies.*;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.*;
import java.io.IOException;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PoemControllerIT {

	@Autowired
	private WebApplicationContext context;

	private MockMvc mockMvc;

	@Before
	public void setup() {
		mockMvc = MockMvcBuilders
				.webAppContextSetup(this.context)
				.apply(springSecurity())
				.build();
	}

	@Test
	public void shouldSearchPoemsByTitle() throws Exception {
		Poem poem = addTestPoem("Blue test");

		mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL + POEMS_API + SEARCH)
				.queryParam(QUERY_REQUEST_PARAM, "Blue")
				.header(HttpHeaders.AUTHORIZATION, "Bearer " + TOKEN))
				.andDo(print())
				.andExpect(status().isOk());

		cleanUp(poem);
	}

	public void cleanUp(final Poem poem) throws Exception {
		mockMvc.perform(delete(BASE_URL + POEMS_API + "/{id}", poem.getId())
				.header(HttpHeaders.AUTHORIZATION, "Bearer " + TOKEN))
				.andExpect(status().isNoContent());
	}

	public Poem addTestPoem(String title) throws Exception {
		Poem poem = Dummies.getPoem();
		poem.setTitle(title);

		String testPoem = mockMvc.perform(MockMvcRequestBuilders.post(BASE_URL + POEMS_API )
				.contentType(MediaType.APPLICATION_JSON)
				.header(HttpHeaders.AUTHORIZATION, "Bearer " + TOKEN)
				.content(getJsonFromObject(poem)))
				.andExpect(status().isOk())
				.andReturn().getResponse().getContentAsString();

		return getObjectFromJson(testPoem);
	}

	public String getJsonFromObject(Poem poem) {
		ObjectMapper mapper = new ObjectMapper();
		String json = null;
		try {
			json = mapper.writeValueAsString(poem);
			System.out.println("ResultingJSONstring = " + json);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return json;
	}

	public Poem getObjectFromJson(String json) {
		ObjectMapper mapper = new ObjectMapper();
		Poem poem = null;
		try {
			poem = mapper.readValue(json, Poem.class);
			System.out.println("object = " + poem);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return poem;
	}
}