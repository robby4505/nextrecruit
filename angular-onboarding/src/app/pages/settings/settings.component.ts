import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  template: `
    <div class="page-title">
      <h1>Organization Settings</h1>
      <p>Configure workspace preferences and integrations.</p>
    </div>
    
    <div class="card" style="padding: 2rem; max-width: 600px;">
      <div style="margin-bottom: 1.5rem;">
        <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:0.5rem;">Workspace Name</label>
        <input type="text" value="NextHire Inc." style="width:100%; padding:8px 12px; border:1px solid var(--border); border-radius:6px;" disabled/>
      </div>
      
      <div style="margin-bottom: 1.5rem;">
        <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:0.5rem;">Admin Email</label>
        <input type="email" value="admin@nexthire.io" style="width:100%; padding:8px 12px; border:1px solid var(--border); border-radius:6px;" disabled/>
      </div>

      <div style="margin-bottom: 2rem;">
        <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:0.5rem;">Enable Email Notifications</label>
        <input type="checkbox" checked disabled/> Notify me when a new hire completes onboarding
      </div>

      <button class="btn-primary" style="opacity: 0.5; cursor: not-allowed;">Save Changes</button>
    </div>
  `
})
export class SettingsComponent {}
