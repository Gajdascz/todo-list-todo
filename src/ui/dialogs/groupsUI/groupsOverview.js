import groupsOverviewObjs from "../../builders/groups/groupsOverviewObjs";
import { buildElementTree } from "../../../logic/utility/domHelperFunctions";

const groupsOverview = (groupsData, totalGroups) => {
  const overviewContainerObj = groupsOverviewObjs.overviewContainerObj();
  const formatGroupEntryName = (groupName, topGroupName = null) => {
    const dueNameMap = {
      due: "Due",
      overdue: "Overdue",
      today: "Today",
      tomorrow: "Tomorrow",
      thisWeek: "This Week",
      nextWeek: "Next Week",
      thisMonth: "This Month",
      nextMonth: "Next Month",
      later: "Later",
      allDue: "All Due",
    };

    const priorityNameMap = {
      priority: "Priority",
      urgent: "Urgent",
      high: "High",
      medium: "Medium",
      low: "Low",
      none: "None",
    };
    const totalsMap = {
      all: "Tasks",
      complete: "Completed",
      totalGroups: "Groups",
    };
    const nameMaps = {
      due: dueNameMap,
      priority: priorityNameMap,
      totals: totalsMap,
    };
    return topGroupName
      ? nameMaps[topGroupName][groupName] || groupName
      : groupName.slice(0, 1).toUpperCase() + groupName.slice(1);
  };

  const buildGroupListEntryObj = (
    groupName,
    numberOfTasks,
    topGroupName = null,
  ) => {
    const entryObj = groupsOverviewObjs.groupListEntryContainerObj(groupName);
    entryObj.children = [
      topGroupName
        ? groupsOverviewObjs.groupNameTextObj(
            formatGroupEntryName(groupName, topGroupName),
          )
        : groupsOverviewObjs.groupNameTextObj(
            formatGroupEntryName(groupName, topGroupName),
          ),
      groupsOverviewObjs.numberOfTasksObj(numberOfTasks),
    ];
    return entryObj;
  };

  const buildGroupsListObj = (groupData, topGroupName) => {
    const groupListContainerObj =
      groupsOverviewObjs.groupWithSubgroupsListContainerObj();
    const listEntryObjs = groupData.subgroups.map((group) =>
      buildGroupListEntryObj(
        group.groupName,
        group.numberOfTasks,
        topGroupName,
      ),
    );
    groupListContainerObj.children = [
      groupsOverviewObjs.groupListEntryHeaderObj(
        formatGroupEntryName(groupData.groupName, topGroupName),
      ),
      ...listEntryObjs,
    ];
    return groupListContainerObj;
  };

  const buildListSubheaderObj = (txt1, txt2) => {
    const subheaderObj =
      groupsOverviewObjs.groupListEntryContainerObj("list-subheader");
    subheaderObj.children = [
      groupsOverviewObjs.groupListEntryHeaderObj(formatGroupEntryName(txt1)),
      groupsOverviewObjs.groupListEntryHeaderObj(formatGroupEntryName(txt2)),
    ];
    return subheaderObj;
  };

  const buildCollectionGroupsListObj = (
    collectionName,
    collectionDisplayTitle,
  ) => {
    const collectionGroupsData = groupsData.find(
      (collection) => collection.collectionName === collectionName,
    );
    const collectionGroupsContainerObj =
      groupsOverviewObjs.groupCollectionContainerObj(collectionName);
    const collectionGroupsListHeaderObj =
      groupsOverviewObjs.groupCollectionHeaderObj(
        collectionName,
        collectionDisplayTitle,
      );
    const collectionGroupsListSubheaderObj = buildListSubheaderObj(
      "Group",
      "Tasks",
    );
    const collectionGroupsAllGroupsListContainerObj =
      groupsOverviewObjs.groupCollectionAllGroupsListContainerObj(
        collectionName,
      );
    const groupTotals = [];
    const collectionGroupsListObj = collectionGroupsData.groups.reduce(
      (acc, group) => {
        if (group.groupName === "all" || group.groupName === "complete") {
          groupTotals.push(group);
        } else
          acc.push(
            group.subgroups
              ? buildGroupsListObj(group, group.groupName)
              : buildGroupListEntryObj(group.groupName, group.numberOfTasks),
          );
        return acc;
      },
      [],
    );
    collectionGroupsAllGroupsListContainerObj.children = [
      ...collectionGroupsListObj,
    ];
    collectionGroupsContainerObj.children = [
      collectionGroupsListHeaderObj,
      collectionGroupsListSubheaderObj,
      collectionGroupsAllGroupsListContainerObj,
    ];

    const totalsGroupContainerObj =
      groupTotals.length > 0 ? buildTotalsGroupContainerObj(groupTotals) : null;

    return totalsGroupContainerObj
      ? { main: collectionGroupsContainerObj, totals: totalsGroupContainerObj }
      : collectionGroupsContainerObj;
  };

  const buildTotalsGroupContainerObj = (totalsObjsArr) => {
    if (Array.isArray(totalsObjsArr)) {
      totalsObjsArr.push({ totalGroups: totalGroups });
      const totalsGroupsContainerObj =
        groupsOverviewObjs.groupCollectionContainerObj("totals");
      const totalsGroupsContentContainerObj =
        groupsOverviewObjs.groupCollectionContainerObj("totals-content");
      const totalsGroupHeaderObj = groupsOverviewObjs.groupCollectionHeaderObj(
        "groups-totals",
        "Total:",
      );
      const totalsEntriesObjs = totalsObjsArr.map((totalsObj) =>
        totalsObj.groupName
          ? buildGroupListEntryObj(
              totalsObj.groupName,
              totalsObj.numberOfTasks,
              "totals",
            )
          : buildGroupListEntryObj(
              "totalGroups",
              totalsObj.totalGroups,
              "totals",
            ),
      );
      totalsGroupsContentContainerObj.children = [
        totalsGroupHeaderObj,
        ...totalsEntriesObjs,
      ];
      totalsGroupsContainerObj.children = [totalsGroupsContentContainerObj];
      return totalsGroupsContainerObj;
    }
    return null;
  };

  const defaultCollectionObj = buildCollectionGroupsListObj(
    "default",
    "Default Groups",
  );

  overviewContainerObj.children = [
    groupsOverviewObjs.overviewHeaderObj(),
    defaultCollectionObj.main,
    buildCollectionGroupsListObj("user", "Your Groups"),
    defaultCollectionObj.totals,
  ];

  const groupsOverviewElement = buildElementTree(overviewContainerObj);

  return { element: groupsOverviewElement };
};

export default groupsOverview;
