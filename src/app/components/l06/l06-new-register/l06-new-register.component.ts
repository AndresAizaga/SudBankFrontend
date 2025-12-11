import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { T48Service } from '../../../services/t48.service';   // (por si lo usas luego)
import { T164Service } from '../../../services/t164.service';
import { T33Service } from '../../../services/t33.service';
import { T65Service } from '../../../services/t65.service';
import { T66Service } from '../../../services/t66.service';
import { T4Service } from '../../../services/t4.service';

@Component({
  selector: 'app-l06-new-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './l06-new-register.component.html',
  styleUrls: ['./l06-new-register.component.css']   // 👈 corregido: styleUrls (plural)
})
export class L06NewRegisterComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();

  tiposIdentificacion: any[] = [];
  identificacionEmisor: any[] = [];

  tiposIdentificacionContraparte: any[] = [];
  identificacionContraparte: any[] = [];

  monedaDenominacion: any[] = [];
  estadoOperacion: any[] = [];
  tipoOperacion: any[] = [];

  categoriaCalificacion: any[] = [];
  calificacionRiesgo: any[] = [];

  tipoIdentificacionCustodio: any[] = [];
  identificacionCustodio: any[] = [];

  showModalForm = false;
  showMessage = false;
  messageType: 'success' | 'error' = 'success';
  messageText = '';
  isSubmitting = false;
  formSubmitted = false;

  l06Form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private t4Service: T4Service,
    private t164Service: T164Service,
    private t33Service: T33Service,
    private t65Service: T65Service,
    private t66Service: T66Service,
    // private t180Service: T180Service,
    // private t171Service: T171Service,
    // private t169Service: T169Service,
  ) {
    this.l06Form = this.fb.group({
      tipoIdentificacion: [null, Validators.required],
      identificacionEmisor: [null, Validators.required],

      numeroTitulo: [null, Validators.required],
      numeroOperacion: [null, Validators.required],

      fechaEmision: [null, Validators.required],
      fechaCompra: [null, Validators.required],

      estadoOperacion: [null, Validators.required],
      cuentaContable: [null, Validators.required],
      tipoOperacion: [null, Validators.required],

      fechaOperacion: [null, Validators.required],
      fechaVencimientoOperacion: [null, Validators.required],

      tipoIdentificacionContraparte: [null, Validators.required],
      identificacionContraparte: [null, Validators.required],

      moneda: [null, Validators.required],
      montoNegociado: [null, Validators.required],

      tasaEfectivaAnual: [null, Validators.required],
      valorNominalDolares: [null, Validators.required],
      valorMercadoDolares: [null, Validators.required],

      categoriaCalificacion: [null, Validators.required],
      codigoCalificacionRiesgo: [null, Validators.required],
      tipoIdentificacionCustodio: [null, Validators.required],
      identificacionCustodio: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadTipoIdentificacion();
    this.loadIdentificacionEmisor();

    this.loadTipoIdentificacionContraparte();
    this.loadIdentificacionContraparte();

    this.loadMonedaDenominacion();
    this.loadEstadoOperacion();
    this.loadTipoOperacion();

    this.loadCategoriaCalificacion();
    this.loadCalificacionRiesgo();

    this.loadTipoIdentificacionCustodio();
    this.loadIdentificacionCustodio();
  }

  onSubmit(): void {
    this.formSubmitted = true;
    this.hideMessage();

    if (this.l06Form.invalid) {
      return;
    }

    console.log('Formulario L06 válido, valores:', this.l06Form.value);
    this.messageType = 'success';
    this.messageText = 'Registro válido (falta enviar al backend).';
    this.showMessage = true;
  }

  closeModal(): void {
    this.isVisible = false;
    this.modalClosed.emit();
    this.l06Form.reset();
    this.formSubmitted = false;
    this.hideMessage();
  }

  hideMessage(): void {
    this.showMessage = false;
  }

  isInvalid(controlName: string): boolean {
    const control = this.l06Form.get(controlName);
    return !!(control && control.invalid && (control.touched || this.formSubmitted));
  }


  private loadTipoIdentificacion(): void {
    this.t4Service.getAll().subscribe({
      next: (data) => {
        this.tiposIdentificacion = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Identificación:', error);
      }
    });
  }

  private loadIdentificacionEmisor(): void {
    this.t164Service.getAll().subscribe({
      next: (data) => {
        this.identificacionEmisor = data;
      },
      error: (error) => {
        console.error('Error al cargar Identificación de Emisor:', error);
      }
    });
  }

  private loadTipoIdentificacionContraparte(): void {
    this.t4Service.getAll().subscribe({
      next: (data) => {
        this.tiposIdentificacionContraparte = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipos de Identificación de Contraparte:', error);
      }
    });
  }

  private loadIdentificacionContraparte(): void {
    this.t164Service.getAll().subscribe({
      next: (data) => {
        this.identificacionContraparte = data;
      },
      error: (error) => {
        console.error('Error al cargar Identificación de Contraparte:', error);
      }
    });
  }

  private loadMonedaDenominacion(): void {
    this.t33Service.getAll().subscribe({
      next: (data) => {
        this.monedaDenominacion = data;
      },
      error: (error) => {
        console.error('Error al cargar Moneda de denominación:', error);
      }
    });
  }

  private loadEstadoOperacion(): void {
    // TODO: conectar con el servicio real (T180 o el que corresponda)
    // this.t180Service.getAll().subscribe({...});
  }

  private loadTipoOperacion(): void {
    // TODO: conectar con el servicio real (T171/T35 u otro)
    // this.t171Service.getAllT35().subscribe({...});
  }

  private loadCategoriaCalificacion(): void {
    this.t66Service.getAll().subscribe({
      next: (data) => {
        this.categoriaCalificacion = data;
      },
      error: (error) => {
        console.error('Error al cargar Categoría de calificación:', error);
      }
    });
  }

  private loadCalificacionRiesgo(): void {
    this.t65Service.getAll().subscribe({
      next: (data) => {
        this.calificacionRiesgo = data;
      },
      error: (error) => {
        console.error('Error al cargar Calificación de riesgo:', error);
      }
    });
  }

  private loadTipoIdentificacionCustodio(): void {
    this.t4Service.getAll().subscribe({
      next: (data) => {
        this.tipoIdentificacionCustodio = data;
      },
      error: (error) => {
        console.error('Error al cargar Tipo de identificación de Custodio:', error);
      }
    });
  }

  private loadIdentificacionCustodio(): void {
    this.t164Service.getAll().subscribe({
      next: (data) => {
        this.identificacionCustodio = data;
      },
      error: (error) => {
        console.error('Error al cargar Identificación de Custodio:', error);
      }
    });
  }
}
