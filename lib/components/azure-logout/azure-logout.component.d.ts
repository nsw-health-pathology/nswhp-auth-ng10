import { OnInit } from '@angular/core';
import { AadService } from '../../services/aad.service';
export declare class AzureLogoutComponent implements OnInit {
    private aadService;
    constructor(aadService: AadService);
    ngOnInit(): void;
}
