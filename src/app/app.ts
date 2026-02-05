import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Headbar } from './components/headbar/headbar';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Headbar],
    templateUrl: './app.html',
    styleUrl: './app.css'
})
export class App {
    
}
