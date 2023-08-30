import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ClienteListaComponent } from "./cliente-lista.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AvisosDialogService } from "src/app/servicos/avisos-dialog.service";
import { ClienteService } from "src/app/servicos/cliente.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { SharedModule } from "../../shared/shared.module";
import { of } from "rxjs";
import { Cliente } from "src/app/entity/cliente";




describe('ClienteListaComponent', () => {

    let component: ClienteListaComponent;
    let fixture: ComponentFixture<ClienteListaComponent>;
    let mockClienteService: jasmine.SpyObj<ClienteService>;
    let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
    let mockAvisoDialogService: jasmine.SpyObj<AvisosDialogService>;
    let mockRouter: jasmine.SpyObj<Router>;

    beforeEach((() => {

        mockClienteService = jasmine.createSpyObj('ClienteService', ['listarTodosPaginadoFilter', 'deletarCliente']);
        mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
        mockAvisoDialogService = jasmine.createSpyObj('AvisosDialogService', ['openConfirmationDialog']);
        mockRouter = jasmine.createSpyObj('Router', ['navigate']);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, SharedModule],
            declarations: [ClienteListaComponent],
            providers: [
                { provide: ClienteService, useValue: mockClienteService },
                { provide: MatSnackBar, useValue: mockSnackBar },
                { provide: AvisosDialogService, useValue: mockAvisoDialogService },
                { provide: Router, useValue: mockRouter },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ClienteListaComponent);
        component = fixture.componentInstance;
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Deve chamar listarTodosFiltro no ngOnInit', () => {
        spyOn(component, 'listarTodosFiltro');
        component.ngOnInit();
        expect(component.listarTodosFiltro).toHaveBeenCalled();
    });

    describe('Testes método listarTodosFiltro()', () => {
        it('Deve chamar listarTodosPaginadoFilter com lista NÃO VAZIA', () => {
            const cliente1: Cliente = new Cliente();
            cliente1.id = 15;
            cliente1.nome = 'Cliente 1';
            cliente1.cnpj = '12345678901234'
            const lkistaCliente: Cliente[] = [cliente1];
            const mockClientePaginator = {
                content: lkistaCliente,
                totalElements: 1,
                size: 10,
                number: 2
            };
            mockClienteService.listarTodosPaginadoFilter.and.returnValue(of(mockClientePaginator));
            component.listarTodosFiltro();
            expect(component.listaClientes).toEqual(mockClientePaginator.content);
            expect(component.dataSource.data).toEqual(mockClientePaginator.content);
            expect(component.totalElementos).toEqual(mockClientePaginator.totalElements);
            expect(component.pagina).toEqual(mockClientePaginator.number);
            expect(component.qtdeRegistros).toEqual(mockClientePaginator.content.length);
        });

        it('Deve chamar listarTodosPaginadoFilter com lista VAZIA', () => {
            const lkistaClienteVazia: Cliente[] = [];
            const mockClientePaginator = {
                content: lkistaClienteVazia,
                totalElements: 0,
                size: 0,
                number: 0
            };
            mockClienteService.listarTodosPaginadoFilter.and.returnValue(of(mockClientePaginator));
            component.listarTodosFiltro();
            expect(component.listaClientes).toEqual(mockClientePaginator.content);
            expect(component.dataSource.data).toEqual(mockClientePaginator.content);
            expect(component.totalElementos).toEqual(mockClientePaginator.totalElements);
            expect(component.pagina).toEqual(mockClientePaginator.number);
            expect(component.qtdeRegistros).toEqual(mockClientePaginator.content.length);
            expect(mockSnackBar.open).toHaveBeenCalledWith('Lista Vazia!', 'Info!', { duration: 2000 });
        });
    });

});
