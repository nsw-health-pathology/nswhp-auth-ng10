import { Router } from '@angular/router';
export declare class ContactAdminComponent {
    private readonly router;
    readonly email: string;
    readonly subject: string;
    readonly href: string;
    constructor(router: Router);
    redirect(): Promise<void>;
}
