
import { Component, inject, OnInit } from '@angular/core';
import { Activities } from '../activities.model';
import { ActivitiesService } from '../activities.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-activities',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './activities.component.html',
    styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
    activities: Activities[] = [];
    activityById: Activities = {
        _id: '',
        activityTitle: '',
        duration: 0,
        burnedCalories: 0,
        steps: 0,
        distance: 0,
        date: new Date()
    };
    showUpdateForm: boolean = false;
    updatedActivity: Activities= {
        _id: '', activityTitle: '', duration: 0,
        burnedCalories: 0, steps: 0, distance: 0, date: new Date()
    };
    searchQuery: any;
    searchQueryDate: any;
    displayedActivities: Activities[] = [];
    activity: Activities = {
        _id: '',
        activityTitle: '',
        duration: 0,
        burnedCalories: 0,
        steps: 0,
        distance: 0,
        date: new Date()
    };
    showAddForm: boolean = false;
    getActivityByIdDate: string = '';

    
      constructor(private activityService: ActivitiesService,
        private router: Router) { }

    ngOnInit(): void {
 
        this.getAllActivities();

    }



    getAllActivities(): void {
      this.activityService.getAllActivities().subscribe(
          (activities: Activities[]) => {
              this.activities = activities;
              this.displayedActivities = [...this.activities];
          },
          error => {
              console.error('Error fetching activities:', error);
          }
      );
  }


    getActivityById(id: string): void {
      this.showUpdateForm = false;
      this.showAddForm = false;
      this.activityService.getActivityById(id).subscribe(
          (activity) => {
              this.activityById = activity;
              this.getActivityByIdDate = this.activityById.date.toString().slice(0, 10);
          },
          error => {
              console.error('Error in getting activity:', error);
          }
      );
  }

    populateForm(activity: Activities): void {
        this.updatedActivity = { ...activity };
        this.showUpdateForm = true;
    }


    updateActivity(): void {
      if (this.updatedActivity._id) {
          this.activityService.updateActivity(this.updatedActivity._id, this.updatedActivity).subscribe(
              (updatedActivity) => {
                  const index = this.activities.findIndex(a => a._id === updatedActivity._id);
                  if (index !== -1) {
                      this.activities[index] = updatedActivity;
                      this.getAllActivities();
                      this.showUpdateForm = false;
                  }
                  this.cancelUpdate();
              },
              error => {
                  console.error('Error updating activity:', error);
              }
          );
      } else {
          console.error('Activity ID is required to update an activity.');
      }
  }

    cancelUpdate(): void {
        this.showUpdateForm = false;
        this.updatedActivity = {
            _id: '', activityTitle: '',
            duration: 0, burnedCalories: 0, steps: 0, distance: 0,
            date: new Date()
        };
        this.activityById = {
            _id: '',
            activityTitle: '',
            duration: 0,
            burnedCalories: 0,
            steps: 0,
            distance: 0,
            date: new Date()
        };
    }

    closeView(): void {
        this.activityById = {
            _id: '',
            activityTitle: '',
            duration: 0,
            burnedCalories: 0,
            steps: 0,
            distance: 0,
            date: new Date()
        };
    }


    confirmDelete(activityId: string): void {
        const confirmDelete = window.confirm('Are you sure you want to delete this activity?');
        if (confirmDelete) {
            this.deleteActivity(activityId);
        }
    }

    deleteActivity(id: string): void {
      this.showUpdateForm = false;
      this.activityService.deleteActivity(id).subscribe(
          () => {
              this.activities = this.activities.filter(activity => activity._id !== id);
              this.displayedActivities = [...this.activities]
          },
          error => {
              console.error('Error deleting activity:', error);
          }
      );
  }


      addActivity(): void {
        this.showAddForm = true;
        this.showUpdateForm = false;
        this.activityService.addActivity(this.activity).subscribe(
            (newActivity: Activities) => {
                this.closeAddForm();
                this.getAllActivities();
                this.router.navigate(["/activities"]);
            },
            error => {
                console.error('Error adding activity:', error);
            }
        );
    }


    resetForm(): void {
        this.activity = {
            _id: '',
            activityTitle: '',
            duration: 0,
            burnedCalories: 0,
            steps: 0,
            distance: 0,
            date: new Date()
        };
    }

    closeAddForm(): void {
        this.activity = {
            _id: '',
            activityTitle: '',
            duration: 0,
            burnedCalories: 0,
            steps: 0,
            distance: 0,
            date: new Date()
        };
        this.showAddForm = false;
    }

    showAddFormFunction(): void {
        this.showAddForm = true;
    }

    applyFilter(): void {
        if (!this.searchQuery?.trim() && !this.searchQueryDate?.trim()) {
            this.displayedActivities = [...this.activities];
        }
        else if (this.searchQueryDate?.trim() && !this.searchQuery?.trim()) {
            const queryDate = this.searchQueryDate ?
                this.searchQueryDate.toLowerCase().trim() : this.searchQueryDate;
            this.displayedActivities = this.activities.filter(activity =>
                activity.date.toString().toLowerCase().includes(queryDate)
            );
        }
        else if (!this.searchQueryDate?.trim() && this.searchQuery?.trim()) {
            const query = this.searchQuery ?
                this.searchQuery.toLowerCase().trim() : this.searchQuery;
            this.displayedActivities = this.activities.filter(activity =>
                activity.activityTitle.toLowerCase().includes(query)
            );
        }
        else {
            const query = this.searchQuery ?
                this.searchQuery.toLowerCase().trim() : this.searchQuery;
            const queryDate = this.searchQueryDate ?
                this.searchQueryDate.toLowerCase().trim() : this.searchQueryDate;
            this.displayedActivities = this.activities.filter(activity =>
                activity.activityTitle.toLowerCase().includes(query) &&
                activity.date.toString().toLowerCase().includes(queryDate)
            );
        }
    }

    clearFilter(): void {
        this.searchQuery = '';
        this.applyFilter();
    }

    clearFilterDate(): void {
        this.searchQueryDate = "";
        this.applyFilter();
    }
}