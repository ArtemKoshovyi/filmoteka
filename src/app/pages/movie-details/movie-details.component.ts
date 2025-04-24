import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
  
  
})
export class MovieDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  movie: any;
  cast: any;

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
  
    this.movieService.getMovieDetails(id).subscribe(data => {
      this.movie = data;
    });
  
    this.movieService.getCredits(id).subscribe((data: any) => {
      this.cast = data.cast.slice(0, 10); 
    });
  }
  
}
