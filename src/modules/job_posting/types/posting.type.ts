export type JobPostingResult = {
    job_posting_id: number;
    company_name: string;
    company_nation: string;
    company_location: string;
    job_position: string;
    job_reward: number;
    job_skill: string;
    job_content: string;
    job_other_postings_by_company: number[] | string;
};
