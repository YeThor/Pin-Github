export default interface state {
    [key: string]: string | string[];
    token: string;
    title: string;
    assignees: string[];
    labels: string[];
    milestone: string;
  }