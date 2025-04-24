import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private http = inject(HttpClient);
  private apiKey = '2aa91cf07ad2396be475ae707652f77d';
  private baseUrl = 'https://api.themoviedb.org/3';

 

  getMovieDetails(id: string) {
    return this.http.get(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=en-US`);
  }
  getCredits(id: number) {
    return this.http.get(`${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`);
  }
  getPopularMovies(page: number = 1) {
    return this.http.get(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=en-US&page=${page}`);
  }
  
  getGenres() {
    return this.http.get(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}&language=en-US`);
  }
  
  getMoviesByGenre(genreId: number, page: number = 1) {
    return this.http.get(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${genreId}&language=en-US&page=${page}`);
  
  }
}