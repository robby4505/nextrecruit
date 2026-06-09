import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  empService = inject(EmployeeService);

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.empService.searchQuery.set(input.value);
  }

  addNewHire() {
    this.empService.addNewHire();
  }
}
