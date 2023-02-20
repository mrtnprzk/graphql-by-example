import { useJobs } from "../graphql/hooks";
import JobList from "./JobList";

function JobBoard() {
  const { jobs, loading, error } = useJobs();

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error!</h2>;

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
