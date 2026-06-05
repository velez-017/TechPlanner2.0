import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SistemasOperativosService } from './sistema.service';
import { OperatingSystem, Architecture, HardwareCompatibilityRequest } from './operating-system';

@Component({
  selector: 'app-sistemas-operativos',
  templateUrl: './sistemas-operativos.component.html',
  styleUrls: ['./sistemas-operativos.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SistemasOperativosComponent implements OnInit {
  public sistemas: OperatingSystem[] = [];
  public selected?: OperatingSystem;
  public currentView: 'all' | 'active' | 'architecture' | 'paged' = 'all';
  public currentPage = 0;
  public totalPages = 0;
  public totalElements = 0;
  public pageSize = 4;
  public architectureFilter: Architecture = 'X64';
  public searchId?: number;

  public ARCHS: { code: Architecture, label: string }[] = [
    { code: 'X86', label: 'X86 (32-bit)' },
    { code: 'X64', label: 'X64 (64-bit)' },
    { code: 'ARM', label: 'ARM' },
  ];

  constructor(private service: SistemasOperativosService) {
  }

  ngOnInit(): void {
    this.cargarTodos();
  }

  private setSelectionFromList(id?: number): void {
    if (!id) {
      return;
    }
    this.selected = this.sistemas.find((s) => s.id === id) ?? this.selected;
  }

  cargarTodos(): void {
    this.currentView = 'all';
    this.selected = undefined;
    this.service.getAll().subscribe({
      next: (data) => {
        this.sistemas = data;
        this.totalElements = data.length;
        this.totalPages = 1;
        this.currentPage = 0;
        this.setSelectionFromList(this.selected?.id);
      },
      error: (err) => {
        console.error('Error cargando sistemas operativos', err);
        Swal.fire('Error', 'No se pudo cargar la lista de sistemas operativos.', 'error');
      }
    });
  }

  cargarActivos(): void {
    this.currentView = 'active';
    this.selected = undefined;
    this.service.findActive().subscribe({
      next: (data) => {
        this.sistemas = data;
        this.totalElements = data.length;
        this.totalPages = 1;
        this.currentPage = 0;
        this.setSelectionFromList(this.selected?.id);
      },
      error: (err) => {
        console.error('Error cargando sistemas activos', err);
        Swal.fire('Error', 'No se pudieron cargar los sistemas activos.', 'error');
      }
    });
  }

  cargarPorArquitectura(architecture: Architecture = this.architectureFilter): void {
    this.currentView = 'architecture';
    this.architectureFilter = architecture;
    this.selected = undefined;
    this.service.findByArchitecture(architecture).subscribe({
      next: (data) => {
        this.sistemas = data;
        this.totalElements = data.length;
        this.totalPages = 1;
        this.currentPage = 0;
        this.setSelectionFromList(this.selected?.id);
      },
      error: (err) => {
        console.error('Error filtrando por arquitectura', err);
        Swal.fire('Error', 'No se pudieron cargar los sistemas por arquitectura.', 'error');
      }
    });
  }

  cargarPaginado(page: number = 0): void {
    this.currentView = 'paged';
    this.selected = undefined;
    this.service.getPaged(page).subscribe({
      next: (response) => {
        this.sistemas = response?.content ?? [];
        this.currentPage = response?.number ?? page;
        this.totalPages = response?.totalPages ?? 0;
        this.totalElements = response?.totalElements ?? this.sistemas.length;
        this.setSelectionFromList(this.selected?.id);
      },
      error: (err) => {
        console.error('Error cargando sistemas paginados', err);
        Swal.fire('Error', 'No se pudieron cargar los sistemas paginados.', 'error');
      }
    });
  }

  buscarPorId(): void {
    if (!this.searchId) {
      Swal.fire('Atención', 'Ingresa un ID válido.', 'info');
      return;
    }

    this.service.getById(this.searchId).subscribe({
      next: (os) => {
        this.selected = { ...os };
        if (!this.sistemas.some((item) => item.id === os.id)) {
          this.sistemas = [os, ...this.sistemas];
        }
        this.currentView = 'all';
      },
      error: (err) => {
        console.error('Error buscando por ID', err);
        Swal.fire('Error', `No se encontró el sistema operativo con id ${this.searchId}.`, 'error');
      }
    });
  }

  select(s: OperatingSystem): void {
    this.selected = { ...s };
  }

  addSistema(): void {
    Swal.fire({
      title: 'Crear Sistema Operativo',
      html: `
        <input id="name" class="swal2-input" placeholder="Nombre (ej: Ubuntu Desktop)">
        <input id="version" class="swal2-input" placeholder="Versión (ej: 24.04 LTS)">
        <select id="architecture" class="swal2-input">
          <option value="">Selecciona arquitectura</option>
          <option value="X64">X64</option>
          <option value="X86">X86</option>
          <option value="ARM">ARM</option>
        </select>
        <input id="minRamGb" class="swal2-input" type="number" placeholder="RAM mínima (GB)" min="1">
        <input id="minStorageGb" class="swal2-input" type="number" placeholder="Almacenamiento mínimo (GB)" min="1">
        <div style="display:flex;gap:8px;justify-content:center;margin-top:6px">
          <label style="color:#fff"><input id="requiresTpm" type="checkbox"> Requiere TPM</label>
          <label style="color:#fff"><input id="requiresSecureBoot" type="checkbox"> Requiere Secure Boot</label>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Crear',
      preConfirm: () => {
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const version = (document.getElementById('version') as HTMLInputElement).value;
        const architecture = (document.getElementById('architecture') as HTMLSelectElement).value as Architecture;
        const minRamGb = Number((document.getElementById('minRamGb') as HTMLInputElement).value);
        const minStorageGb = Number((document.getElementById('minStorageGb') as HTMLInputElement).value);
        const requiresTpm = (document.getElementById('requiresTpm') as HTMLInputElement).checked;
        const requiresSecureBoot = (document.getElementById('requiresSecureBoot') as HTMLInputElement).checked;

        if (!name || !version || !architecture || !minRamGb || !minStorageGb) {
          Swal.showValidationMessage('Todos los campos obligatorios deben llenarse');
          return false;
        }

        const os: OperatingSystem = new OperatingSystem();
        os.name = name;
        os.version = version;
        os.architecture = architecture;
        os.minRamGb = minRamGb;
        os.minStorageGb = minStorageGb;
        os.requiresTpm = requiresTpm;
        os.requiresSecureBoot = requiresSecureBoot;
        os.active = true;

        return os;
      }
    }).then((r) => {
      if (r.isConfirmed && r.value) {
        this.service.create(r.value).subscribe({
          next: () => { this.cargarActual(); Swal.fire('Éxito', 'Sistema operativo creado', 'success'); },
          error: (err) => { console.error('Error creando', err); Swal.fire('Error', 'No se pudo crear', 'error'); }
        });
      }
    });
  }

  editSistema(os: OperatingSystem): void {
    Swal.fire({
      title: 'Editar Sistema Operativo',
      html: `
        <input id="name" class="swal2-input" placeholder="Nombre" value="${os.name}">
        <input id="version" class="swal2-input" placeholder="Versión" value="${os.version}">
        <select id="architecture" class="swal2-input">
          <option value="X64" ${os.architecture === 'X64' ? 'selected' : ''}>X64</option>
          <option value="X86" ${os.architecture === 'X86' ? 'selected' : ''}>X86</option>
          <option value="ARM" ${os.architecture === 'ARM' ? 'selected' : ''}>ARM</option>
        </select>
        <input id="minRamGb" class="swal2-input" type="number" placeholder="RAM mínima (GB)" min="1" value="${os.minRamGb}">
        <input id="minStorageGb" class="swal2-input" type="number" placeholder="Almacenamiento mínimo (GB)" min="1" value="${os.minStorageGb}">
        <div style="display:flex;gap:8px;justify-content:center;margin-top:6px">
          <label style="color:#fff"><input id="requiresTpm" type="checkbox" ${os.requiresTpm ? 'checked' : ''}> Requiere TPM</label>
          <label style="color:#fff"><input id="requiresSecureBoot" type="checkbox" ${os.requiresSecureBoot ? 'checked' : ''}> Requiere Secure Boot</label>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      preConfirm: () => {
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const version = (document.getElementById('version') as HTMLInputElement).value;
        const architecture = (document.getElementById('architecture') as HTMLSelectElement).value as Architecture;
        const minRamGb = Number((document.getElementById('minRamGb') as HTMLInputElement).value);
        const minStorageGb = Number((document.getElementById('minStorageGb') as HTMLInputElement).value);
        const requiresTpm = (document.getElementById('requiresTpm') as HTMLInputElement).checked;
        const requiresSecureBoot = (document.getElementById('requiresSecureBoot') as HTMLInputElement).checked;

        if (!name || !version || !architecture || !minRamGb || !minStorageGb) {
          Swal.showValidationMessage('Todos los campos obligatorios deben llenarse');
          return false;
        }

        os.name = name;
        os.version = version;
        os.architecture = architecture;
        os.minRamGb = minRamGb;
        os.minStorageGb = minStorageGb;
        os.requiresTpm = requiresTpm;
        os.requiresSecureBoot = requiresSecureBoot;

        return os;
      }
    }).then((r) => {
      if (r.isConfirmed && r.value) {
        this.service.update(r.value).subscribe({
          next: () => { this.cargarActual(); Swal.fire('Éxito', 'Sistema operativo actualizado', 'success'); },
          error: (err) => { console.error('Error actualizando', err); Swal.fire('Error', 'No se pudo actualizar', 'error'); }
        });
      }
    });
  }

  confirmDelete(id?: number): void {
    if (!id) return;
    Swal.fire({
      title: '¿Eliminar?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar'
    }).then((r) => {
      if (r.isConfirmed) {
        this.service.delete(id!).subscribe({
          next: () => { this.cargarActual(); Swal.fire('Eliminado', 'Sistema operativo eliminado', 'success'); },
          error: (err) => { console.error('Error eliminando', err); Swal.fire('Error', 'No se pudo eliminar', 'error'); }
        });
      }
    });
  }

  // Verificar compatibilidad con formulario rápido
  verificarCompatibilidad(): void {
    Swal.fire({
      title: 'Verificar compatibilidad de hardware',
      html: `
        <input id="ramGb" class="swal2-input" type="number" placeholder="RAM disponible (GB)" min="1">
        <input id="storageGb" class="swal2-input" type="number" placeholder="Storage disponible (GB)" min="1">
        <select id="architecture" class="swal2-input">
          <option value="X64">X64</option>
          <option value="X86">X86</option>
          <option value="ARM">ARM</option>
        </select>
        <input id="cpu" class="swal2-input" placeholder="CPU (ej: Intel Core i7)">
        <input id="gpu" class="swal2-input" placeholder="GPU (opcional)">
        <div style="display:flex;gap:8px;justify-content:center;margin-top:6px">
          <label style="color:#fff"><input id="tpm" type="checkbox"> TPM</label>
          <label style="color:#fff"><input id="secureBoot" type="checkbox"> Secure Boot</label>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Verificar',
      preConfirm: () => {
        const ramGb = Number((document.getElementById('ramGb') as HTMLInputElement).value);
        const storageGb = Number((document.getElementById('storageGb') as HTMLInputElement).value);
        const architecture = (document.getElementById('architecture') as HTMLSelectElement).value as Architecture;
        const cpu = (document.getElementById('cpu') as HTMLInputElement).value;
        const gpu = (document.getElementById('gpu') as HTMLInputElement).value;
        const tpm = (document.getElementById('tpm') as HTMLInputElement).checked;
        const secureBoot = (document.getElementById('secureBoot') as HTMLInputElement).checked;

        if (!ramGb || !storageGb || !architecture || !cpu) {
          Swal.showValidationMessage('ramGb, storageGb, architecture y cpu son obligatorios');
          return false;
        }

        const req: HardwareCompatibilityRequest = {
          ramGb,
          storageGb,
          architecture,
          cpu,
          gpu: gpu || undefined,
          tpm,
          secureBoot,
        };

        return req;
      }
    }).then((r) => {
      if (r.isConfirmed && r.value) {
        // Llamar al backend
        this.service.checkCompatibility(r.value).subscribe({
          next: (res) => {
            const html = res.map(x => `<div style="text-align:left;margin-bottom:8px"><strong>${x.operatingSystem}</strong>: ${x.compatible ? '<span style="color:green">Compatible</span>' : '<span style="color:red">No compatible</span>'} <br><small>${x.reason || ''}</small></div>`).join('');
            Swal.fire({ title: 'Resultados', html, width: '700px' });
          },
          error: (err) => {
            console.error('Error verificando compatibilidad', err);
            // Fallback: realizar verificación local para cada SO
            const preview = this.sistemas.map(os => this.service.checkCompatibilityPreview(r.value, os));
            const html = preview.map(x => `<div style="text-align:left;margin-bottom:8px"><strong>${x.operatingSystem}</strong>: ${x.compatible ? '<span style="color:green">Compatible</span>' : '<span style="color:red">No compatible</span>'} <br><small>${x.reason || ''}</small></div>`).join('');
            Swal.fire({ title: 'Resultados (preview local)', html, width: '700px' });
          }
        });
      }
    });
  }

  cargarActual(): void {
    if (this.currentView === 'active') {
      this.cargarActivos();
      return;
    }

    if (this.currentView === 'architecture') {
      this.cargarPorArquitectura(this.architectureFilter);
      return;
    }

    if (this.currentView === 'paged') {
      this.cargarPaginado(this.currentPage);
      return;
    }

    this.cargarTodos();
  }
}
