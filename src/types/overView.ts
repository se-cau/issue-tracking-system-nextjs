interface StatusDistribution {
    [status: string]: number;
}

interface ReporterDistribution {
    [reporter: string]: number;
}

interface AssigneeDistribution {
    [assignee: string]: number;
}

export interface PJStatistics {
    statusDistribution: StatusDistribution;
    reporterDistribution: ReporterDistribution;
    assigneeDistribution: AssigneeDistribution;
    topCommentedIssues: string[];
}