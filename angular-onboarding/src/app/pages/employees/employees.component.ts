import { Component, inject } from '@angular/core';
import { NgClass, LowerCasePipe } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [NgClass, LowerCasePipe],
  template: `
    <div class="page-title">
      <h1>Employee Directory</h1>
      <p>Manage all active and onboarding employees.</p>
    </div>

    <!-- Main Table Card -->
    <div class="table-container card">
      <div class="table-header">
        <h2>All Employees ({{ empService.totalHires() }})</h2>
        <div class="filter-group" style="display:flex; gap:1rem; align-items:center;">
          <select class="filter-select" (change)="onFilterChange($event)">
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee</th>
            <th>Platform</th>
            <th>Department</th>
            <th>Status</th>
            <th>Progress</th>
            <th style="text-align: right;">Actions</th>
          </tr>
        </thead>
        <tbody>
          @for (emp of empService.filteredEmployees(); track emp.id) {
            <tr>
              <td><span style="font-size:0.85rem; color:var(--text-secondary)">{{ emp.id }}</span></td>
              <td>
                <div class="emp-profile">
                  <div class="emp-avatar">{{ emp.avatar }}</div>
                  <div class="emp-details">
                    <span class="name">{{ emp.name }}</span>
                    <span class="role">{{ emp.role }}</span>
                  </div>
                </div>
              </td>
              <td><span class="platform-badge {{ emp.platform | lowercase }}">{{ emp.platform }}</span></td>
              <td><span class="dept-badge">{{ emp.department }}</span></td>
              <td>
                <div style="display: flex; flex-direction: column; align-items: flex-start;">
                  <div class="status-pill" [ngClass]="empService.getStatusClass(emp.status)">
                    <span class="dot"></span> {{ emp.status }}
                  </div>
                  <span style="font-size: 0.7rem; color: var(--text-secondary); margin-top: 4px; padding-left: 6px;">{{ emp.stage }}</span>
                </div>
              </td>
              <td>
                <div class="progress-wrap">
                  <span class="progress-val">{{ emp.progress }}%</span>
                  <div class="progress-track">
                    <div class="progress-fill" [style.width.%]="emp.progress"></div>
                  </div>
                </div>
              </td>
              <td style="text-align: right; white-space: nowrap;">
                <div style="display:inline-flex; gap:8px;">
                  <button class="icon-btn outline" (click)="empService.cycleStatus(emp.id)" title="Update Status">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                  </button>
                  <button class="icon-btn outline" (click)="empService.deleteEmployee(emp.id)" title="Remove" style="color: var(--accent-danger); border-color: rgba(238,0,0,0.2);">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  </button>
                </div>
              </td>
            </tr>
          } @empty {
            <tr><td colspan="6" style="text-align:center; padding: 2rem;">No employees found.</td></tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .filter-select {
      padding: 6px 12px;
      border: 1px solid var(--border);
      border-radius: 6px;
      background: var(--bg-surface);
      font-size: 0.85rem;
      color: var(--text-main);
      outline: none;
    }
  `]
})
export class EmployeesComponent {
  empService = inject(EmployeeService);

  onFilterChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value as any;
    this.empService.activeFilter.set(val);
  }
}
