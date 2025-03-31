import { CommonModule } from '@angular/common';
import { Component, OnInit, output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
})
export class SearchBarComponent implements OnInit {
  searchItems = output<string>();
  resetSearch = output<void>();
  randomRecipe = output<void>();
  clearList = output<void>();

  search = new FormControl<string>('', [Validators.maxLength(120)]);

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        if (query?.trim()) {
          this.searchItems.emit(query.trim());
        } else {
          this.resetSearch.emit();
        }
      });
  }

  onClickResetSearch(): void {
    this.search.reset();
    this.resetSearch.emit();
  }

  onClickRandomRecipe(): void {
    this.randomRecipe.emit();
  }

  onClickClearList(): void {
    this.search.reset();
    this.clearList.emit();
  }
}
