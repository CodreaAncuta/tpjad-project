//package com.example.springdemo;
//
//import com.application.poetry.dto.PoemDTO;
//import com.application.poetry.model.Poem;
//import com.application.poetry.repository.PoemRepository;
//import com.application.poetry.repository.UserPoemsRepository;
//import com.application.poetry.service.*;
//import com.application.poetry.utils.AuthenticationUtils;
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.MockitoJUnitRunner;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageImpl;
//import org.springframework.data.domain.PageRequest;
//
//import java.util.List;
//
//import static org.junit.Assert.assertEquals;
//import static org.mockito.ArgumentMatchers.*;
//import static org.mockito.Mockito.*;
//
//@RunWith(MockitoJUnitRunner.class)
//public class PoemServiceTest {
//
//    @Mock
//    private PoemRepository poemRepository;
//
//    @Mock
//    private UserPoemsRepository userPoemsRepository;
//
//    @Mock
//    private UserService userService;
//
//    @Mock
//    private PoemFavouritesService poemFavouritesService;
//
//    @Mock
//    private PoemRatingService poemRatingService;
//
//    @Mock
//    private LyricService lyricService;
//
//    @Mock
//    private AuthenticationUtils authenticationUtils;
//
//
//    @InjectMocks
//    private PoemService poemService;
//
//    @Before
//    public void setUp() {
//        when(authenticationUtils.getAuthenticatedPrincipal()).thenReturn(Dummies.USERNAME);
//        when(userService.getUserInfoByUsername(Dummies.USERNAME)).thenReturn(Dummies.getUserInfo());
//    }
//
//    @Test
//    public void shouldSearchPoemsByTitle() {
//        Page<Poem> poemPage = new PageImpl<>(Dummies.getListOfPoems());
//        List<Poem> poemListExpected = poemPage.getContent();
//
//        // given
//        when(poemRepository.getAllByTitleContainingOrderByCreatedTimeDesc(anyString(), any())).thenReturn(poemPage);
//        when(poemFavouritesService.findAllFavouritesForUser()).thenReturn(Dummies.getListOfPoemDTOs());
//        when(poemRatingService.findPoemRating(anyInt())).thenReturn(new Float(5));
//        when(userPoemsRepository.findAllByIdPoemId(anyInt())).thenReturn(Dummies.getUserPoemsSet());
//
//        // when
//        Page<PoemDTO> actualPoemPage = poemService.searchPoemsByTitle(Dummies.POEM_TITLE, PageRequest.of(0, 100));
//        List<PoemDTO> poemListActual = actualPoemPage.getContent();
//
//        // then
//        verify(poemRepository, times(1)).getAllByTitleContainingOrderByCreatedTimeDesc(anyString(), any());
//        verify(poemFavouritesService, times(1)).findAllFavouritesForUser();
//        verify(poemRatingService, times(1)).findPoemRating(anyInt());
//        verify(userPoemsRepository, times(1)).findAllByIdPoemId(anyInt());
//        verifyNoMoreInteractions(poemRepository, poemFavouritesService, poemRatingService, userPoemsRepository);
//
//        comparePoemLists(poemListExpected, poemListActual);
//    }
//
//    public void comparePoemLists(List<Poem> expectedPoemList, List<PoemDTO> actualPoemList) {
//        assertEquals(expectedPoemList.size(), actualPoemList.size());
//        assertEquals(expectedPoemList.get(0).getId(), actualPoemList.get(0).getId());
//        assertEquals(expectedPoemList.get(0).getTitle(), actualPoemList.get(0).getTitle());
//    }
//}