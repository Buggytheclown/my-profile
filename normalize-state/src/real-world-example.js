/*
 * BREADCRUMBS EXAMPLE
*/
// "OUT" -> !first! -> !second! -> >>(third)<< -> { fourth }  -> { fifth } -> "OUT"

// state.currentBreadcrumb === state.lastBreadcrumb
// onNext -> changeCurrentBreadcrumb(nextBreadcrumb) || goOut;

// state.previousBreadcrumb !== ''
// onPrevious -> changeCurrentBreadcrumb(previousBreadcrumb) || goOut;

const breadcrumbs = [
  "firstName",
  "secondName",
  "thirdName",
  "fourthName",
  "fifthName"
];

const state = {
  allBreadcrumb: breadcrumbs,
  lastBreadcrumb: breadcrumbs[breadcrumbs.length - 1],
  // unused, check if(previousBreadcrumb === '')
  firstBreadcrumb: breadcrumbs[0],
  currentBreadcrumb: breadcrumbs[0],
  nextBreadcrumb: breadcrumbs.length > 1 ? breadcrumbs[1] : breadcrumbs[0],
  previousBreadcrumb: ""
};

function changeCurrentBreadcrumb(newBreadcrumb) {
  const currectIndex = breadcrumbs.findIndex(
    breadcrumb => breadcrumb === newBreadcrumb
  );
  let position = { cur: currectIndex, prev: currectIndex - 1 };

  if (position.cur + 1 < breadcrumbs.length) {
    state.nextBreadcrumb = breadcrumbs[position.cur + 1];
  }

  if (position.prev >= 0) {
    state.previousBreadcrumb = breadcrumbs[position.prev];
  } else {
    state.previousBreadcrumb = "";
  }

  state.currentBreadcrumb = breadcrumbs[position.cur];
}

// How to start with the last `breadcrumb`?
