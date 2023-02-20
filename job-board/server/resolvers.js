import { Company, Job } from "./db.js";

function rejectIf(condition) {
  if (condition) throw new Error("Unauthorized");
}

export const resolvers = {
  Query: {
    company: (_root, { id }) => Company.findById(id),
    job: (_root, { id }) => Job.findById(id),
    jobs: () => Job.findAll(),
  },

  Mutation: {
    createJob: (_root, { input }, { user }) => {
      rejectIf(!user);

      return Job.create({ ...input, companyId: user.companyId });
    },

    deleteJob: async (_root, { id }, { user }) => {
      //check user is auth and job belongs to their company
      const job = await Job.findById(id);

      rejectIf(!user);
      rejectIf(user.companyId !== job.companyId);

      return Job.delete(id);
    },

    updateJob: async (_root, { input }, { user }) => {
      //check user is auth and job belongs to their company
      const job = await Job.findById(input.id);

      rejectIf(!user);
      rejectIf(user.companyId !== job.companyId);

      return Job.update({ ...input, companyId: user.companyId });
    },
  },

  Company: {
    jobs: (company) => Job.findAll((job) => job.companyId === company.id),
  },

  Job: {
    company: (job) => Company.findById(job.companyId),
  },
};
