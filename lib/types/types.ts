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
    nextPage: number | null;
    categoryCounts: {
      PersonalDevelopment: number;
      Work: number;
      Travel: number;
    };
  };


