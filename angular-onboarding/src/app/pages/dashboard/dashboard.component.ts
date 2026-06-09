import { Component, computed, inject } from '@angular/core';
import { NgClass, SlicePipe, LowerCasePipe } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgClass, BaseChartDirective, SlicePipe, LowerCasePipe],
  template: `
    <div class="page-title">
      <h1>Overview</h1>
      <p>Monitor your team's onboarding health and velocity.</p>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid">
      <div class="stat-card card">
        <div class="stat-icon bg-blue">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
        </div>
        <div class="stat-info">
          <h3>Total Active Hires</h3>
          <div class="value">{{ empService.totalHires() }}</div>
        </div>
        <div class="trend positive">Live</div>
      </div>
      
      <div class="stat-card card">
        <div class="stat-icon bg-green">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <div class="stat-info">
          <h3>Completed</h3>
          <div class="value">{{ empService.completedHires() }}</div>
        </div>
        <div class="trend positive">Live</div>
      </div>

      <div class="stat-card card">
        <div class="stat-icon bg-orange">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        </div>
        <div class="stat-info">
          <h3>Avg. Time to Output</h3>
          <div class="value">14 <span style="font-size:1rem; font-weight:500; color:var(--text-secondary)">days</span></div>
        </div>
        <div class="trend neutral">-</div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="charts-row">
      <div class="chart-card card line-chart-container">
        <h3>Onboarding Velocity (6 Months)</h3>
        <div class="canvas-wrapper">
          <canvas baseChart [data]="lineChartData()" [options]="lineChartOptions" type="line"></canvas>
        </div>
      </div>
      
      <div class="chart-card card doughnut-chart-container">
        <h3>Department Distribution</h3>
        <div class="canvas-wrapper">
          <canvas baseChart [data]="doughnutChartData()" [options]="doughnutChartOptions" type="doughnut"></canvas>
        </div>
      </div>
    </div>

    <!-- Main Table Card -->
    <div class="table-container card">
      <div class="table-header">
        <h2>Recent Onboarding (Top 5)</h2>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Platform</th>
            <th>Department</th>
            <th>Status</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          @for (emp of empService.filteredEmployees() | slice:0:5; track emp.id) {
            <tr>
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
            </tr>
          }
        </tbody>
      </table>
    </div>
  `
})
export class DashboardComponent {
  empService = inject(EmployeeService);

  doughnutChartData = computed<ChartConfiguration<'doughnut'>['data']>(() => {
    const emps = this.empService.employees();
    const eng = emps.filter(e => e.department === 'Engineering').length;
    const prod = emps.filter(e => e.department === 'Product').length;
    const des = emps.filter(e => e.department === 'Design').length;
    const dataSci = emps.filter(e => e.department === 'Data Science').length;
    
    return {
      labels: [`Engineering (${eng})`, `Product (${prod})`, `Design (${des})`, `Data Sci (${dataSci})`],
      datasets: [{
        data: [eng, prod, des, dataSci],
        backgroundColor: ['#0070f3', '#f5a623', '#10b981', '#7928ca'],
        borderWidth: 0
      }]
    };
  });

  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true, maintainAspectRatio: false, cutout: '70%',
    plugins: { legend: { position: 'right' } }
  };

  lineChartData = computed<ChartConfiguration<'line'>['data']>(() => {
    const baseData = [12, 19, 15, 25, 22];
    const currentMonthData = 30 + (this.empService.totalHires() - 5) * 5; 
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun (Current)'],
      datasets: [{
        data: [...baseData, currentMonthData], label: 'Successful Onboardings',
        fill: true, tension: 0.4, borderColor: '#0070f3', backgroundColor: 'rgba(0, 112, 243, 0.1)'
      }]
    };
  });

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } }
  };
}
