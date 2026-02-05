import { effect, Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    theme = signal<"light" | "dark">("light");

    constructor() {
        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        const preference = window.matchMedia("(prefers-color-scheme: dark").matches;

        this.theme.set(savedTheme || (preference ? "dark" : "light"));

        effect(() => {
            const currentTheme = this.theme();
            document.documentElement.setAttribute("data-bs-theme", currentTheme);
            localStorage.setItem("theme", currentTheme);
        });
    }

    toggleTheme() {
        this.theme.set((this.theme() === "light") ? "dark" : "light");
        console.log("Switch theme:", this.theme());
    }
}
