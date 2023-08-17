import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ClienteListaComponent } from "./cliente-lista.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AvisosDialogService } from "src/app/servicos/avisos-dialog.service";
import { ClienteService } from "src/app/servicos/cliente.service";
import { SharedModule } from "../../shared/shared.module";
import { of, throwError } from "rxjs";
import { ClienteDTOResourceList } from "src/app/entity/clienteDDTOResourceList";



describe('ClienteListaComponent', () => {

    let clienteListaComponent: ClienteListaComponent;
    let fixture: ComponentFixture<ClienteListaComponent>;

    let mockClienteService: any;
    let mockMatSnackBar: any;
    let mockAvisosDialogService: any;
    let mockRouter: any;

    beforeEach((() => {
        mockClienteService = jasmine.createSpyObj('ClienteService', [
            'listarTodosPaginadoFilter',
            'deletarCliente'
        ]);

        mockMatSnackBar = jasmine.createSpyObj('MatSnackBar', [
            'open'
        ]);

        mockAvisosDialogService = jasmine.createSpyObj('AvisosDialogService', [
            'openConfirmationDialog'
        ]);

        mockRouter = jasmine.createSpyObj('Router', [
            'navigate'
        ]);

        TestBed.configureTestingModule({
            imports: [
                SharedModule
            ],
            providers: [
                { provide: ClienteService, useValue: mockClienteService },
                { provide: MatSnackBar, useValue: mockMatSnackBar },
                { provide: AvisosDialogService, useValue: mockAvisosDialogService },
                { provide: Router, useValue: mockRouter }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClienteListaComponent);
        clienteListaComponent = fixture.componentInstance;
    });

    it('Deve Criar o componente', () => {
        expect(clienteListaComponent).toBeTruthy();
    });

    it('Teste onInit', () => {
        spyOn(clienteListaComponent, 'listarTodosFiltro');
        clienteListaComponent.ngOnInit();
        expect(clienteListaComponent.listarTodosFiltro).toHaveBeenCalled();
    });

    describe('Teste método listarTodosFiltro', () => {
        it('Deve listarTodosPaginadoFilter ', () => {
    
        });

    });

});
