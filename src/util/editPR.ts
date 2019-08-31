import state from "../type/state";
import getApiUrl from "./getApiUrl";

export default function editPR(res: state): Promise<Response> {
  const PRNumber = window.location.pathname.replace(/^\D+/, "");

  const reqParam: Partial<state> = {};
  const { token, prassignees, prlabels, prmilestone } = res;

  if (prmilestone && prmilestone.trim() !== "") {
    reqParam.milestone = prmilestone;
  }

  if (prlabels && prlabels.length > 0) {
    reqParam.labels = prlabels;
  }

  if (prassignees && prassignees.length > 0) {
    reqParam.assignees = prassignees;
  }

  return fetch(
    `https://${getApiUrl()}/repos${window.location.pathname}`.replace(
      "/pull/",
      "/issues/"
    ),
    {
      method: "PATCH",
      headers: new Headers({
        Authorization: `token ${token}`,
        "Content-Type": "application/vnd.github.symmetra-preview+json"
      }),
      body: JSON.stringify(reqParam)
    }
  );
}
