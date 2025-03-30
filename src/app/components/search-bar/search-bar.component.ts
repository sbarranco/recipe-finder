import { CommonModule } from '@angular/common';
import { Component, OnInit, output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class SearchBarComponent implements OnInit {
  searchItems = output<string>();
  resetSearch = output<void>();

  search = new FormControl<string>('', [Validators.maxLength(120)]);

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        if (query !== null && query.trim() !== '') {
          this.searchItems.emit(query);
        } else {
          this.resetSearch.emit();
        }
      });
  }

  onClickResetSearch(): void {
    this.search.reset();
    this.resetSearch.emit();
  }
}
