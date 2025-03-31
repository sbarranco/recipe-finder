import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  imports: [CommonModule],
})
export class ButtonComponent {
  text = input<string>('');
  icon = input<string | null>(null);
  buttonType = input<'primary' | 'secondary' | 'danger'>('primary');
  disabled = input<boolean>(false);
  ariaLabel = input<string>('');
  onClick = output<void>();
}
