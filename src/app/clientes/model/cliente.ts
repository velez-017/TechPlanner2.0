

export interface Cliente {
  id:number;
  nombre:string;
  apellido: string;
  email:string;
  foto:string;
  createAt:string;
  region:{
    id:number;
    nombre:string;
  };
}
