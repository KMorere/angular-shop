import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Training } from '../model/Training';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AdminService {
    constructor(private http: HttpClient) { }
    
    addCourse(course: Training): Observable<any> {
        console.log("Adding course : ", JSON.stringify(course));
        return this.http.post<any>("http://localhost:3000/courses", course);
    }
    
    updateCourse(course: Training): Observable<any> {
        console.log("Updating course : ", JSON.stringify(course));
        return this.http.put<any>("http://localhost:3000/courses/"+course.id, course);
    }
    
    deleteCourse(course: Training): Observable<any> {
        console.log("Deleting course : ", JSON.stringify(course));
        return this.http.delete<any>("http://localhost:3000/courses/"+course.id);
    }
}
