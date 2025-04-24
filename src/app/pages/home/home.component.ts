import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private movieService = inject(MovieService);
  movies: any[] = [];
  currentPage = 1;
  selectedGenre: number | null = null;
  genres: any[] = [];

  ngOnInit() {
    this.loadGenres();
    this.loadMovies();
  }

  loadGenres() {
    this.movieService.getGenres().subscribe((data: any) => {
      this.genres = data.genres;
    });
  }

  loadMovies(reset: boolean = false) {
    if (reset) {
      this.currentPage = 1;
      this.movies = [];
    }

    const fetch = this.selectedGenre
      ? this.movieService.getMoviesByGenre(this.selectedGenre, this.currentPage)
      : this.movieService.getPopularMovies(this.currentPage);

    fetch.subscribe((data: any) => {
      this.movies = [...this.movies, ...data.results];
    });
  }

  loadMore() {
    this.currentPage++;
    this.loadMovies();
  }

  filterByGenre(genreId: number) {
    this.selectedGenre = genreId;
    this.loadMovies(true);
  }
}