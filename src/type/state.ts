export default interface state {
  [key: string]: string | string[];
  token: string;
  title: string;
  assignees: string[];
  prassignees: string[];
  labels: string[];
  prlabels: string[];
  milestone: string;
  prmilestone: string;
}
