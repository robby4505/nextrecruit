import { Component } from '@angular/core';

@Component({
  selector: 'app-analytics',
  standalone: true,
  template: `
    <div class="page-title">
      <h1>Analytics Deep Dive</h1>
      <p>Comprehensive reports on onboarding velocity and team growth.</p>
    </div>
    
    <div class="card" style="padding: 3rem; text-align: center; color: var(--text-secondary); margin-top: 2rem;">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-bottom: 1rem;"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
      <h2>Advanced Analytics Coming Soon</h2>
      <p>This module is currently being built by the Data Science team.</p>
    </div>
  `
})
export class AnalyticsComponent {}
