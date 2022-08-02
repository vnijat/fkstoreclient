enum ClientType {
  CORPORATE = 'corporate',
  INDIVIDUAL = 'individual',
}

interface AddClient {
  firstName: string;

  lastName: string;

  phone: string;

  description: string;

  type: ClientType;
}

export type {AddClient, ClientType};
