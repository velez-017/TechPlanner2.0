/**
 * Modelos TypeScript alineados con el OS Service (Spring Boot)
 */
export type Architecture = 'X86' | 'X64' | 'ARM';

export class OperatingSystem {
  id?: number;
  name: string = '';
  version: string = '';
  architecture: Architecture = 'X64';
  minRamGb: number = 1;
  minStorageGb: number = 1;
  requiresTpm: boolean = false;
  requiresSecureBoot: boolean = false;
  active: boolean = true;
  estimatedPrice: number = 0.0;
}

export class HardwareCompatibilityRequest {
  ramGb!: number;
  storageGb!: number;
  tpm!: boolean;
  secureBoot!: boolean;
  architecture!: Architecture | string;
  cpu!: string;
  gpu?: string;
}

export class OperatingSystemCompatibilityResponse {
  operatingSystem!: string; // nombre + versión
  compatible!: boolean;
  reason?: string;
}

