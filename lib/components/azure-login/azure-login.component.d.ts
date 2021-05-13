import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AadService } from '../../services/aad.service';
import { StorageService } from '../../services/storage.service';
export declare class AzureLoginComponent implements OnInit {
    private aadService;
    private router;
    private activatedRoute;
    private storage;
    readonly azureInstanceAD = "NSW Health Employee";
    constructor(aadService: AadService, router: Router, activatedRoute: ActivatedRoute, storage: StorageService);
    private handleLoginRouting;
    ngOnInit(): Promise<void>;
    selectAzureInstance(instance: string): void;
}
