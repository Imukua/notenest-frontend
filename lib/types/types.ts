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
    hasNextPage: Boolean;
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


