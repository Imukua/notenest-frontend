 export enum ApiMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH",
  }

  
  export type JournalEntry = {
    entries: Array<{
      id: string;
      title: string;
      content: string;
      category: string;
      date: string;
    }>;
    totalEntries: number;
    hasNextPage: boolean;
    totalPages: number;
    categoryCounts: {
      PersonalDevelopment: number;
      Work: number;
      Travel: number;
    };
  };

  export type SingleJournalEntry = {
    id?: string;
    title: string;
    content: string;
    category: string;
    date?: string;
  };


  export type UserType = {
    username: string;
    createdAt: string;
    updatedAt: string;
    id: string;
    exp: number;
    iat: number;
  };
  
  export type ContextType = {
    isAuthenticated: boolean;
    logoutUser(): void;
    accessToken: string | null;
    user: UserType | null;
    loading: boolean;
  };

