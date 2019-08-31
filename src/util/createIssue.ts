import state from "../type/state";

export default function createIssue(res: state): Promise<Response> {
  const reqParam: Partial<state> = {};
  const { token, title, milestone, labels, assignees } = res;

  if (title && title.trim() !== "") {
    reqParam.title = title;
  }

  if (milestone && milestone.trim() !== "") {
    reqParam.milestone = milestone;
  }

  // FIXME: [""] 로 저장되는 케이스가 있음
  // if (labels && labels.length > 0) {
  //   reqParam.labels = labels;
  // }

  // if (assignees && assignees.length > 0) {
  //   reqParam.assignees = assignees;
  // }

  return fetch(`https://${getApiUrl()}/repos${window.location.pathname}`, {
    method: "POST",
    headers: new Headers({
      Authorization: `token ${token}`,
      "Content-Type": "application/vnd.github.symmetra-preview+json"
    }),
    body: JSON.stringify(reqParam)
  });
}

function getApiUrl(): string {
  if (window.location.host === "github.com") {
    return "api.github.com";
  } else {
    return `${window.location.host}/api/v3`;
  }
}
