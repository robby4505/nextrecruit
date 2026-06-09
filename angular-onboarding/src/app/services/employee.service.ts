import { Injectable, signal, computed } from '@angular/core';

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  stage: string;
  progress: number;
  avatar: string;
  platform: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  searchQuery = signal('');
  activeFilter = signal<'All' | 'Pending' | 'In Progress' | 'Completed'>('All');

  employees = signal<Employee[]>([
    { id: 'EMP-001', name: 'Sarah Jenkins', role: 'Frontend Engineer', department: 'Engineering', status: 'In Progress', stage: 'Onboarding', progress: 65, avatar: 'SJ', platform: 'LinkedIn' },
    { id: 'EMP-002', name: 'Michael Chen', role: 'Product Manager', department: 'Product', status: 'Pending', stage: 'CV Scanning', progress: 10, avatar: 'MC', platform: 'WWR' },
    { id: 'EMP-003', name: 'Elena Rodriguez', role: 'UX Designer', department: 'Design', status: 'Completed', stage: 'Hired & Active', progress: 100, avatar: 'ER', platform: 'Upwork' },
    { id: 'EMP-004', name: 'David Kim', role: 'Data Analyst', department: 'Data Science', status: 'In Progress', stage: 'Background Check', progress: 45, avatar: 'DK', platform: 'Jobstreet' },
    { id: 'EMP-005', name: 'James Wilson', role: 'Backend Engineer', department: 'Engineering', status: 'Pending', stage: 'Interviewing', progress: 0, avatar: 'JW', platform: 'LinkedIn' },
    { id: 'EMP-006', name: 'Anna Lee', role: 'UX Researcher', department: 'Design', status: 'In Progress', stage: 'Training', progress: 30, avatar: 'AL', platform: 'WWR' },
    { id: 'EMP-007', name: 'Tom Hardy', role: 'DevOps Engineer', department: 'Engineering', status: 'Completed', stage: 'Hired & Active', progress: 100, avatar: 'TH', platform: 'Upwork' },
  ]);

  filteredEmployees = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const filter = this.activeFilter();
    
    return this.employees().filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(query) || 
                            emp.role.toLowerCase().includes(query) ||
                            emp.department.toLowerCase().includes(query) ||
                            emp.platform.toLowerCase().includes(query) ||
                            emp.stage.toLowerCase().includes(query) ||
                            emp.id.toLowerCase().includes(query);
      const matchesFilter = filter === 'All' || emp.status === filter;
      return matchesSearch && matchesFilter;
    });
  });

  totalHires = computed(() => this.employees().length);
  completedHires = computed(() => this.employees().filter(e => e.status === 'Completed').length);

  addNewHire() {
    const count = this.employees().length + 1;
    const names = ['Alex Rivera', 'Jordan Lee', 'Taylor Smith', 'Morgan Davis', 'Casey Jones', 'Sam Chen', 'Riley Wong'];
    const roles = ['Frontend Eng.', 'Product Mgr.', 'UX Designer', 'Data Analyst', 'Backend Eng.', 'DevOps Eng.', 'UI/UX Lead'];
    const depts = ['Engineering', 'Product', 'Design', 'Data Science', 'Engineering', 'Engineering', 'Design'];
    const platforms = ['LinkedIn', 'Upwork', 'WWR', 'Jobstreet', 'Indeed'];
    
    const r = Math.floor(Math.random() * names.length);
    const rp = Math.floor(Math.random() * platforms.length);
    const selectedName = names[r];
    const initials = selectedName.split(' ').map(n => n[0]).join('');

    const newEmp: Employee = {
      id: `EMP-00${count}`,
      name: selectedName,
      role: roles[r],
      department: depts[r],
      status: 'Pending',
      stage: 'CV Scanning',
      progress: 0,
      avatar: initials,
      platform: platforms[rp]
    };
    
    this.employees.update(emps => [newEmp, ...emps]);
  }

  cycleStatus(id: string) {
    this.employees.update(emps => emps.map(emp => {
      if (emp.id !== id) return emp;
      
      let nextStatus: Employee['status'] = 'Pending';
      let nextProgress = 0;
      let nextStage = 'CV Scanning';
      
      if (emp.status === 'Pending') {
        nextStatus = 'In Progress';
        nextProgress = 50;
        nextStage = 'Onboarding';
      } else if (emp.status === 'In Progress') {
        nextStatus = 'Completed';
        nextProgress = 100;
        nextStage = 'Hired & Active';
      }
      
      return { ...emp, status: nextStatus, progress: nextProgress, stage: nextStage };
    }));
  }

  deleteEmployee(id: string) {
    this.employees.update(emps => emps.filter(e => e.id !== id));
  }

  getStatusClass(status: string) {

    return {
      'status-badge-pending': status === 'Pending',
      'status-badge-progress': status === 'In Progress',
      'status-badge-completed': status === 'Completed'
    };
  }
}
