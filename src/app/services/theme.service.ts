import { Injectable, Renderer2, RendererFactory2, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private renderer: Renderer2;
    private isDark = false;

    constructor(
        rendererFactory: RendererFactory2,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.renderer = rendererFactory.createRenderer(null, null);
        this.initializeTheme();
    }

    private initializeTheme(): void {
        if (isPlatformBrowser(this.platformId)) {
            const savedTheme = localStorage.getItem('theme');
            this.isDark = savedTheme === 'dark';
            this.applyTheme();
        }
    }

    toggleTheme(): void {
        this.isDark = !this.isDark;
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
        }
        this.applyTheme();
    }

    get currentTheme(): boolean {
        return this.isDark;
    }

    private applyTheme(): void {
        if (isPlatformBrowser(this.platformId)) {
            if (this.isDark) {
                this.renderer.addClass(document.body, 'dark-theme');
            } else {
                this.renderer.removeClass(document.body, 'dark-theme');
            }
        }
    }
}
