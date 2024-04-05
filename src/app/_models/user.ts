export enum Role {
    Admin = 0,
    Medic = 1,
  }
  
  export interface User {
    id?: number;
    email?: string;
    password?: string;
    role?: Role;
  }
  