declare global {
  interface Customer {
    id: string;
    uniqueId: string;
    firstName: string;
    lastName: string;
    company: string;
    city: string;
    country: string;
    phone1: string;
    phone2: string;
    email: string;
    registrationDate: string;
    website: string;
  }

  interface ApiResponse {
    totalPages: number;
    currentPage: number;
    perPage: number;
    totalCustomers: number;
    data: Customer[];
  }
}

export {};
